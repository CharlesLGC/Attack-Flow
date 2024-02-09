import PropsTypes from 'prop-types';
import capitalizeFirstLetter from '../../utils/string';

const NodeMenuItem = ({ node, deleteNode }) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {node.highlight_content.text}
          </p>
          <p className="text-sm text-gray-400 truncate italic">
            {capitalizeFirstLetter(node.annotation_type)}
          </p>
          <p className="text-xs text-gray-500 truncate italic">
            {node.annotation_id}
          </p>
        </div>
        <div
          className="inline-flex items-center text-base font-semibold text-white text-sm hover:text-blue-600 cursor-pointer"
          onClick={() => deleteNode(node.annotation_id)}
        >
          Delete
        </div>
      </div>
    </li>
  );
};

NodeMenuItem.propTypes = {
  node: PropsTypes.object.isRequired,
  deleteNode: PropsTypes.func,
};

export default NodeMenuItem;
