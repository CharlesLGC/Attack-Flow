import PropTypes from 'prop-types';
import { useEffect } from 'react';
import NodeMenu from '../NodeMenu/NodeMenu';
import GraphMenuTab from '../GraphMenuTab/GraphMenuTab';
import './MenuDrawer.css';

const MenuDrawer = ({
  highlight,
  onDeleteNode,
  showCreateNodeView,
  setShowCreateNodeView,
  activeTab,
  setActiveTab,
}) => {
  useEffect(() => {
    if (showCreateNodeView) setActiveTab('nodes');
  }, [setActiveTab, showCreateNodeView]);

  return (
    <>
      <div
        id="drawer-right-example"
        className="menu-drawer fixed right-0 z-40 h-screen px-6 py-8 overflow-y-auto transition-transform translate-x-full bg-gray-800 w-80"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-white"
        >
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-right-example"
          aria-controls="drawer-right-example"
          className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center hover:bg-gray-600 hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <div className="mb-4">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-300"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block hover:bg-gray-700 p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'graph'
                    ? 'text-white border-white'
                    : 'text-gray-400 border-gray-400'
                }`}
                id="graph-tab"
                data-tabs-target="#graph"
                type="button"
                role="tab"
                aria-controls="graph"
                aria-selected={activeTab === 'graph'}
                onClick={() => setActiveTab('graph')}
              >
                Graph
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block hover:bg-gray-700 p-4 border-b-2 rounded-t-lg ${
                  activeTab === 'nodes'
                    ? 'text-white border-white'
                    : 'text-gray-400 border-gray-400'
                }`}
                id="nodes-tab"
                data-tabs-target="#nodes"
                type="button"
                role="tab"
                aria-controls="nodes"
                aria-selected={activeTab === 'nodes'}
                onClick={() => setActiveTab('nodes')}
              >
                Nodes
              </button>
            </li>
          </ul>
        </div>
        <div id="myTabContent">
          <div
            className={`${activeTab === 'graph' ? '' : 'hidden'}`}
            id="graph"
            role="tabpanel"
            aria-labelledby="graph-tab"
          >
            <GraphMenuTab />
          </div>
          <div
            className={`${activeTab === 'nodes' ? '' : 'hidden'}`}
            id="nodes"
            role="tabpanel"
            aria-labelledby="nodes-tab"
          >
            <NodeMenu
              highlight={highlight}
              onDeleteNode={onDeleteNode}
              showCreateNodeView={showCreateNodeView}
              setShowCreateNodeView={setShowCreateNodeView}
            />
          </div>
        </div>
      </div>
    </>
  );
};

MenuDrawer.propTypes = {
  onDeleteNode: PropTypes.func,
  setShowCreateNodeView: PropTypes.func,
  highlight: PropTypes.object,
  showCreateNodeView: PropTypes.bool,
  activeTab: PropTypes.bool,
  setActiveTab: PropTypes.func,
};

export default MenuDrawer;
