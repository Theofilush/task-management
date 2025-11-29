import type { Tasks } from "@/modules/task/schema";

export const initialDataTasks: Tasks = [
  {
    id: 1,
    title: "Belajar Tailwind",
    description: "Mempelajari dasar-dasar Tailwind CSS",
    status: "todo",
    priority: "high",
    dueDate: "2025-12-01",
    createdAt: "2025-11-29T10:00:00Z",
    updatedAt: "2025-11-29T12:00:00Z",
    isDone: false,
  },
  {
    id: 2,
    title: "Membuat Dashboard",
    description: "Membuat halaman dashboard dengan form dan list task",
    status: "inprogress",
    priority: "medium",
    dueDate: "2025-12-02",
    createdAt: "2025-11-29T11:00:00Z",
    updatedAt: "2025-11-29T13:00:00Z",
    isDone: false,
  },
  {
    id: 3,
    title: "Setup Project",
    description: "Inisialisasi project dengan Tailwind dan konfigurasi dasar",
    status: "done",
    priority: "low",
    dueDate: "2025-11-28",
    createdAt: "2025-11-27T09:00:00Z",
    updatedAt: "2025-11-28T15:00:00Z",
    isDone: true,
  },
];
