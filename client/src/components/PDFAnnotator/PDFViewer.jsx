import { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PropsTypes from 'prop-types';
import './PDFViewer.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

function PDFViewer({ file, onUpdateSelectedText }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    onUpdateSelectedText(selectedText);
  };

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    if (nextNumPages) {
      setNumPages(nextNumPages);
    } else {
      setNumPages(0);
    }
  }

  useEffect(() => {
    setPageNumber(1);
  }, [file]);

  return (
    <div className="flex-1">
      {numPages > 0 && (
        <div className="page-control bg-[#202938] flex py-4 px-3">
          <div className=" rounded overflow-hidden flex">
            <button
              className="prev-page px-1 text-center text-sm bg-white border-0 font-inherit w-[30px] h-[30px] enabled:hover:bg-gray-200 disabled:text-gray-400"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="h-[30px] bg-white min-w-[70px] justify-center flex">
              <span className="font-inherit text-[.8rem] px-2 m-auto">
                {pageNumber} of {numPages}
              </span>
            </div>
            <button
              className="next-page px-1 text-center text-sm bg-white border-0 font-inherit w-[30px] h-[30px] enabled:hover:bg-gray-200 disabled:text-gray-400"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      {file ? (
        <div
          className="pdf-viewer-document overflow-y-scroll bg-gray-300"
          onMouseUp={handleTextSelection}
        >
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              width={900}
            />
          </Document>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

PDFViewer.propTypes = {
  file: PropsTypes.file,
  onUpdateSelectedText: PropsTypes.func,
};

export default PDFViewer;
