import type { Node } from "./Node";
import type { Edge } from "./Edge";
import type { GroqRequest } from "./Request";

export type TaskStatus = "todo" | "in-progress" | "done" | "archived";
export type SubTaskStatus = "todo" | "in-progress" | "done";

export interface TaskNode extends Node {
  data: Node["data"] & {
    label: string;
    deadline: string;
    status: SubTaskStatus;
    timerMinutes: number;
  };
}

export interface Task {
  id: string;
  created: string;
  last_edited: string;
  deadline: Date;
  name: string;
  description: string;
  status: TaskStatus;
  nodes: TaskNode[];
  edges: Edge[];
  request_history?: GroqRequest[];
}

export {};
