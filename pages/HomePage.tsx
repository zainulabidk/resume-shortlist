
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 md:mt-24">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to OfficeKir AI Talent Matcher
      </h1>
      <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-8">
        The intelligent recruitment platform. Submit your resume as a candidate or find the perfect match for your job opening as an administrator.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <Link
          to="/candidate-form"
          className="bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-primary-hover transition-transform transform hover:scale-105"
        >
          I'm a Candidate
        </Link>
        <Link
          to="/admin-dashboard"
          className="bg-accent text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-105"
        >
          I'm an Admin / HR
        </Link>
      </div>
      <div className="mt-16 p-6 bg-white border border-gray-200 rounded-lg shadow-md max-w-3xl">
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">How It Works</h3>
        <p className="text-gray-600">
          Our AI-powered system uses advanced vector similarity to analyze resume content against job descriptions. This allows HR professionals to instantly identify the most qualified candidates, saving time and improving hiring accuracy. This frontend demonstration uses a mock API to simulate this powerful functionality.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
