import { TodoDTO } from '@/domain/dtos/todo.dto';

interface User {
  id: string;
  name: string;
  email: string;
  phrase: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  todos: TodoDTO[];
  daylyMetrics: { date: string; task: number }[];
}

const chartData = [
  { date: '2025-04-01', task: 8 },
  { date: '2025-04-02', task: 5 },
  { date: '2025-04-03', task: 7 },
  { date: '2025-04-04', task: 9 },
  { date: '2025-06-03', task: 5 },
  { date: '2025-06-04', task: 14 },
  { date: '2025-06-05', task: 4 },
  { date: '2025-06-06', task: 11 },
  { date: '2025-06-07', task: 12 },
  { date: '2025-06-08', task: 13 },
  { date: '2025-06-09', task: 14 },
  { date: '2025-06-10', task: 6 },
  { date: '2025-06-11', task: 4 },
  { date: '2025-06-12', task: 15 },
  { date: '2025-06-13', task: 4 },
  { date: '2025-06-14', task: 14 },
  { date: '2025-06-15', task: 11 },
  { date: '2025-06-16', task: 13 },
  { date: '2025-06-17', task: 15 },
  { date: '2025-06-18', task: 5 },
  { date: '2025-06-19', task: 12 },
  { date: '2025-06-20', task: 14 },
  { date: '2025-06-21', task: 7 },
  { date: '2025-06-22', task: 11 },
  { date: '2025-06-27', task: 15 },
  { date: '2025-06-28', task: 6 },
  { date: '2025-06-29', task: 5 },
  { date: '2025-06-30', task: 15 },
];

const mockUser: User = {
  id: 'dpts0eMZTf8nrs',
  name: 'João Silva',
  email: 'joaozin@gmail.com',
  phrase: 'A vida é uma aventura, aproveite cada momento!',
  passwordHash: 'hashed_password',
  createdAt: new Date('2024-01-10'),
  updatedAt: new Date('2024-01-10'),
  todos: [],
  daylyMetrics: chartData,
};

const todos: TodoDTO[] = [
  {
    id: '1',
    title: 'Implementar autenticação de usuários',
    completed: false,
    user: mockUser,
    userId: 'dpts0eMZTf8nrs',
    subTasks: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Criar tela de dashboard',
    completed: true,
    completedAt: new Date('2024-01-16'),
    user: mockUser,
    userId: 'dpts0eMZTf8nrs',
    subTasks: [],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    title: 'Configurar ambiente de homologação',
    completed: false,
    user: mockUser,
    userId: 'dpts0eMZTf8nrs',
    subTasks: [],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    title: 'Revisar políticas de segurança',
    completed: true,
    completedAt: new Date('2024-01-18'),
    user: mockUser,
    userId: 'dpts0eMZTf8nrs',
    subTasks: [],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    title: 'Otimizar consultas do banco de dados',
    completed: false,
    user: mockUser,
    userId: 'dpts0eMZTf8nrs',
    subTasks: [],
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: '6',
    title: 'Implementar busca global',
    completed: false,
    user: mockUser,
    userId: 'dpts0eMZTf8nrs',
    subTasks: [],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

mockUser.todos = todos;

export default mockUser;
