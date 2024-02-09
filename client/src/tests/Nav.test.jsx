import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from '../components/home';
import NavBar from '../components/NavBar';

const mocks = vi.hoisted(() => ({
  useAuth0: vi.fn(),
}));

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: mocks.useAuth0,
}));

describe('Nav test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  test('Should navigate and display correctly', async () => {
    const user = userEvent.setup();
    mocks.useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: null,
      logout: null,
    });
    render(
      <Router>
        <Home />
      </Router>,
    );
    expect(
      await screen.findByText('Library', { exact: true }, { timeout: 4000 }),
    ).toBeDefined();
    await user.click(
      screen.getByRole('link', {
        name: /library/i,
      }),
    );
    await waitFor(
      () => {
        expect(window.location.pathname).toBe('/library');
      },
      { timeout: 2000 },
    );
  });
  test('Should display login when unauthenticated', async () => {
    mocks.useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: null,
      logout: null,
    });
    render(
      <Router>
        <NavBar />
      </Router>,
    );
    expect(
      await screen.findByText('Login', { exact: false }, { timeout: 2000 }),
    ).toBeDefined();
  });
  test('Should display logout when authenticated', async () => {
    mocks.useAuth0.mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: null,
      logout: null,
    });
    render(
      <Router>
        <NavBar />
      </Router>,
    );
    expect(
      await screen.findByText('Logout', { exact: false }, { timeout: 2000 }),
    ).toBeDefined();
  });
});
