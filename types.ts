
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  resumeText: string;
  createdAt: string;
  matchPercentage?: number;
}
