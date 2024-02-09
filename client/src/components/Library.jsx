import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Spinner from './PDFAnnotator/Spinner';

function Library() {
  const { isLoading } = useAuth0();
  const [projects, setProjects] = useState([]);

  async function fetchData() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_SERVER}/attackflows/approved`,
      );
      setProjects(res.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full bg-white">
      <NavBar currentRoute="/library" />
      <div
        className={`w-full h-screen flex text-3xl font-bold ${
          isLoading ? 'justify-center items-center' : ''
        }`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-5xl font-bold tracking-tight text-gray-900 mb-8">
                Library
              </h2>
              <p className="mt-2 font-normal text-lg leading-8 text-gray-600">
                Discover published attackflow projects and gain insights from
                annotated incident reports by our cybersecurity experts.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 pb-32">
              {projects.map((project) => (
                <Link
                  to={`/graph/${project.id}`}
                  key={project.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:opacity-90"
                >
                  <img
                    src={
                      project.image ||
                      'https://images.pexels.com/photos/4110156/pexels-photo-4110156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time
                      dateTime={project.created_at}
                      className="mr-8 font-normal"
                    >
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
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-primary-yellow">
                    {project.title}
                  </h3>
                  <p className="truncate text-sm text-gray-300 font-normal mt-3">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;
