import PropTypes from 'prop-types';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import Multiselect from '../MultiSelect/MultiSelect';
import capitalizeFirstLetter from '../../utils/string';

const EditNodeView = ({
  node,
  annotationList,
  onCloseNodeView,
  onUpdateNode,
  onDeleteNode,
}) => {
  const [currentNode, setCurrentNode] = useState(node);
  const [currentHighlight, setCurrentHighlight] = useState('');

  const [selectedAnnotation, setSelectedAnnotation] = useState(
    node.children_relationship,
  );

  const addAnnotationHandler = (item) => {
    if (selectedAnnotation.includes(item)) {
      return;
    }
    setSelectedAnnotation((arr) => [...arr, item]);
  };

  const removeAnnotationHandler = (item) => {
    const filtered = selectedAnnotation.filter((e) => e !== item);
    setSelectedAnnotation(filtered);
  };
  useEffect(() => {
    setCurrentNode(node);
  }, [node]);

  const handleInputChange = (key, value) => {
    setCurrentNode({
      ...currentNode,
      [key]: value,
    });
  };

  return (
    <div>
      <div
        className="flex font-semibold text-white text-sm hover:opacity-80 cursor-pointer"
        onClick={onCloseNodeView}
      >
        <ChevronLeftIcon className="w-5 h-5" />
        <p className="mb-6 rounded-t-lg" type="button">
          Back
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onUpdateNode(currentNode);
          onCloseNodeView();
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="node-children"
            className="block mb-2 text-sm font-medium text-white"
          >
            Children
          </label>
          <Multiselect
            allItems={annotationList.filter(
              (annotationId) => annotationId !== node.annotation_id,
            )}
            selectedItems={selectedAnnotation}
            onAddAnnotation={addAnnotationHandler}
            onRemoveAnnotation={removeAnnotationHandler}
          />
        </div>
        {Object.keys(currentNode).map((key) => {
          if (
            [
              'id',
              'highlight_content',
              'highlight_comment',
              'highlight_position',
              'annotation_id',
            ].includes(key)
          )
            return null;
          return (
            <div className="mb-6" key={key}>
              <label
                htmlFor={`node-${key}`}
                className="block mb-2 text-sm font-medium text-white"
              >
                {capitalizeFirstLetter(key)}
              </label>
              <input
                type="text"
                id={`node-${key}`}
                className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-full p-2.5 rounded-lg"
                defaultValue={currentNode[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          );
        })}

        <div className="mb-6">
          <label
            htmlFor="node-highlight"
            className="block mb-2 text-sm font-medium text-white"
          >
            Highlight
          </label>
          <div className="flex">
            <input
              type="text"
              id="node-highlight"
              className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-50 p-2.5 mr-2 rounded-lg"
              value={currentHighlight}
              onChange={(e) => {
                setCurrentHighlight(e.target.value);
              }}
            />
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 w-full font-medium rounded-lg text-sm px-5 py-2 block disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-600 disabled:bg-gray-700 disabled:hover:bg-gray-700"
              onClick={(e) => {
                e.preventDefault();
                document.location.hash = `highlight-${currentHighlight}`;
              }}
              disabled={currentHighlight.length === 0}
            >
              Go
            </button>
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            className="text-red-500 hover:text-white border border-red-500 w-full hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center block ml-2"
            onClick={() => {
              onDeleteNode(currentNode.annotation_id);
            }}
          >
            Delete
          </button>
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 w-full font-medium rounded-lg text-sm px-5 py-2.5 block ml-2"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

EditNodeView.propTypes = {
  node: PropTypes.object.isRequired,
  annotationList: PropTypes.array,
  onCloseNodeView: PropTypes.func,
  onUpdateNode: PropTypes.func,
  onDeleteNode: PropTypes.func,
};

export default EditNodeView;
