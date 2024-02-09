import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Multiselect from './MultiSelect/MultiSelect';
// Helper functions to render individual input fields
function renderTextInput(id, value, onChange) {
  return (
    <div className="mb-6">
      <label
        htmlFor={`${id}-input`}
        className="block mb-2 text-sm font-medium text-white"
      >
        {id.split('_').join(' ')}
      </label>
      <input
        type="text"
        id={`${id}-input`}
        value={value}
        onChange={onChange}
        className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-full p-2.5 rounded-lg"
      />
    </div>
  );
}

function renderTextArea(id, value, onChange) {
  return (
    <div className="mb-6">
      <label
        htmlFor={`${id}-textarea`}
        className="block mb-2 text-sm font-medium text-white"
      >
        {id.split('_').join(' ')}
      </label>
      <textarea
        id={`${id}-textarea`}
        value={value}
        onChange={onChange}
        className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-full p-2.5 rounded-lg"
      ></textarea>
    </div>
  );
}

function renderTrueFalse(id, onChange) {
  return (
    <div className="mb-6">
      <label
        htmlFor={`${id}-select`}
        className="block mb-2 text-sm font-medium text-white"
      >
        {id.split('_').join(' ')}
      </label>
      <select
        id={`${id}-select`}
        onChange={onChange}
        className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-full p-2.5 rounded-lg"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>
  );
}

function renderDateTimeInput(id, value, onChange) {
  return (
    <div className="mb-6">
      <label
        htmlFor={`${id}-input`}
        className="block mb-2 text-sm font-medium text-white"
      >
        {id.split('_').join(' ')}
      </label>
      <input
        type="datetime-local"
        id={`${id}-input`}
        value={value}
        onChange={onChange}
        className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-full p-2.5 rounded-lg"
      />
    </div>
  );
}
function renderNumberInput(id, value, onChange) {
  return (
    <div className="mb-6">
      <label
        htmlFor={`${id}-input`}
        className="block mb-2 text-sm font-medium text-white"
      >
        {id.split('_').join(' ')}
      </label>
      <input
        type="number"
        id={`${id}-input`}
        value={value}
        onChange={onChange}
        className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-full p-2.5 rounded-lg"
      />
    </div>
  );
}

