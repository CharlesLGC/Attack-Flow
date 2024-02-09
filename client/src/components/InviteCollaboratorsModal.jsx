import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Notification from './Notification';

function InviteCollaboratorsForm({ open, setOpen, projectID }) {
  const { getAccessTokenSilently, user } = useAuth0();
  const [collaborators, setCollaborators] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);

  async function getCollaborators() {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_SERVER
        }/collaborators?projectID=${projectID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setCollaborators(res.data);
    } catch (err) {
      setIsError(true);
      setNotificationTitle('Fetch Collaborators Error');
      setNotificationDescription(
        'An error has occurred while fetching the collaborators.',
      );
      // eslint-disable-next-line no-console
      console.log(err);
      setShowNotification(true);
    }
  }

  const deleteCollaborator = async (targetEmail) => {
    try {
      const accessToken = await getAccessTokenSilently();
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER}/collaborators/delete`,
        {
          projectID,
          email: targetEmail,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setIsError(false);
      setNotificationTitle('Delete Success');
      setNotificationDescription(
        'The collaborator will no longer have access.',
      );
    } catch (err) {
      setIsError(true);
      setNotificationTitle('Delete Error');
      setNotificationDescription(
        'An error has occurred while deleting the collaborator.',
      );
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setShowNotification(true);
    getCollaborators();
  };

  const addCollaborator = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER}/collaborators/add`,
        {
          projectID,
          email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setIsError(false);
      setNotificationTitle('Invite Success');
      setNotificationDescription('The new collaborator can begin annotating.');
    } catch (err) {
      setIsError(true);
      setNotificationTitle('Invalid Email');
      setNotificationDescription('The email that you provide does not exist.');
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setShowNotification(true);
    setEmail('');
    getCollaborators();
  };

  useEffect(() => {
    getCollaborators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently]);

  return (
    <>
      <Transition.Root show={open} as="div">
        <Dialog as="div" className="relative z-50" onClose={() => false}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Notification
            show={showNotification}
            setShow={setShowNotification}
            isError={isError}
            title={notificationTitle}
            description={notificationDescription}
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-3xl mx-24 sm:p-6">
                  <div className="ml-4 flex flex-shrink-0 justify-end">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-16">
                    <div className="flex flex-col items-center">
                      <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                        Manage Collaborators
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">
                        A list of all the collaborators that you can invite and
                        edit.
                      </p>
                      <div className="flex justify-start mt-10 w-4/5">
                        <div className="mr-4 flex w-full flex-1">
                          <label htmlFor="email" className="sr-only">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="rounded-md w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <button
                          type="button"
                          className="block rounded-md bg-indigo-600 rounded-lg text-sm px-5 py-2.5 mr-2 text-center font-semibold text-white shadow-sm hover:bg-indigo-500"
                          onClick={() => addCollaborator()}
                        >
                          Invite Collaborator
                        </button>
                      </div>
                    </div>

                    {collaborators.length > 0 ? (
                      <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Email
                                    </th>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                      Name
                                    </th>
                                    <th
                                      scope="col"
                                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                    >
                                      <span className="sr-only">Edit</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                  {collaborators.map((collaborator) => (
                                    <tr key={collaborator.email}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {collaborator.email}
                                      </td>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {collaborator.name}{' '}
                                        {user.email === collaborator.email
                                          ? '(You)'
                                          : null}
                                      </td>
                                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <span
                                          className={`text-red-600 hover:text-red-800 ${
                                            user.email === collaborator.email
                                              ? 'cursor-not-allowed'
                                              : 'cursor-pointer'
                                          }`}
                                          onClick={() => {
                                            if (
                                              user.email !== collaborator.email
                                            ) {
                                              deleteCollaborator(
                                                collaborator.email,
                                              );
                                            }
                                          }}
                                        >
                                          Delete
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center mt-10">
                        <p className="text-base text-gray-700">
                          No Collaborators Found.
                        </p>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

InviteCollaboratorsForm.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  projectID: PropTypes.string,
};

export default InviteCollaboratorsForm;
