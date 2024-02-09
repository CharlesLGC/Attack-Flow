import PropTypes from 'prop-types';

const Dropdown = ({ items, selectedItems, addItem }) => (
  <div
    id="dropdown"
    className="absolute shadow top-100 bg-white z-40 max-h-40 overflow-y-auto"
  >
    <div className="flex flex-col w-[254px] text-black">
      {items.map((item, key) => {
        const isSelected = selectedItems.includes(item);
        const commonClasses =
          'flex items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-red-100 text-sm';
        const containerClasses = isSelected
          ? 'border-gray-100 border-b bg-red-100'
          : 'cursor-pointer border-gray-100 border-b hover:bg-red-100';

        return (
          <div
            key={key}
            className={containerClasses}
            onClick={() => addItem(item)}
          >
            <div className={commonClasses}>
              <div className="flex items-center">
                <div className="mx-2 leading-6">{item}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

Dropdown.propTypes = {
  items: PropTypes.array,
  selectedItems: PropTypes.array,
  addItem: PropTypes.func,
};

export default Dropdown;
