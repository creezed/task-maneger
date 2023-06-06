export interface TodoModel {
  id: number;
  status: Status;
  title: string;
  subTitle: string;
  text: string;
  complexity: Complexity;
}

export type Status = 'BACKLOG' | 'TODO' | 'DONE';
export type Complexity = 'EASY' | 'MEDIUM' | 'HARD';
