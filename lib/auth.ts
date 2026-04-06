/**
 * Hard-coded user accounts for demo/testing purposes
 * WARNING: Do not use in production. Passwords are visible to anyone with repo access.
 */

export type User = {
  id: string;
  email: string;
  password: string; // DEMO ONLY - Never store passwords in code in production
  name: string;
  role: 'gamer' | 'admin';
};

export const USERS: User[] = [
  {
    id: '1',
    email: 'gamer@masterchef.com',
    password: 'player123',
    name: 'Chef Player',
    role: 'gamer',
  },
  {
    id: '2',
    email: 'admin@masterchef.com',
    password: 'admin123',
    name: 'Admin Chef',
    role: 'admin',
  },
];

/**
 * Validate user credentials against hard-coded database
 * Returns user object if valid, null otherwise
 */
export function validateCredentials(email: string, password: string): User | null {
  const user = USERS.find((u) => u.email === email && u.password === password);
  return user || null;
}

/**
 * Get user by email (case-insensitive)
 */
export function getUserByEmail(email: string): User | null {
  return USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Check if user exists by email
 */
export function userExists(email: string): boolean {
  return USERS.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Get all users by role
 */
export function getUsersByRole(role: 'gamer' | 'admin'): User[] {
  return USERS.filter((u) => u.role === role);
}
