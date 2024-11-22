import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { hashPassword } from '../utils/crypto';

const ADMIN_PASSWORD_HASH = 'a3da73976501812cd7b821a20bfb09af0a6a891e419cdfb761fb19a92c914242'; // hash of 'vivek'

interface AuthState {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (password: string) => {
        const isValid = hashPassword(password) === ADMIN_PASSWORD_HASH;
        if (isValid) {
          set({ isAuthenticated: true });
        }
        return isValid;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);