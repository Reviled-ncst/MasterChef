import { useAuth } from './authContext';
import { validateCredentials, User } from './auth';

/**
 * Hook for logging in a user with email and password
 * Returns { user, error } with user being null on failure
 */
export function useLogin() {
  const { login } = useAuth();

  return async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const user = validateCredentials(email, password);
    if (!user) {
      return {
        user: null,
        error: 'Invalid email or password',
      };
    }

    login(user);
    return { user, error: null };
  };
}

/**
 * Hook for logging out current user
 */
export function useLogout() {
  const { logout } = useAuth();
  return logout;
}

/**
 * Hook to get current authenticated user
 */
export function useCurrentUser() {
  const { currentUser } = useAuth();
  return currentUser;
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { currentUser } = useAuth();
  return currentUser !== null;
}

/**
 * Hook to check if current user is admin
 */
export function useIsAdmin() {
  const currentUser = useCurrentUser();
  return currentUser?.role === 'admin' || false;
}

/**
 * Hook to check if current user is gamer
 */
export function useIsGamer() {
  const currentUser = useCurrentUser();
  return currentUser?.role === 'gamer' || false;
}
