export type Room = {
  id: string;
  name: string;
  questionCount: number;
  createdAt: string;
};

export type Question = {
  id: string;
  question: string;
  answer?: string | null;
  createdAt: string;
};
