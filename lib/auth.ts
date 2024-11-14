"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'basic' | 'professional' | 'enterprise';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          console.log("Making login request");
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          console.log("Login response data:", data);

          if (response.ok) {
            console.log("Setting auth state");
            set({ 
              user: data.user, 
              token: data.token,
              isAuthenticated: true 
            });
            
            // Set the token in a cookie
            document.cookie = `auth-token=${data.token}; path=/; max-age=2592000`; // 30 days
            return true;
          }
          console.log("Login failed:", data.message);
          return false;
        } catch (error) {
          console.error('Login error details:', error);
          return false;
        }
      },
      register: async (userData) => {
        try {
          console.log("Making registration request with data:", { ...userData, password: '[REDACTED]' });
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          const data = await response.json();
          console.log("Registration response data:", data);

          if (response.ok) {
            console.log("Setting auth state after registration");
            set({ 
              user: data.user, 
              token: data.token,
              isAuthenticated: true 
            });
            
            // Set the token in a cookie
            document.cookie = `auth-token=${data.token}; path=/; max-age=2592000`; // 30 days
            return true;
          }
          console.log("Registration failed:", data.message);
          return false;
        } catch (error) {
          console.error('Registration error details:', error);
          return false;
        }
      },
      logout: () => {
        console.log("Logging out user");
        set({ user: null, token: null, isAuthenticated: false });
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);