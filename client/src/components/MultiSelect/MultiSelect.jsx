import { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

const Multiselect = ({
  allItems,
  selectedItems,
  onAddAnnotation,
  onRemoveAnnotation,
}) => {
  // state showing if dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);
  // contains selected items

  const togleDropdown = (e) => {
    e.preventDefault();
    setDropdown(!dropdown);
  };
  // adds new item to multiselect
  const addTag = (item) => {
    onAddAnnotation(item);
    setDropdown(false);
  };
  // removes item from multiselect
  const removeTag = (item) => {
    onRemoveAnnotation(item);
  };

  return (
    <div className="autcomplete-wrapper">
      <div className="autcomplete">
        <div className="w-full flex flex-col items-center mx-auto">
          <div className="w-full">
            <div className="flex flex-col items-center relative">
              <div className="w-full ">
                <div className="flex border border-gray-600 bg-gray-700 placeholder-gray-400 text-white w-full rounded-lg">
                  <div className="flex flex-auto flex-wrap">
                    {selectedItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded text-red-700 bg-red-100 border border-red-300 h-8"
                      >
                        <div className="text-xs font-normal leading-none max-w-full flex-initial">
                          {item}
                        </div>
                        <div className="flex flex-auto flex-row-reverse">
                          <div onClick={() => removeTag(item)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-x cursor-pointer hover:text-red-400 rounded-full w-4 h-4 ml-2"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="text-gray-300 w-8 py-1 pl-2 pr-1 flex items-center border-gray-200"
                    onClick={togleDropdown}
                  >
                    <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-chevron-up w-4 h-4 text-white"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {dropdown && (
              <Dropdown
                items={allItems}
                selectedItems={selectedItems}
                addItem={addTag}
              ></Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Multiselect.propTypes = {
  allItems: PropTypes.array,
  selectedItems: PropTypes.array,
  onAddAnnotation: PropTypes.func,
  onRemoveAnnotation: PropTypes.func,
};

export default Multiselect;
