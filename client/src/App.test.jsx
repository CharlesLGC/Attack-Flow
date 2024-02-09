import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import Home from './components/home';
import BackEndTest from './components/BackEndTest';
import Dashboard from './components/Dashboard';

const mocks = vi.hoisted(() => ({
  useAuth0: vi.fn(),
}));

const axiosMocks = {
  mockRoot: () => Promise.resolve({ data: { data: 'Hello World' } }),
  mockVerifyResolve: () => Promise.resolve({ data: { data: 'Konnichiwa' } }),
  mockVerifyReject: () => Promise.reject(new Error('Axios rejected')),
};

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: mocks.useAuth0,
}));

describe('App test', () => {
  test('Should display hello world', async () => {
    mocks.useAuth0.mockReturnValue({
      isLoading: false,
      error: null,
    });
    axios.get = axiosMocks.mockRoot;
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(
      await screen.findByText(
        'Hello World',
        { exact: false },
        { timeout: 3000 },
      ),
    ).toBeDefined();
  });
});

describe('Home test', () => {
  test('Should navigate to Home route and display correctly', async () => {
    render(
      <Router>
        <Home />
      </Router>,
    );
    expect(
      await screen.findByText(
        'Discover how to protect yourself',
        { exact: false },
        { timeout: 2000 },
      ),
    ).toBeDefined();
  });
});

describe('Dashboard test', () => {
  test('Should navigate to Dashboard route and display correctly', async () => {
    render(
      <Router>
        <Dashboard />
      </Router>,
    );
    expect(
      await screen.findByText(
        'Dashboard Page Coming Soon',
        { exact: false },
        { timeout: 2000 },
      ),
    ).toBeDefined();
  });
});

describe('Testcases for BackEndTest component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('Should display API response properly if authenticated and token is valid', async () => {
    mocks.useAuth0.mockReturnValue({
      isAuthenticated: true, // Mock the value of isAuthenticated
      getAccessTokenSilently: vi.fn().mockResolvedValue('token'),
    });
    axios.get = axiosMocks.mockVerifyResolve;
    render(
      <Router>
        <BackEndTest />
      </Router>,
    );

    expect(
      await screen.findByText(
        'Login Successful',
        { exact: false },
        { timeout: 3000 },
      ),
    ).toBeDefined();
  });

  test('Should display promise rejection error if authenticated but token is invalid', async () => {
    const err = new Error('getTokenSiliently Error');
    mocks.useAuth0.mockReturnValue({
      isAuthenticated: true, // Mock the value of isAuthenticated
      getAccessTokenSilently: vi.fn().mockRejectedValue(err),
    });
    render(
      <Router>
        <BackEndTest />
      </Router>,
    );

    expect(
      await screen.findByText(
        'An error has occurred',
        { exact: false },
        { timeout: 2000 },
      ),
    ).toBeDefined();
  });

  test('Should display Unauthorized Accessed if not authenticated', async () => {
    mocks.useAuth0.mockReturnValue({
      isAuthenticated: false, // Mock the value of isAuthenticated
    });
    render(
      <Router>
        <BackEndTest />
      </Router>,
    );

    expect(
      await screen.findByText(
        'An error has occurred',
        { exact: false },
        { timeout: 2000 },
      ),
    ).toBeDefined();
  });

  test('Should display promise rejection error if authenticated, token is valid but backend failed to response properly', async () => {
    mocks.useAuth0.mockReturnValue({
      isAuthenticated: true, // Mock the value of isAuthenticated
      getAccessTokenSilently: vi.fn().mockResolvedValue('token'),
    });
    render(
      <Router>
        <BackEndTest />
      </Router>,
    );
    axios.get = axiosMocks.mockVerifyReject;

    expect(
      await screen.findByText(
        'An error has occurred',
        { exact: false },
        { timeout: 3000 },
      ),
    ).toBeDefined();
  });
});
