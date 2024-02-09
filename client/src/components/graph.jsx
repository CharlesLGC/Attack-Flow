import axios from 'axios';
import { FlowAnalysisGraph } from '@ant-design/graphs';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import GraphNodeDrawer from './GraphNodeDrawer/GraphNodeDrawer';
import NavBar from './NavBar';
import './graph.css';
import GraphLoadingPage from './graphLoadingPage';
import colors from '../utils/highlight-colors';
import types from '../utils/constants';

const Graph = () => {
  const screenshotRef = useRef(null);
  const [graph_, setGraph] = useState(null);
  const [currentNode, setCurrentNode] = useState({});
  const { id } = useParams();
  const [data, setData] = useState({
    nodes: [],
    edges: [],
  });
  const [loadingPhase, setLoadingPhase] = useState('');
  const [colorsMapping] = useState({});
  useEffect(() => {
    types.forEach((type, index) => {
      colorsMapping[type.toLowerCase()] = colors[index];
    });
  }, [colorsMapping]);

  function getNodeDescription(obj) {
    return Object.entries(obj)
      .filter(
        ([key]) =>
          key !== 'highlight_comment' &&
          key !== 'highlight_content' &&
          key !== 'highlight_position',
      )
      .map(([key, value]) => {
        const line = `${key}: ${value}`;
        return line.length > 19 ? `${line.slice(0, 19)}` : line;
      })
      .join('\n');
  }
  useEffect(() => {
    setLoadingPhase('Loading nodes');
    async function getProject() {
      try {
        // Fetch annotations
        const res = await axios.get(
          `${import.meta.env.VITE_APP_SERVER}/annotations?projectID=${id}`,
        );

        const excludedKeys = [
          'id',
          'highlight_content',
          'highlight_comment',
          'highlight_position',
          'created_at',
          'updated_at',
          'is_currently_existing',
          'project',
          'user',
        ];
        const finalNodes = res.data.map((node) => {
          const filteredNodes = Object.entries(node)
            .filter(
              ([key, value]) => !excludedKeys.includes(key) && value !== null,
            )
            .map(([key, value]) => ({
              type: key,
              ...value,
              highlight_content: node.highlight_content,
              highlight_comment: node.highlight_comment,
              highlight_position: node.highlight_position,
            }));
          if (filteredNodes[0]) {
            return {
              id: filteredNodes[0].annotation_id,
              value: {
                title: filteredNodes[0].annotation_id,
                items: {
                  text: getNodeDescription(filteredNodes[0]),
                  ...filteredNodes,
                },
              },
            };
          }
          return null;
        });

        // Filter out any undefined or null values
        const filteredFinalNodes = finalNodes.filter((item) => item != null);
        setLoadingPhase('Loading edges');
        // Fetch relationships
        const relationships = await axios.get(
          `${
            import.meta.env.VITE_APP_SERVER
          }/relationships/get-by-projectID?projectID=${id}`,
        );

        const finalEdges = await Promise.all(
          relationships.data.map(async (relationship) => {
            return {
              source: relationship.source,
              target: relationship.target,
            };
          }),
        );
        const filteredFinalEdges = finalEdges.filter((item) => item != null);

        setData({
          nodes: filteredFinalNodes,
          edges: filteredFinalEdges,
        });
        setLoadingPhase('');
      } catch (error) {
        // Handle error
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    getProject();
  }, [id]);
  const customizeFillColor = (node) => {
    const nodeType = node.value?.items?.[0].type;
    return colorsMapping[nodeType] || colors[0];
  };
  const config = {
    data,
    layout: {
      rankdir: 'TB',
      ranksepFunc: () => 30,
    },
    nodeCfg: {
      anchorPoints: [
        [0.5, 0],
        [0.5, 1],
      ],
      title: {
        containerStyle: (cfg) => ({
          fill: customizeFillColor(cfg),
        }),
      },
      style: {
        textOverflow: 'hidden',
      },
    },
    edgeCfg: {
      type: 'polyline',
      endArrow: true,
    },
    onReady: (graph) => {
      graph.on('node:click', (evt) => {
        const { item } = evt;
        const nodeValue = item.getModel().value;
        setCurrentNode(nodeValue.items[0]);
      });
      setGraph(graph);
    },
    markerCfg: (cfg) => ({
      position: 'bottom',
      show: data.edges.filter((item) => item.source === cfg.id)?.length,
    }),
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };

  return (
    <>
      <NavBar currentRoute="/graph" />
      {loadingPhase !== '' ? (
        <GraphLoadingPage message={loadingPhase} />
      ) : (
        <div className="graph-canvas">
          <div className="flex-1 w-full h-full" ref={screenshotRef}>
            <FlowAnalysisGraph {...config} />
          </div>
          <GraphNodeDrawer
            node={currentNode}
            projectID={id}
            screenshot={(type) => {
              graph_.downloadFullImage('graph', type, {
                backgroundColor: '#fff',
                padding: [30, 15, 15, 15],
              });
            }}
          />
        </div>
      )}
    </>
  );
};

export default Graph;
