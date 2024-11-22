export interface Student {
  id: string;
  name: string;
  email: string;
  codeforcesHandle: string;
  csesHandle: string;
  batch: string;
  isActive: boolean;
  createdAt: string;
}

export interface ProblemSolved {
  platform: 'codeforces' | 'cses';
  problemId: string;
  timestamp: number;
  attempts: number;
  solved: boolean;
}

export interface StudentStats {
  totalSolved: number;
  codeforcesCount: number;
  csesCount: number;
  weeklyProgress: { date: string; count: number }[];
  attemptDistribution: { attempts: number; count: number }[];
}

export interface CodeforcesUser {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
}

export interface AdminState {
  isAddingStudent: boolean;
  isEditingStudent: string | null;
}