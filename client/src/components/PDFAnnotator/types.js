import PropTypes from 'prop-types';

const LTWHPropType = PropTypes.shape({
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});

const LTWHPPropType = PropTypes.shape({
  ...LTWHPropType,
  pageNumber: PropTypes.number,
});

const ScaledPropType = PropTypes.shape({
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pageNumber: PropTypes.number,
});

const PositionPropType = PropTypes.shape({
  boundingRect: LTWHPPropType.isRequired,
  rects: PropTypes.arrayOf(LTWHPPropType).isRequired,
  pageNumber: PropTypes.number.isRequired,
});

const ScaledPositionPropType = PropTypes.shape({
  boundingRect: ScaledPropType.isRequired,
  rects: PropTypes.arrayOf(ScaledPropType).isRequired,
  pageNumber: PropTypes.number.isRequired,
  usePdfCoordinates: PropTypes.bool,
});

const ContentPropType = PropTypes.shape({
  text: PropTypes.string,
  image: PropTypes.string,
});

const HighlightContentPropType = PropTypes.shape({
  content: ContentPropType.isRequired,
});

const CommentPropType = PropTypes.shape({
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
});

const HighlightCommentPropType = PropTypes.shape({
  comment: CommentPropType.isRequired,
});

const NewHighlightPropType = PropTypes.shape({
  ...HighlightContentPropType,
  ...HighlightCommentPropType,
  position: ScaledPositionPropType.isRequired,
});

const IHighlightPropType = PropTypes.shape({
  ...NewHighlightPropType,
  id: PropTypes.string.isRequired,
});

const ViewportPropType = PropTypes.shape({
  convertToPdfPoint: PropTypes.func.isRequired,
  convertToViewportRectangle: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
});

const PagePropType = PropTypes.shape({
  node: PropTypes.instanceOf(HTMLElement).isRequired,
  number: PropTypes.number.isRequired,
});

export {
  LTWHPPropType,
  PositionPropType,
  ContentPropType,
  HighlightCommentPropType,
  HighlightContentPropType,
  IHighlightPropType,
  ViewportPropType,
  PagePropType,
};
