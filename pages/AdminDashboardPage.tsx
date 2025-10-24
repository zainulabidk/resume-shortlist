
import React, { useState, useEffect, useCallback } from 'react';
import { getAllCandidates, matchCandidates } from '../services/apiService';
import type { Candidate } from '../types';
import ResumeModal from '../components/ResumeModal';
import SearchIcon from '../components/icons/SearchIcon';

const AdminDashboardPage: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [jobDescription, setJobDescription] = useState<string>('');
    const [isMatching, setIsMatching] = useState<boolean>(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    const fetchCandidates = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getAllCandidates();
            setCandidates(data);
        } catch (error) {
            console.error("Failed to fetch candidates:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCandidates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMatch = async () => {
        setIsMatching(true);
        try {
            const data = await matchCandidates(jobDescription);
            setCandidates(data);
        } catch (error) {
            console.error("Failed to match candidates:", error);
        } finally {
            setIsMatching(false);
        }
    };
    
    const handleViewCV = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleCloseModal = () => {
        setSelectedCandidate(null);
    };
    
    const getMatchColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-green-100 text-green-800';
        if (percentage >= 80) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
            
            <div className="mb-8">
                <label htmlFor="jobDescription" className="block text-lg font-medium text-gray-700 mb-2">Job Description</label>
                <textarea 
                    id="jobDescription"
                    rows={6}
                    className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Paste the job description here to find the best candidates..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                <button 
                    onClick={handleMatch}
                    disabled={isMatching}
                    className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400"
                >
                    <SearchIcon />
                    <span className="ml-2">{isMatching ? 'Matching...' : 'Find Best Match'}</span>
                </button>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Candidate List</h3>
            {isLoading ? (
                <p>Loading candidates...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                {candidates[0]?.matchPercentage && (
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match %</th>
                                )}
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">View CV</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {candidates.map(candidate => (
                                <tr key={candidate.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                                        <div className="text-sm text-gray-500">{candidate.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{candidate.role}</td>
                                    {candidate.matchPercentage && (
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getMatchColor(candidate.matchPercentage)}`}>
                                                {candidate.matchPercentage}%
                                            </span>
                                        </td>
                                    )}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(candidate.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleViewCV(candidate)} className="text-primary hover:text-primary-hover">View CV</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {selectedCandidate && (
                <ResumeModal candidate={selectedCandidate} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default AdminDashboardPage;
