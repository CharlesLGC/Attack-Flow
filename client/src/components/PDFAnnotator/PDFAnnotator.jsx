import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  PdfLoader,
  PdfHighlighter,
  Popup,
  AreaHighlight,
} from 'react-pdf-highlighter';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Spinner from './Spinner';
import './PDFAnnotator.css';
import TipCard from '../TipCard/TipCard';
import CustomHighlight from './CustomHighlight';
import colors from '../../utils/highlight-colors';

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice('#highlight-'.length);

const resetHash = () => {
  document.location.hash = '';
};
const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div
      className="Highlight__popup"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <span>
        {comment.emoji} {comment.text}
      </span>
    </div>
  ) : null;

const PDFAnnotator = ({
  blob,
  onHighlight,
  loading,
  openSideMenu,
  setShowCreateNodeView,
}) => {
  const [url, setUrl] = useState('');
  const [highlights, setHighlights] = useState([]);
  const { user } = useAuth0();
  const [colorMapping] = useState({});
  const colorIndexRef = useRef(0);
  const scrollViewerTo = useRef();
  const { getAccessTokenSilently } = useAuth0();

  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = highlights.find((h) => h.id === parseIdFromHash());

    if (highlight && scrollViewerTo.current) {
      scrollViewerTo.current(highlight);
    }
  }, [highlights]);
  useEffect(() => {
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
      const highlightsData = res.data.map((annotation) => {
        return {
          id: annotation.id,
          comment: annotation.highlight_comment,
          content: annotation.highlight_content,
          position: annotation.highlight_position,
        };
      });
      setHighlights(highlightsData);
    }
    getProject();
  }, [getAccessTokenSilently, blob]);

  useEffect(() => {
    highlights.forEach((highlight) => {
      const highlightEmail = highlight.comment.text;
      if (!Object.prototype.hasOwnProperty.call(colorMapping, highlightEmail)) {
        colorMapping[highlightEmail] =
          colors[colorIndexRef.current % colors.length];
        colorIndexRef.current += 1;
      }
    });
  }, [colorIndexRef, colorMapping, highlights]);

  useEffect(() => {
    if (blob) {
      setUrl(URL.createObjectURL(blob));
      setHighlights([]);
    }
  }, [blob]);

  useEffect(() => {
    window.addEventListener('hashchange', scrollToHighlightFromHash, false);
    return () => {
      window.removeEventListener(
        'hashchange',
        scrollToHighlightFromHash,
        false,
      );
    };
  }, [scrollToHighlightFromHash]);

  const addHighlight = (highlight, id) => {
    setHighlights([{ ...highlight, id }, ...highlights]);
  };

  const updateHighlight = (highlightId, position, content) => {
    setHighlights(
      highlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;

        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      }),
    );
  };

  return (
    <div className="pdf-annotator flex w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full h-full relative border-x-2 border-gray-300">
        <PdfLoader
          url={url}
          beforeLoad={
            loading ? (
              <Spinner />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="font-semibold text-2xl">
                  Please upload a file to begin annotation.
                </p>
              </div>
            )
          }
        >
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
              scrollRef={(scrollTo) => {
                scrollViewerTo.current = scrollTo;
                scrollToHighlightFromHash();
              }}
              onSelectionFinished={(
                position,
                content,
                hideTipAndSelection,
                transformSelection,
              ) => (
                <div>
                  <TipCard
                    onOpen={transformSelection}
                    onCreateNode={() => {
                      addHighlight(
                        { content, position, comment: { text: user.email } },
                        getNextId(),
                      );
                      openSideMenu();
                      setShowCreateNodeView(true);
                      onHighlight({
                        content,
                        position,
                        comment: { text: user.email },
                      });
                      hideTipAndSelection();
                    }}
                    onCopy={async () => {
                      const nextId = getNextId();
                      addHighlight(
                        { content, position, comment: { text: user.email } },
                        nextId,
                      );
                      await navigator.clipboard.writeText(nextId);
                      hideTipAndSelection();
                    }}
                  />
                </div>
              )}
              highlightTransform={(
                highlight_,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo,
              ) => {
                const highlight = highlight_;
                const updatedRects = highlight.position.rects.map((rect) => ({
                  ...rect,
                  backgroundColor:
                    colorMapping[
                      (highlight.comment && highlight.comment.text) || '#84cc16'
                    ],
                }));

                highlight.position.rects = updatedRects;

                const isTextHighlight = !(
                  highlight.content && highlight.content.image
                );

                const component = isTextHighlight ? (
                  <CustomHighlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                    onClick={() => openSideMenu()}
                  />
                ) : (
                  <AreaHighlight
                    isScrolledTo={isScrolledTo}
                    highlight={highlight}
                    onChange={(boundingRect) => {
                      updateHighlight(
                        highlight.id,
                        { boundingRect: viewportToScaled(boundingRect) },
                        { image: screenshot(boundingRect) },
                      );
                    }}
                    onClick={() => openSideMenu()}
                  />
                );

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={(popupContent) =>
                      setTip(highlight, () => popupContent)
                    }
                    onMouseOut={hideTip}
                    key={index}
                  >
                    {component}
                  </Popup>
                );
              }}
              highlights={highlights}
            />
          )}
        </PdfLoader>
      </div>
    </div>
  );
};

export default PDFAnnotator;

HighlightPopup.propTypes = {
  comment: PropTypes.shape({
    text: PropTypes.string,
    emoji: PropTypes.string,
  }),
};

PDFAnnotator.propTypes = {
  blob: PropTypes.object,
  onHighlight: PropTypes.func,
  loading: PropTypes.bool,
  openSideMenu: PropTypes.func,
  setShowCreateNodeView: PropTypes.func,
};
