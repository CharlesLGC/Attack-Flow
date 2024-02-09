import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import LogoTransparentBG from '../public/images/logo-transparent-bg-blue.svg';
import Logo from '../public/images/logo.svg';

const routes = [
  {
    displayName: 'Home',
    link: '/',
    protected: false,
    admin: false,
  },
  {
    displayName: 'Library',
    link: '/library',
    protected: false,
    admin: false,
  },
  {
    displayName: 'Projects',
    link: '/projects',
    protected: true,
    admin: false,
  },
  {
    displayName: 'Approval Requests',
    link: '/approval-requests',
    protected: true,
    admin: true,
  },
];

function NavBar(props) {
  const { currentRoute = '', transparent = false } = props;
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // this is bad practice, but it's for speed
    if (
      !isLoading &&
      isAuthenticated &&
      user &&
      user.email === 'root@attackflow.com'
    ) {
      setIsAdmin(true);
    }
  }, [user, isLoading, isAuthenticated]);

  return (
    <Disclosure
      as="nav"
      className={`${transparent ? `bg-transparent` : `shadow bg-primary-blue`}`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className={`relative inline-flex items-center justify-center rounded-md p-2 hover:opacity-80 ${
                    transparent ? 'text-black' : 'text-white'
                  }`}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  {transparent ? (
                    <img
                      className="h-12 w-auto"
                      src={LogoTransparentBG}
                      alt="AttackFlow"
                    />
                  ) : (
                    <img className="h-12 w-auto" src={Logo} alt="AttackFlow" />
                  )}
                  <h1
                    className={`hidden sm:block ml-1 font-bold text-2xl ${
                      transparent ? `text-black` : `text-white`
                    }`}
                  >
                    AttackFlow
                  </h1>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                  {!isLoading &&
                    routes.map((route, idx) =>
                      !route.protected ||
                      (route.protected && isAuthenticated && !route.admin) ||
                      (route.admin && isAdmin) ? (
                        <Link
                          to={route.link}
                          key={idx}
                          className={`inline-flex ml-0 items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:opacity-80 ${
                            currentRoute === route.link ? 'border-white' : null
                          } ${transparent ? `text-black` : `text-white`}`}
                        >
                          {route.displayName}
                        </Link>
                      ) : null,
                    )}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  className={`relative inline-flex items-center gap-x-1.5 rounded-full px-5 py-2 text-sm font-semibold shadow-sm hover:opacity-90 ${
                    transparent
                      ? `bg-primary-blue text-white`
                      : `bg-white text-black`
                  }`}
                  onClick={() => {
                    if (isAuthenticated) logout();
                    else loginWithRedirect();
                  }}
                >
                  {isAuthenticated ? 'Logout' : 'Login'}
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {routes.map((route, idx) =>
              !route.protected || (route.protected && isAuthenticated) ? (
                <div className="space-y-1 pb-2 pt-2" key={idx}>
                  <Disclosure.Button
                    as="div"
                    className={`block border-l-4 border-transparent py-2 pl-3 pr-4 font-medium hover:opacity-80 ${
                      currentRoute === route.link ? 'border-white' : null
                    } ${transparent ? `text-black` : `text-white`}`}
                  >
                    <Link to={route.link} className="text-inherit">
                      {route.displayName}
                    </Link>
                  </Disclosure.Button>
                </div>
              ) : null,
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

NavBar.propTypes = {
  currentRoute: PropTypes.string,
  transparent: PropTypes.bool,
};

export default NavBar;
