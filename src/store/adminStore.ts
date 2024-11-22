import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student } from '../types';
import { encryptData, decryptData } from '../utils/crypto';

interface AdminStore {
  students: Student[];
  isAddingStudent: boolean;
  editingStudentId: string | null;
  setAddingStudent: (isAdding: boolean) => void;
  setEditingStudent: (studentId: string | null) => void;
  addStudent: (student: Student) => void;
  removeStudent: (studentId: string) => void;
  toggleStudentStatus: (studentId: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      students: [],
      isAddingStudent: false,
      editingStudentId: null,
      setAddingStudent: (isAdding) => set({ isAddingStudent: isAdding }),
      setEditingStudent: (studentId) => set({ editingStudentId: studentId }),
      addStudent: (student) => 
        set((state) => ({ 
          students: [...state.students, student],
        })),
      removeStudent: (studentId) =>
        set((state) => ({
          students: state.students.filter((s) => s.id !== studentId),
        })),
      toggleStudentStatus: (studentId) =>
        set((state) => ({
          students: state.students.map((s) =>
            s.id === studentId ? { ...s, isActive: !s.isActive } : s
          ),
        })),
    }),
    {
      name: 'admin-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return decryptData(str);
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(name, encryptData(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);