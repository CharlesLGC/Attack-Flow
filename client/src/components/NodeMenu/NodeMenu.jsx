import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import NodeMenuItem from '../NodeMenuItem/NodeMenuItem';
import EditNodeView from '../EditNodeView/EditNodeView';
import './NodeMenu.css';
import CreateNodeView from '../CreateNodeView/CreateNodeView';

const NodeMenu = ({
  showCreateNodeView,
  setShowCreateNodeView,
  highlight,
  onDeleteNode,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isShowEditNodeView, setIsShowEditNodeView] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const [techniques, setTechniques] = useState([]);
  const [annotationIDList, setAnnotationIDList] = useState([]);

  async function getProject() {
    const accessToken = await getAccessTokenSilently();
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    const projectID = segments[2];
    const res = await axios.get(
      `${import.meta.env.VITE_APP_SERVER}/annotations?projectID=${projectID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
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
    const final = [];
    return (
      res.data.map(async (node) => {
        const relationship = await axios.get(
          `${
            import.meta.env.VITE_APP_SERVER
          }/relationships/get-children?annotationID=${node.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const finalRelationship = [];
        relationship.data.forEach((child) => {
          finalRelationship.push(child.target);
        });
        const filteredNodes = Object.entries(node)
          .filter(
            ([key, value]) => !excludedKeys.includes(key) && value !== null,
          )
          .map((result) => {
            return {
              annotation_type: result[0],
              ...result[1],
              highlight_content: node.highlight_content,
              highlight_comment: node.highlight_comment,
              highlight_position: node.highlight_position,
              children_relationship: finalRelationship,
            };
          });
        if (filteredNodes[0]) {
          final.push(filteredNodes[0]);
          setAnnotationIDList((array) => [
            ...array,
            filteredNodes[0].annotation_id,
          ]);
        }
      }),
      setTechniques(final)
    );
  }

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, isShowEditNodeView]);

  const showEditNodeView = (node) => {
    setIsShowEditNodeView(true);
    setCurrentNode(node);
  };

  const closeAllNodeView = () => {
    setShowCreateNodeView(false);
    setIsShowEditNodeView(false);
    getProject();
  };

  const addNode = (node) => {
    setTechniques([node, ...techniques]);
  };

  const updateNode = (node) => {
    const index = techniques.findIndex((technique) => technique.id === node.id);
    const newTechniques = [...techniques];
    newTechniques[index] = node;
    setTechniques(newTechniques);
  };

  const deleteNode = async (id) => {
    const currentPath = window.location.pathname;

    const segments = currentPath.split('/');
    const projectID = segments[2];
    const accessToken = await getAccessTokenSilently();
    await axios.post(
      `${import.meta.env.VITE_APP_SERVER}/annotations/delete`,
      {
        projectID,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    closeAllNodeView();
    getProject();
    onDeleteNode();
  };

  if (showCreateNodeView) {
    return (
      <CreateNodeView
        annotationList={[...new Set(annotationIDList)]}
        onAddNode={addNode}
        onCloseNodeView={closeAllNodeView}
        highlight={highlight}
      />
    );
  }
  if (isShowEditNodeView) {
    return (
      <EditNodeView
        node={currentNode}
        annotationList={[...new Set(annotationIDList)]}
        onCloseNodeView={closeAllNodeView}
        onUpdateNode={updateNode}
        onDeleteNode={deleteNode}
      />
    );
  }
  return (
    <>
      <div className="flex font-semibold text-white text-md pr-4 items-center justify-between">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2"
          id="show_add"
          onClick={() => setShowCreateNodeView(true)}
        >
          Add
        </button>
        <p>Created: {techniques.length}</p>
      </div>
      <div className="overflow-y-scroll node-menu">
        <ul className="max-w-md divide-y divide-gray-200 px-2">
          {techniques.map((technique) => (
            <NodeMenuItem
              key={technique.id}
              node={technique}
              onShowEditNodeView={showEditNodeView}
              deleteNode={deleteNode}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

NodeMenu.propTypes = {
  onDeleteNode: PropTypes.func,
  setShowCreateNodeView: PropTypes.func,
  showCreateNodeView: PropTypes.bool,
  highlight: PropTypes.object,
};
export default NodeMenu;
