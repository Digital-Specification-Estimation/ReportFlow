import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types';
import { authApi, ApiError } from '@/lib/api';

// Demo mode credentials - works without backend
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@demo.com': {
    password: 'demo123',
    user: {
      id: 'demo-admin-1',
      email: 'admin@demo.com',
      name: 'Demo Admin',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  'editor@demo.com': {
    password: 'demo123',
    user: {
      id: 'demo-editor-1',
      email: 'editor@demo.com',
      name: 'Demo Editor',
      role: 'editor',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  'viewer@demo.com': {
    password: 'demo123',
    user: {
      id: 'demo-viewer-1',
      email: 'viewer@demo.com',
      name: 'Demo Viewer',
      role: 'viewer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
};

// Check if demo mode is enabled (backend unavailable)
const isDemoMode = () => {
  // Always try demo mode first if credentials match, or if backend fails
  return true;
};

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

// Map backend role to frontend role format
const mapRole = (role: string): 'admin' | 'editor' | 'viewer' => {
  const roleMap: Record<string, 'admin' | 'editor' | 'viewer'> = {
    ADMIN: 'admin',
    EDITOR: 'editor',
    VIEWER: 'viewer',
  };
  return roleMap[role] || 'viewer';
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Check demo credentials first
        const demoUser = DEMO_USERS[email.toLowerCase()];
        if (demoUser && demoUser.password === password) {
          // Simulate network delay for realism
          await new Promise(resolve => setTimeout(resolve, 500));
          set({
            user: demoUser.user,
            token: 'demo-token-' + Date.now(),
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }
        
        // Try backend if not demo credentials
        try {
          const response = await authApi.login(email, password);
          const user: User = {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            role: mapRole(response.user.role),
            createdAt: response.user.createdAt,
            updatedAt: response.user.updatedAt,
          };
          
          set({
            user,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await authApi.register(name, email, password);
          const user: User = {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            role: mapRole(response.user.role),
            createdAt: response.user.createdAt,
            updatedAt: response.user.updatedAt,
          };
          
          set({
            user,
            token: response.accessToken,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          console.error('Registration failed:', error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: async () => {
        const token = localStorage.getItem('reportflow-auth');
        const isDemo = token?.includes('demo-token');
        
        if (!isDemo) {
          try {
            await authApi.logout();
          } catch (error) {
            console.error('Logout error:', error);
          }
        }
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'reportflow-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
