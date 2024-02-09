import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Notification from './Notification';

function CreateProjectModal({ open, setOpen, createProject }) {
  const { getAccessTokenSilently } = useAuth0();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isError, setIsError] = useState(false);

  const create = async () => {
    try {
      await getAccessTokenSilently();
      createProject({ title, description });
      setIsError(false);
      setNotificationTitle('Success');
      setNotificationDescription('You can now begin creating annotations.');
    } catch (err) {
      setIsError(true);
      setNotificationTitle('Create Project Error');
      setNotificationDescription('An error has occurred');
      // eslint-disable-next-line no-console
      console.log(err);
    }
    setShowNotification(true);
    setTitle('');
    setDescription('');
  };

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
                        Create New Project
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">
                        An annotation a day keeps cyber attacks away.
                      </p>
                      <div className="flex flex-col justify-center mt-10 w-4/5">
                        <div className="flex flex-col mb-8">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            placeholder="Enter title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-2 border-0 rounded-md ring-1 ring-inset ring-gray-300 focus:ring-gray-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="flex flex-col mb-8">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            className="w-full px-4 py-2 mt-2 border-0 rounded-md ring-1 ring-inset ring-gray-300 focus:ring-gray-500 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder="Enter description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                        <button
                          type="button"
                          className="block rounded-md bg-indigo-600 rounded-lg text-sm px-5 py-2.5 mr-2 text-center font-semibold text-white shadow-sm hover:bg-indigo-500"
                          onClick={create}
                        >
                          Create
                        </button>
                      </div>
                    </div>
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

CreateProjectModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  createProject: PropTypes.func,
};

export default CreateProjectModal;
