// Team shown on the landing page. Put photos in public/team/ and reference them as '/team/<file>'.
// Leave `photo` empty to show the member's initials instead.
export type TeamMember = {
  name: string;
  role: string;
  stack: string[];
  bio?: string;
  photo?: string;
  linkedin?: string;
  github?: string;
};

export const TEAM_NAME = 'Team Pitstop';
export const EVENT_NAME = 'EHL Hackathon 2026';

export const TEAM: TeamMember[] = [
  { name: 'Team member 1', role: 'Product Manager', stack: ['Product discovery', 'Customer research'], bio: 'Placeholder. Replace with the real profile.' },
  { name: 'Team member 2', role: 'Frontend', stack: ['Next.js', 'React', 'Three.js'], bio: 'Placeholder. Replace with the real profile.' },
  { name: 'Team member 3', role: 'Backend', stack: ['Python', 'FastAPI', 'SQLite'], bio: 'Placeholder. Replace with the real profile.' },
  { name: 'Team member 4', role: 'Data & AI', stack: ['OpenAI', 'RAG', 'Reddit pipeline'], bio: 'Placeholder. Replace with the real profile.' },
];
