import PropTypes from 'prop-types';
import { useEffect } from 'react';

const TipCard = ({ onOpen, onCreateNode }) => {
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return (
    <div className="z-10 text-base list-none divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700">
      <ul className="py-2" aria-labelledby="dropdownButton">
        <li>
          <div
            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white cursor-pointer"
            onClick={() => {
              onCreateNode();
            }}
          >
            Create Annotation
          </div>
        </li>
        {/* <li>
          <div
            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white cursor-pointer"
            onClick={() => {
              onCopy();
            }}
          >
            Copy
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default TipCard;

TipCard.propTypes = {
  onOpen: PropTypes.func,
  onCreateNode: PropTypes.func,
  onCopy: PropTypes.func,
};
