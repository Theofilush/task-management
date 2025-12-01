import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { Layout } from "@/layouts/layout";
import { About } from "@/routes/about";
import { TaskId } from "@/routes/task-id";
import { App } from "@/app";
import "@/index.css";
import { Create } from "./routes/create";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/tasks/:taskId" element={<TaskId />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>,
);
