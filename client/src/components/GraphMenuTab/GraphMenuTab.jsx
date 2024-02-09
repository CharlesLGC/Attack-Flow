import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GraphMenuTab = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const createGraph = async (e) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    const projectID = segments[2];
    const res = await axios.post(
      `${
        import.meta.env.VITE_APP_SERVER
      }/relationships/get-unrelated-annotations`,
      {
        projectID,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (res.data.length === 0) {
      navigate(`/graph/${projectID}`);
      return;
    }
    setMessage(
      `Please connect all these nodes before creating a graph: ${res.data
        .map((id) => id)
        .join(', ')}`,
    );
  };

  useEffect(() => {
    async function getProject() {
      const accessToken = await getAccessTokenSilently();
      const currentPath = window.location.pathname;
      const segments = currentPath.split('/');
      const projectID = segments[2];
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_SERVER
        }/attackflows/get?projectID=${projectID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setProjectData(res.data[0]);
      // Load file if exists
    }
    getProject();
  }, [getAccessTokenSilently]);
  return (
    <form>
      <div className="mb-6">
        <label
          htmlFor="graph-name"
          className="block mb-2 text-sm font-medium text-white"
        >
          Project Name
        </label>
        <input
          type="text"
          id="graph-name"
          className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-400 block w-full p-2.5 rounded-lg cursor-not-allowed"
          value={projectData.title}
          disabled
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="graph-desc"
          className="block mb-2 text-sm font-medium text-white"
        >
          Project Description
        </label>
        <textarea
          id="graph-desc"
          rows="4"
          className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-400 block w-full p-2.5 rounded-lg cursor-not-allowed"
          value={projectData.description}
          disabled
        ></textarea>
      </div>
      {message ? <p className="text-red-500 text-sm mb-6">{message}</p> : null}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 w-full font-medium rounded-lg text-sm px-5 py-2.5 block"
        onClick={createGraph}
      >
        Create graph
      </button>
    </form>
  );
};

export default GraphMenuTab;
