import React from 'react';
import StudentCard from '../components/StudentCard';
import AddStudentModal from '../components/AddStudentModal';
import { useAuthStore } from '../store/authStore';
import { useAdminStore } from '../store/adminStore';
import { Trash2, UserPlus, AlertCircle } from 'lucide-react';

export default function StudentList() {
  const { isAuthenticated } = useAuthStore();
  const { students, setAddingStudent, removeStudent, toggleStudentStatus } = useAdminStore();

  const mockStats = {
    1: {
      totalSolved: 20,
      codeforcesCount: 10,
      csesCount: 10,
      weeklyProgress: [1, 2, 3, 4, 5, 6, 7],
      attemptDistribution: [1, 2, 3, 4, 5, 6, 7],
    },
    2: {
      totalSolved: 30,
      codeforcesCount: 20,
      csesCount: 10,
      weeklyProgress: [1, 2, 3, 4, 5, 6, 7],
      attemptDistribution: [1, 2, 3, 4, 5, 6, 7],
    },
    3: {
      totalSolved: 40,
      codeforcesCount: 20,
      csesCount: 20,
      weeklyProgress: [1, 2, 3, 4, 5, 6, 7],
      attemptDistribution: [1, 2, 3, 4, 5, 6, 7],
    },
  };  

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Student Progress</h1>
        {isAuthenticated && (
          <button
            onClick={() => setAddingStudent(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2"
          >
            <UserPlus className="h-5 w-5" />
            <span>Add Student</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.id} className="relative">
            <StudentCard
              student={student}
              stats={mockStats[student.id] || defaultStats}
            />
            {isAuthenticated && (
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => toggleStudentStatus(student.id)}
                  className={`p-1 rounded-full ${
                    student.isActive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}
                >
                  <AlertCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => removeStudent(student.id)}
                  className="p-1 rounded-full bg-red-100 text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <AddStudentModal />
    </div>
  );
}

const defaultStats = {
  totalSolved: 0,
  codeforcesCount: 0,
  csesCount: 0,
  weeklyProgress: [],
  attemptDistribution: [],
};