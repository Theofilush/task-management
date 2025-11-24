import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/layouts/layout";
import { About } from "@/routes/about";
import { TaskId } from "@/routes/task-id";
import { App } from "@/app";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks/:taskId" element={<TaskId />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
