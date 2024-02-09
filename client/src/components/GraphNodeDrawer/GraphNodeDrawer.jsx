import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import capitalizeFirstLetter from '../../utils/string';
import CreateApprovalRequestModal from '../CreateApprovalRequestModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const GraphNodeDrawer = ({ node, screenshot, projectID }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [showApprovalRequestButton, setShowApprovalRequestButton] =
    useState(false);
  const [openModal, setOpenModal] = useState(false);

  const createApprovalRequest = async ({ description }) => {
    try {
      // Fetch Project
      const accessToken = await getAccessTokenSilently();
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER}/approval-requests/create`,
        {
          description,
          projectID,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const getProject = async () => {
    try {
      // Fetch Project
      const accessToken = await getAccessTokenSilently();
      const projectRes = await axios.get(
        `${
          import.meta.env.VITE_APP_SERVER
        }/attackflows/get?projectID=${projectID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (
        projectRes.data.length === 1 &&
        projectRes.data[0].is_approved === false
      )
        setShowApprovalRequestButton(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, projectID]);

  return (
    <>
      <CreateApprovalRequestModal
        open={openModal}
        setOpen={setOpenModal}
        createApprovalRequest={createApprovalRequest}
      />
      <div
        id="drawer-right-menu"
        className="fixed right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-800 shrink w-72"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <div className="flex flex-col">
          <Menu as="div" className="relative inline-block text-left mb-4">
            <div className="flex">
              <Menu.Button className="flex text-sm py-3 px-5 rounded-md border-0 font-semibold bg-primary-yellow text-black cursor-pointer text-center flex items-center justify-center flex-1 hover:bg-opacity-80 items-center whitespace-nowrap">
                Download
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          screenshot('image/png');
                        }}
                      >
                        PNG
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          screenshot('image/jpeg');
                        }}
                      >
                        JPEG
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm',
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          screenshot('image/svg');
                        }}
                      >
                        SVG
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {showApprovalRequestButton && (
            <button
              onClick={() => setOpenModal(true)}
              className="flex text-sm py-3 px-5 rounded-md border-0 font-semibold bg-white text-black cursor-pointer text-center flex items-center justify-center flex-1 hover:bg-opacity-80 items-center whitespace-nowrap mb-4"
            >
              Create Approval Request
            </button>
          )}

          <h5
            id="drawer-right-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-white"
          >
            Node information
          </h5>
        </div>

        {Object.keys(node).map((key) => {
          if (
            [
              'id',
              'highlight_content',
              'highlight_comment',
              'highlight_position',
              'annotation_id',
            ].includes(key)
          )
            return null;
          return (
            <div className="mb-6" key={`${node.id}-${key}`}>
              <label
                htmlFor={`node-${key}`}
                className="block mb-2 text-sm font-medium text-white"
              >
                {capitalizeFirstLetter(key)}
              </label>
              <input
                type="text"
                id={`node-${key}`}
                className="text-sm bg-gray-700 border border-gray-600 placeholder-gray-400 text-white block w-full p-2.5 rounded-lg"
                defaultValue={node[key]}
                disabled
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default GraphNodeDrawer;

GraphNodeDrawer.propTypes = {
  node: PropTypes.object,
  screenshot: PropTypes.func,
  projectID: PropTypes.string,
};
