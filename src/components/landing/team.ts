// Team shown on the landing page. Put photos in public/team/ and reference them as '/team/<file>'.
// Leave `photo` empty to show the member's initials instead.
export type TeamMember = {
  name: string;
  role?: string;
  stack: string[];
  bio?: string;
  photo?: string;
  linkedin?: string;
  github?: string;
};

export const TEAM_NAME = 'Team Pitstop';
export const EVENT_NAME = 'European Hackathon League';
export const TEAM_PHOTO = '/team/team-photo.jpg';

// Ordered left to right as in the group photo.
export const TEAM: TeamMember[] = [
  { name: 'Team member 1', stack: [], photo: '/team/member-1.jpg' },
  { name: 'Team member 2', stack: [], photo: '/team/member-2.jpg' },
  { name: 'Team member 3', stack: [], photo: '/team/member-3.jpg' },
  { name: 'Team member 4', stack: [], photo: '/team/member-4.jpg' },
  { name: 'Team member 5', stack: [], photo: '/team/member-5.jpg' },
];
