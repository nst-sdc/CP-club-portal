import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Award, Brain } from 'lucide-react';
import ProgressChart from '../components/ProgressChart';
import { useAuthStore } from '../store/authStore';

const mockWeeklyData = [
  { date: '2024-03-01', count: 15 },
  { date: '2024-03-08', count: 28 },
  { date: '2024-03-15', count: 42 },
  { date: '2024-03-22', count: 55 },
];

export default function Dashboard() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">NST X ADYPU ICPC Club Dashboard</h1>
        {!isAuthenticated && (
          <button
            onClick={() => navigate('/admin')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Admin Login
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8" />
            <h3 className="text-xl font-semibold">Total Students</h3>
          </div>
          <p className="text-3xl font-bold mt-2">42</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8" />
            <h3 className="text-xl font-semibold">Problems Solved</h3>
          </div>
          <p className="text-3xl font-bold mt-2">1,337</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8" />
            <h3 className="text-xl font-semibold">Active Today</h3>
          </div>
          <p className="text-3xl font-bold mt-2">28</p>
        </div>
      </div>

      <ProgressChart data={mockWeeklyData} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">About NST X ADYPU ICPC Club</h2>
        <p className="text-gray-600">
          The ICPC Club at Newton School of Technologies X ADYPU is dedicated to nurturing competitive programming skills
          among students. Our platform tracks progress across major competitive programming platforms like Codeforces
          and CSES, helping students improve their problem-solving abilities and prepare for competitions.
        </p>
      </div>
    </div>
  );
}