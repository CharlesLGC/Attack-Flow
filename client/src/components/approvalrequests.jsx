import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Spinner from './PDFAnnotator/Spinner';
import capitalizeFirstLetter from '../utils/string';

const ApprovalRequests = () => {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [approvalRequests, setApprovalRequests] = useState([]);

  async function fetchData() {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await axios.get(
        `${import.meta.env.VITE_APP_SERVER}/approval-requests/list`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setApprovalRequests(res.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  }

  const approveRequest = async (requestID, approve) => {
    try {
      const accessToken = await getAccessTokenSilently();
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER}/approval-requests/update`,
        {
          requestID,
          approve,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      fetchData();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  return (
    <div className="w-full bg-white">
      <NavBar currentRoute="/approval-requests" />
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
                  Approval Requests
                </h1>
                <p className="mt-4 text-sm font-medium text-gray-700">
                  An approval request a day keeps the data annotators away.
                </p>
              </div>
            </div>
            <div className="flex w-full">
              {approvalRequests.length > 0 && (
                <ul
                  role="list"
                  className="divide-y divide-gray-100 w-full overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-8"
                >
                  {approvalRequests.map((approvalRequest) => (
                    <li
                      key={approvalRequest.id}
                      className="flex items-center justify-between hover:bg-gray-100 gap-x-6 px-4 py-5 sm:px-6"
                    >
                      <Link
                        as="div"
                        to={`/graph/${approvalRequest.project.id}`}
                        className="min-w-0 flex-1"
                      >
                        <div className="flex items-start gap-x-3">
                          <p className="text-base font-bold leading-6 text-gray-900">
                            {capitalizeFirstLetter(
                              approvalRequest.project.title,
                            )}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                          <p className="whitespace-nowrap font-normal">
                            Created on{' '}
                            <time dateTime={approvalRequest.created_at}>
                              {new Date(
                                approvalRequest.created_at,
                              ).toLocaleDateString('en-us', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </time>
                          </p>
                          <svg
                            viewBox="0 0 2 2"
                            className="h-0.5 w-0.5 fill-current"
                          >
                            <circle cx={1} cy={1} r={1} />
                          </svg>
                          <p className="truncate font-normal">
                            {approvalRequest.description}
                          </p>
                        </div>
                      </Link>
                      <div className="flex flex-none items-center gap-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            approveRequest(approvalRequest.id, true);
                          }}
                          className="rounded-md whitespace-nowrap mt-0.5 px-4 py-2 text-sm font-semibold ring-1 ring-inset text-white bg-green-600 hover:opacity-80 ring-green-600/20"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            approveRequest(approvalRequest.id, false);
                          }}
                          className="rounded-md whitespace-nowrap mt-0.5 px-4 py-2 text-sm font-semibold ring-1 ring-inset text-white bg-red-600 hover:opacity-80 ring-red-600/20"
                        >
                          Reject
                        </button>
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

export default ApprovalRequests;
