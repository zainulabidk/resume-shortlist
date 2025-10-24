
import type { Candidate } from '../types';

// Mock database
let candidates: Candidate[] = [
    {
        id: '1',
        name: 'Zain Rahmat',
        email: 'zain.rahmat@example.com',
        phone: '123-456-7890',
        role: 'React Developer',
        resumeText: `Zain Rahmat - Senior React Developer

Summary:
A highly skilled and motivated Senior React Developer with over 8 years of experience in building complex, scalable, and high-performance web applications. Proficient in React, Redux, TypeScript, and modern JavaScript frameworks. Passionate about creating exceptional user experiences and writing clean, maintainable code.

Experience:
- Led the development of a large-scale e-commerce platform using React and Next.js.
- Optimized application performance, reducing load times by 40%.
- Mentored junior developers and conducted code reviews.

Skills:
- JavaScript, TypeScript, React, Redux, Next.js, Node.js
- HTML5, CSS3, Tailwind CSS, Styled-Components
- Jest, React Testing Library, Cypress
- Webpack, Babel, Git, CI/CD`,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '2',
        name: 'Ameen Khan',
        email: 'ameen.khan@example.com',
        phone: '098-765-4321',
        role: 'Backend Developer',
        resumeText: `Ameen Khan - Backend Developer (Node.js & Python)

Summary:
Results-driven Backend Developer with 5 years of experience designing, developing, and maintaining robust server-side applications. Expertise in Node.js, Express, Python, and Django. Strong understanding of microservices architecture, RESTful APIs, and database management with MongoDB and PostgreSQL.

Experience:
- Developed and deployed a suite of microservices for a fintech application.
- Implemented authentication and authorization using JWT and OAuth2.
- Designed and optimized database schemas for performance and scalability.

Skills:
- Node.js, Express.js, Python, Django, Flask
- MongoDB, PostgreSQL, Redis
- Docker, Kubernetes, AWS
- RESTful APIs, GraphQL`,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '3',
        name: 'Fatima Ahmed',
        email: 'fatima.ahmed@example.com',
        phone: '555-555-5555',
        role: 'Full-Stack Developer',
        resumeText: `Fatima Ahmed - Full-Stack Developer

Summary:
Versatile Full-Stack Developer with a passion for building end-to-end solutions. Proficient in both frontend (React, Vue) and backend (Node.js, Go) technologies. Adept at bridging the gap between design and implementation to deliver seamless and functional products.

Experience:
- Built a real-time chat application using WebSockets, React, and Go.
- Maintained and scaled a cloud-based infrastructure on Google Cloud Platform.
- Collaborated with product managers and designers to define and implement new features.

Skills:
- React, Vue.js, JavaScript, TypeScript
- Node.js, Go, Express.js
- SQL, NoSQL, Firebase
- GCP, CI/CD, Agile Methodologies`,
        createdAt: new Date().toISOString(),
    }
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const submitCandidate = async (formData: FormData): Promise<Candidate> => {
    await delay(1000);

    const newCandidate: Candidate = {
        id: (candidates.length + 1).toString(),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        role: formData.get('role') as string,
        resumeText: `This is a mock resume text for ${formData.get('name')}. The uploaded file would be parsed on a real backend. Relevant skills: React, TypeScript, Node.js.`,
        createdAt: new Date().toISOString(),
    };

    if (!newCandidate.name || !newCandidate.email) {
        throw new Error('Required fields are missing.');
    }
    
    candidates.push(newCandidate);
    return newCandidate;
};

export const getAllCandidates = async (): Promise<Candidate[]> => {
    await delay(500);
    return [...candidates].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const matchCandidates = async (jobDescription: string): Promise<Candidate[]> => {
    await delay(1500);

    if (!jobDescription.trim()) {
        return getAllCandidates();
    }
    
    // Simulate vector similarity matching
    const matchedCandidates = candidates.map(candidate => ({
        ...candidate,
        matchPercentage: Math.floor(Math.random() * 30) + 70, // Random score between 70 and 99
    }));

    return matchedCandidates.sort((a, b) => (b.matchPercentage ?? 0) - (a.matchPercentage ?? 0));
};
