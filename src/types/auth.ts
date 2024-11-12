export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'broker' | 'user';
  company: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  company: string;
} 