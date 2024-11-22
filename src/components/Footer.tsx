import React from 'react';
import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Code2 className="h-6 w-6" />
            <span className="font-semibold">NST X ADYPU ICPC Club</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400">Created by Vivek W</p>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}