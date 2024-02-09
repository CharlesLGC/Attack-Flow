import './CustomHighlight.css';
import PropTypes from 'prop-types';

const CustomHighlight = ({
  position,
  onClick,
  onMouseOver,
  onMouseOut,
  comment,
  isScrolledTo,
}) => {
  const { rects, boundingRect } = position;

  return (
    <div className={`Highlight ${isScrolledTo ? 'Highlight--scrolledTo' : ''}`}>
      {comment ? (
        <div
          className="Highlight__emoji"
          style={{
            left: 20,
            top: boundingRect.top,
          }}
        >
          {comment.emoji}
        </div>
      ) : null}
      <div className="Highlight__parts">
        {rects.map((rect, index) => {
          return (
            <div
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              key={index}
              style={rect}
              className={`Highlight__part`}
            />
          );
        })}
      </div>
    </div>
  );
};

CustomHighlight.propTypes = {
  position: PropTypes.shape({
    boundingRect: PropTypes.object,
    rects: PropTypes.array,
  }),
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  comment: PropTypes.shape({
    emoji: PropTypes.string,
    text: PropTypes.string,
  }),
  isScrolledTo: PropTypes.bool,
};

export default CustomHighlight;
