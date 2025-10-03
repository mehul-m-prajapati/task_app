
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  label: 'work' | 'personal' | 'priority';
  dueDate: string;
  createdAt: Date;
}

export type TaskFilter = 'all' | 'active' | 'completed';
