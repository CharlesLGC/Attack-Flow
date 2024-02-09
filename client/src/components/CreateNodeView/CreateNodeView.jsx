import PropTypes from 'prop-types';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import CustomForm from '../CustomForm';

const CreateNodeView = ({ annotationList, onCloseNodeView, highlight }) => {
  const [currentHighlight, setCurrentHighlight] = useState('');
  const [selectedType, setSelectedType] = useState('');
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
      <div className="mb-6">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-white"
        >
          Select a type
        </label>
        <select
          id="countries"
          className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-full p-2.5 rounded-lg"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Choose a node type</option>
          <option value="action">Action</option>
          <option value="asset">Asset</option>
          <option value="campaign">Campaign</option>
          <option value="condition">Condition</option>
          <option value="directory">Directory</option>
          <option value="file">File</option>
          <option value="identity">Identity</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="ipv4">IPv4 Address</option>
          <option value="malware">Malware</option>
          <option value="note">Note</option>
          <option value="process">Process</option>
          <option value="software">Software</option>
          <option value="threatActor">Threat Actor</option>
          <option value="tool">Tool</option>
          <option value="url">URL</option>
          <option value="userAccount">User Account</option>
          <option value="vulnerability">Vulnerability</option>
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="node-desc"
          className="block mb-2 text-sm font-medium text-white"
        >
          Highlight
        </label>
        <div className="flex">
          <input
            type="text"
            id="node-highlight"
            className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-50 p-2.5 mr-2 rounded-lg"
            value={highlight?.content.text}
            onChange={(e) => {
              setCurrentHighlight(e.target.value);
            }}
          />
          <button
            type="submit"
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
      {selectedType === 'action' && (
        <CustomForm
          annotationType={selectedType}
          tag={true}
          name={true}
          description={true}
          confidence={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'asset' && (
        <CustomForm
          annotationType={selectedType}
          name={true}
          description={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'campaign' && (
        <CustomForm
          annotationType={selectedType}
          name={true}
          description={true}
          firstSeen={true}
          objective={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'condition' && (
        <CustomForm
          annotationType={selectedType}
          description={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'directory' && (
        <CustomForm
          annotationType={selectedType}
          path={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'file' && (
        <CustomForm
          annotationType={selectedType}
          name={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'identity' && (
        <CustomForm
          annotationType={selectedType}
          authorName={true}
          authorEmail={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'infrastructure' && (
        <CustomForm
          annotationType={selectedType}
          name={true}
          description={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'ipv4' && (
        <CustomForm
          annotationType={selectedType}
          value={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'malware' && (
        <CustomForm
          annotationType={selectedType}
          name={true}
          description={true}
          isFamily={true}
          type={true}
          capabilities={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'note' && (
        <CustomForm
          annotationType={selectedType}
          content={true}
          authors={true}
          objectRefs={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'process' && (
        <CustomForm
          annotationType={selectedType}
          commandLine={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'software' && (
        <CustomForm
          annotationType={selectedType}
          path={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'threatActor' && (
        <CustomForm
          annotationType={selectedType}
          path={true}
          name={true}
          description={true}
          types={true}
          aliases={true}
          firstSeen={true}
          roles={true}
          goals={true}
          sophistication={true}
          resourceLevel={true}
          primaryMotivation={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'tool' && (
        <CustomForm
          annotationType={selectedType}
          name={true}
          description={true}
          types={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'url' && (
        <CustomForm
          annotationType={selectedType}
          value={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'userAccount' && (
        <CustomForm
          annotationType={selectedType}
          email={true}
          displayName={true}
          isPrivileged={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
      {selectedType === 'vulnerability' && (
        <CustomForm
          annotationType={selectedType}
          name={true}
          description={true}
          highlight={highlight}
          onCloseNodeView={onCloseNodeView}
          annotationList={annotationList}
        />
      )}
    </div>
  );
};

CreateNodeView.propTypes = {
  annotationList: PropTypes.array,
  onCloseNodeView: PropTypes.func,
  highlight: PropTypes.object,
  closeAllNodeView: PropTypes.func,
};

export default CreateNodeView;
