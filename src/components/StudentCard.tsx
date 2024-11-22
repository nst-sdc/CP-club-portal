import React from 'react';
import { Trophy, XCircle, CheckCircle } from 'lucide-react';
import type { Student, StudentStats } from '../types';

interface StudentCardProps {
  student: Student;
  stats: StudentStats;
}

export default function StudentCard({ student, stats }: StudentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
          <p className="text-gray-600">{student.batch}</p>
        </div>
        <Trophy className="h-6 w-6 text-yellow-500" />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Problems Solved</span>
          </div>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{stats.totalSolved}</p>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">Avg. Attempts</span>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {(stats.attemptDistribution.reduce((acc, curr) => acc + (curr.attempts * curr.count), 0) / 
              stats.attemptDistribution.reduce((acc, curr) => acc + curr.count, 0)).toFixed(1)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>Codeforces: {stats.codeforcesCount}</span>
        <span>CSES: {stats.csesCount}</span>
      </div>
    </div>
  );
}