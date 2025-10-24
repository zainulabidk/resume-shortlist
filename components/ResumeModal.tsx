
import React from 'react';
import type { Candidate } from '../types';
import CloseIcon from './icons/CloseIcon';

interface ResumeModalProps {
  candidate: Candidate;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ candidate, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">{candidate.name}'s Resume</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
            {candidate.resumeText}
          </pre>
        </div>
        <div className="p-4 border-t text-right">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
