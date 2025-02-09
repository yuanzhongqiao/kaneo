import Elysia, { t } from "elysia";

import createTask from "./controllers/create-task";
import getTasks from "./controllers/get-tasks";
import updateTaskStatus from "./controllers/update-task-status";

const connections = new Map();

const task = new Elysia({ prefix: "/task" })
  .post(
    "/create",
    async ({ body }) => {
      const createdTask = await createTask(body);

      return createdTask;
    },
    {
      body: t.Object({
        projectId: t.String(),
        userEmail: t.String(),
        title: t.String(),
        status: t.String(),
        dueDate: t.Date(),
        description: t.String(),
        priority: t.String(),
      }),
    },
  )
  .ws("/ws/:projectId", {
    async open(ws) {
      const projectId = ws.data.params.projectId;

      if (!connections.has(projectId)) {
        connections.set(projectId, new Set());
      }

      connections.get(projectId).add(ws);

      const boardState = await getTasks(projectId);
      ws.send(boardState);
    },
    async message(
      ws,
      message: {
        type: string;
        id: string;
        status: string;
      },
    ) {
      const projectId = ws.data.params.projectId;

      const { type, id, status } = message;

      if (type === "UPDATE_TASK") {
        await updateTaskStatus({
          id,
          status,
        });

        const clients = connections.get(projectId);
        const boardState = await getTasks(projectId);

        if (clients) {
          for (const client of clients) {
            client.send(boardState);
          }
        }
      }
    },
    close(ws) {
      const projectId = ws.data.params.projectId;

      const clients = connections.get(projectId);
      if (clients) {
        clients.delete(ws);

        if (clients.size === 0) {
          connections.delete(projectId);
        }
      }

      console.log(`Client disconnected from project ${projectId}`);
    },
  });

export default task;
