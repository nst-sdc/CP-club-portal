import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function AddStudentModal() {
  const { isAddingStudent, setAddingStudent, addStudent } = useAdminStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    codeforcesHandle: '',
    csesHandle: '',
    batch: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Verify Codeforces handle
      const cfResponse = await fetch(`https://codeforces.com/api/user.info?handles=${formData.codeforcesHandle}`);
      const cfData = await cfResponse.json();
      
      if (cfData.status === 'OK') {
        const newStudent = {
          id: crypto.randomUUID(),
          ...formData,
          isActive: true,
          createdAt: new Date().toISOString(),
        };
        addStudent(newStudent);
        setAddingStudent(false);
      } else {
        alert('Invalid Codeforces handle');
      }
    } catch (error) {
      alert('Error verifying Codeforces handle');
    }
  };

  if (!isAddingStudent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Student</h2>
          <button
            onClick={() => setAddingStudent(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Codeforces Handle</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.codeforcesHandle}
              onChange={(e) => setFormData({ ...formData, codeforcesHandle: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CSES Handle</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.csesHandle}
              onChange={(e) => setFormData({ ...formData, csesHandle: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Batch</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setAddingStudent(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}