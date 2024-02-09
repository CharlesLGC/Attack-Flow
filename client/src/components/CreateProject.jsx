import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Spinner from './PDFAnnotator/Spinner';
import capitalizeFirstLetter from '../utils/string';
import CreateProjectModal from './CreateProjectModal';

const CreateProject = () => {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [projects, setProjects] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  async function fetchData() {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await axios.get(
        `${import.meta.env.VITE_APP_SERVER}/attackflows/list`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setProjects(res.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently]);

  const createProject = async ({ title, description }) => {
    const accessToken = await getAccessTokenSilently();
    if (isAuthenticated) {
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER}/attackflows/create`,
        {
          title,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      fetchData();
    }
  };

  const deleteProject = async (projectID) => {
    const accessToken = await getAccessTokenSilently();
    if (isAuthenticated) {
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER}/attackflows/delete`,
        {
          projectID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      fetchData();
    }
  };

  return (
    <div className="w-full bg-white">
      <CreateProjectModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        createProject={createProject}
      />
      <NavBar currentRoute="/projects" />
      <div
        className={`w-full h-screen flex text-3xl font-bold ${
          isLoading ? 'justify-center items-center' : ''
        }`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="mx-auto max-w-7xl w-full px-2 sm:px-6 lg:px-8 mt-24">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-3xl font-bold leading-6 text-gray-900">
                  Projects
                </h1>
                <p className="mt-4 text-sm font-medium text-gray-700">
                  A list of all invited and personal attackflow projects.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="text-white bg-blue-700 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                >
                  Create New Project
                </button>
              </div>
            </div>
            <div className="flex w-full">
              {projects.length > 0 && (
                <ul
                  role="list"
                  className="divide-y divide-gray-100 w-full overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-8"
                >
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className="flex items-center justify-between hover:bg-gray-100 gap-x-6 px-4 py-5 sm:px-6"
                    >
                      <Link
                        as="div"
                        to={`/projects/${project.id}`}
                        className="min-w-0 flex-1"
                      >
                        <div className="flex items-start gap-x-3">
                          <p className="text-base font-bold leading-6 text-gray-900">
                            {capitalizeFirstLetter(project.title)}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                          <p className="whitespace-nowrap font-normal">
                            Created on{' '}
                            <time dateTime={project.created_at}>
                              {new Date(project.created_at).toLocaleDateString(
                                'en-us',
                                {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                },
                              )}
                            </time>
                          </p>
                          <svg
                            viewBox="0 0 2 2"
                            className="h-0.5 w-0.5 fill-current"
                          >
                            <circle cx={1} cy={1} r={1} />
                          </svg>
                          <p className="truncate font-normal">
                            {project.description}
                          </p>
                        </div>
                      </Link>
                      <div className="flex flex-none items-center gap-x-4">
                        <p
                          className={`rounded-md whitespace-nowrap mt-0.5 px-4 py-2 text-sm font-semibold ring-1 ring-inset ${
                            project.is_approved
                              ? 'text-green-700 bg-green-50 ring-green-600/20'
                              : 'text-gray-700 bg-gray-300 ring-gray-500/10'
                          }`}
                        >
                          {project.is_approved ? 'Published' : 'In Progress'}
                        </p>
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteProject(project.id);
                          }}
                          className="ml-1 block px-3 py-1 text-sm leading-6 text-red-600 hover:text-red-800 font-medium cursor-pointer"
                        >
                          Delete
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