function CustomForm({
  aliases = false,
  annotationList = [],
  annotationType = '',
  authorEmail = false,
  authorName = false,
  authors = false,
  capabilities = false,
  commandLine = false,
  confidence = false,
  content = false,
  description = false,
  displayName = false,
  email = false,
  firstSeen = false,
  goals = false,
  highlight = {},
  isFamily = false,
  isPrivileged = false,
  name = false,
  objective = false,
  objectRefs = false,
  onCloseNodeView,
  path = false,
  primaryMotivation = false,
  resourceLevel = false,
  roles = false,
  sophistication = false,
  tag = '',
  type = '',
  types = false,
  value = false,
}) {
  const { getAccessTokenSilently, user } = useAuth0();
  const [aliases_, setAliases_] = useState(null);
  const [authorEmail_, setAuthorEmail_] = useState(null);
  const [authorName_, setAuthorName_] = useState(null);
  const [authors_, setAuthors_] = useState(null);
  const [capabilities_, setCapabilities_] = useState(null);
  const [commandLine_, setCommandLine_] = useState(null);
  const [confidence_, setConfidence_] = useState(null);
  const [content_, setContent_] = useState(null);
  const [description_, setDescription_] = useState(null);
  const [displayName_, setDisplayName_] = useState(null);
  const [email_, setEmail_] = useState(null);
  const [firstSeen_, setFirstSeen_] = useState(null);
  const [goals_, setGoals_] = useState(null);
  const [isFamily_, setIsFamily_] = useState(isFamily ? true : null);
  const [isPrivileged_, setIsPrivileged_] = useState(
    isPrivileged ? true : null,
  );
  const [name_, setName_] = useState(null);
  const [objective_, setObjective_] = useState(null);
  const [objectRefs_, setObjectRefs_] = useState(null);
  const [path_, setPath_] = useState(null);
  const [primaryMotivation_, setPrimaryMotivation_] = useState(null);
  const [resourceLevel_, setResourceLevel_] = useState(null);
  const [roles_, setRoles_] = useState(null);
  const [selectedAnnotation, setSelectedAnnotation] = useState([]);
  const [sophistication_, setSophistication_] = useState(null);
  const [tag_, setTag_] = useState(null);
  const [type_, setType_] = useState(null);
  const [types_, setTypes_] = useState(null);
  const [value_, setValue_] = useState(null);

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

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = {};
    if (aliases_) formData.aliases = JSON.stringify(aliases_);
    if (authorEmail_) formData.authorEmail = authorEmail_;
    if (authorName_) formData.authorName = authorName_;
    if (authors_) formData.authors = JSON.stringify(authors_);
    if (capabilities_) formData.capabilities = JSON.stringify(capabilities_);
    if (commandLine_) formData.commandLine = commandLine_;
    if (confidence_) formData.confidence = confidence_;
    if (content_) formData.content = content_;
    if (description_) formData.description = description_;
    if (displayName_) formData.displayName = displayName_;
    if (email_) formData.email = email_;
    if (firstSeen_) formData.firstSeen = firstSeen_;
    if (goals_) formData.goals = JSON.stringify(goals_);
    if (isFamily_) formData.isFamily = isFamily_ ? 1 : 0;
    if (isPrivileged_) formData.isPrivileged = isPrivileged_ ? 1 : 0;
    if (name_) formData.name = name_;
    if (objective_) formData.objective = objective_;
    if (objectRefs_) formData.objectRefs = JSON.stringify(objectRefs_);
    if (path_) formData.path = path_;
    if (primaryMotivation_) formData.primaryMotivation = primaryMotivation_;
    if (resourceLevel_) formData.resourceLevel = resourceLevel_;
    if (roles_) formData.roles = JSON.stringify(roles_);
    if (sophistication_) formData.sophistication = sophistication_;
    if (tag_) formData.tag = tag_;
    if (type_) formData.type = JSON.stringify(type_);
    if (types_) formData.types = JSON.stringify(types_);
    if (value_) formData.value = value_;
    const accessToken = await getAccessTokenSilently();

    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    const projectID = segments[2];
    const annotationBody = {
      projectID,
      [annotationType]: formData,
      highlightContent: highlight.content,
      highlightComment: highlight.comment,
      highlightPosition: highlight.position,
      user: user.email,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_APP_SERVER}/annotations/create`,
      annotationBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    selectedAnnotation.forEach(async (targetAnnotation) => {
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER}/relationships/create`,
        {
          projectID,
          source: res.data.annotation_id,
          target: targetAnnotation,
          status: 'is-effect',
          type: {
            AND: true,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    });
    onCloseNodeView();
  }

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="node-children"
          className="block mb-2 text-sm font-medium text-white"
        >
          Children
        </label>
        <Multiselect
          allItems={annotationList}
          selectedItems={selectedAnnotation}
          onAddAnnotation={addAnnotationHandler}
          onRemoveAnnotation={removeAnnotationHandler}
        />
      </div>
      <div className="custom-form">
        {aliases &&
          renderTextInput('Aliases', aliases_, (e) =>
            setAliases_(e.target.value),
          )}
        {authorEmail &&
          renderTextInput('Author_Email', authorEmail_, (e) =>
            setAuthorEmail_(e.target.value),
          )}
        {authorName &&
          renderTextInput('Author_Name', authorName_, (e) =>
            setAuthorName_(e.target.value),
          )}
        {authors &&
          renderTextArea('Authors', authors_, (e) =>
            setAuthors_(e.target.value),
          )}
        {capabilities &&
          renderTextArea('Capabilities', capabilities_, (e) =>
            setCapabilities_(e.target.value),
          )}
        {commandLine &&
          renderTextInput('Command Line', commandLine_, (e) =>
            setCommandLine_(e.target.value),
          )}
        {confidence &&
          renderNumberInput('Confidence', confidence_, (e) =>
            setConfidence_(e.target.value),
          )}
        {content &&
          renderTextArea('Content', content_, (e) =>
            setContent_(e.target.value),
          )}
        {description &&
          renderTextArea('Description', description_, (e) =>
            setDescription_(e.target.value),
          )}
        {displayName &&
          renderTextInput('Display Name', displayName_, (e) =>
            setDisplayName_(e.target.value),
          )}
        {email &&
          renderTextInput('Email', email_, (e) => setEmail_(e.target.value))}
        {firstSeen &&
          renderDateTimeInput('First_Seen', firstSeen_, (e) =>
            setFirstSeen_(e.target.value),
          )}
        {goals &&
          renderTextInput('Goals', goals_, (e) => setGoals_(e.target.value))}
        {isFamily &&
          renderTrueFalse('Is Family', (e) => setIsFamily_(e.target.value))}
        {isPrivileged &&
          renderTrueFalse('Is Privileged', (e) =>
            setIsPrivileged_(e.target.value),
          )}
        {name &&
          renderTextInput('Name', name_, (e) => setName_(e.target.value))}
        {objective &&
          renderTextArea('Objective', objective_, (e) =>
            setObjective_(e.target.value),
          )}
        {objectRefs &&
          renderTextArea('ObjectRefs', objectRefs_, (e) =>
            setObjectRefs_(e.target.value),
          )}
        {path &&
          renderTextInput('Path', path_, (e) => setPath_(e.target.value))}
        {primaryMotivation &&
          renderTextInput('Primary_Motivation', primaryMotivation_, (e) =>
            setPrimaryMotivation_(e.target.value),
          )}
        {resourceLevel &&
          renderTextInput('Resource_Level', resourceLevel_, (e) =>
            setResourceLevel_(e.target.value),
          )}
        {roles &&
          renderTextInput('Roles', roles_, (e) => setRoles_(e.target.value))}
        {sophistication &&
          renderTextInput('Sophistication', sophistication_, (e) =>
            setSophistication_(e.target.value),
          )}
        {tag && renderTextInput('Tag', tag_, (e) => setTag_(e.target.value))}
        {type &&
          renderTextInput('Type', type_, (e) => setType_(e.target.value))}
        {types &&
          renderTextArea('Types', types_, (e) => setTypes_(e.target.value))}
        {value &&
          renderTextInput('Value', value_, (e) => setValue_(e.target.value))}
      </div>
      <button
        type="submit"
        className="text-white bg-blue-600 hover:bg-blue-700 w-full font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none block"
      >
        Create
      </button>
    </form>
  );
}
CustomForm.propTypes = {
  aliases: PropTypes.bool,
  annotationList: PropTypes.array,
  annotationType: PropTypes.string,
  authorEmail: PropTypes.bool,
  authorName: PropTypes.bool,
  authors: PropTypes.bool,
  capabilities: PropTypes.bool,
  commandLine: PropTypes.bool,
  confidence: PropTypes.bool,
  content: PropTypes.bool,
  description: PropTypes.bool,
  displayName: PropTypes.bool,
  email: PropTypes.bool,
  firstSeen: PropTypes.bool,
  goals: PropTypes.bool,
  highlight: PropTypes.object,
  isFamily: PropTypes.bool,
  isPrivileged: PropTypes.bool,
  name: PropTypes.bool,
  objective: PropTypes.bool,
  objectRefs: PropTypes.bool,
  onCloseNodeView: PropTypes.func,
  path: PropTypes.bool,
  primaryMotivation: PropTypes.bool,
  resourceLevel: PropTypes.bool,
  roles: PropTypes.bool,
  sophistication: PropTypes.bool,
  tag: PropTypes.string,
  type: PropTypes.string,
  types: PropTypes.bool,
  value: PropTypes.bool,
};

export default CustomForm;
