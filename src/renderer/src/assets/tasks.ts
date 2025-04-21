// import { ref } from "vue";
// import "@vue-flow/minimap/dist/style.css";
// import type { XYPosition } from "@vue-flow/core";
// import type { Task } from "../types/Task";

// const tasks = ref<Task[]>([
//   {
//     created: "2023-10-01T12:00:00Z",
//     last_edited: "2023-10-01T12:00:00Z",
//     id: "275511e3-f083-438a-844c-960d644b1799",
//     deadline: new Date("2023-10-10T12:00:00Z"),
//     name: "Task 1",
//     description: "Task 1 description",
//     status: "todo",
//     nodes: [
//       {
//         id: "1",
//         type: "special",
//         position: { x: 100, y: 200 } as XYPosition,
//         data: {
//           label: "Node 1",
//           hello: "world",
//         },
//       },
//     ],
//     edges: [
//       {
//         id: "e1->2",
//         source: "1",
//         target: "2",
//         animated: true,
//       },
//     ],
//   },
//   {
//     created: "2023-10-02T12:00:00Z",
//     last_edited: "2023-10-02T12:00:00Z",
//     id: "e3800cb0-948a-4443-98a4-7d7871afdedc",
//     deadline: new Date("2023-10-11T12:00:00Z"),
//     name: "Task 2",
//     description: "Task 2 description",
//     status: "in-progress",
//     nodes: [
//       {
//         id: "2",
//         type: "special",
//         position: { x: 400, y: 200 } as XYPosition,
//         data: {
//           label: "Node 2",
//           hello: "world",
//         },
//       },
//       {
//         id: "3",
//         type: "special",
//         position: { x: 600, y: 200 } as XYPosition,
//         data: {
//           label: "Node 3",
//           hello: "world",
//         },
//       },
//     ],
//     edges: [
//       {
//         id: "e2->3",
//         source: "2",
//         target: "3",
//         animated: true,
//       },
//     ],
//   },
//   {
//     created: "2023-10-05T14:30:00Z",
//     last_edited: "2023-10-05T14:30:00Z",
//     id: "1f6cb7eb-6fa4-45d0-a3aa-80e7c1aee768",
//     deadline: new Date("2023-10-06T17:00:00Z"),
//     name: "Prepare Big Presentation",
//     description:
//       "Prepare a polished presentation with validated content and multiple images for the meeting tomorrow.",
//     status: "todo",
//     nodes: [
//       {
//         id: "node1",
//         type: "special",
//         position: {
//           x: 100,
//           y: 100,
//         },
//         data: {
//           label: "Talk to multiple experts to validate content",
//           deadline: new Date("2023-10-06T10:00:00Z"),
//           timer: "25 minutes",
//         },
//       },
//       {
//         id: "node2",
//         type: "special",
//         position: {
//           x: 200,
//           y: 100,
//         },
//         data: {
//           label: "Gather and select multiple images",
//           deadline: new Date("2023-10-06T14:00:00Z"),
//           timer: "25 minutes",
//         },
//       },
//       {
//         id: "node3",
//         type: "special",
//         position: {
//           x: 300,
//           y: 100,
//         },
//         data: {
//           label: "Create the presentation slides",
//           deadline: new Date("2023-10-06T16:00:00Z"),
//           timer: "25 minutes",
//         },
//       },
//     ],
//     edges: [
//       {
//         id: "e1->2",
//         source: "node1",
//         target: "node2",
//         animated: true,
//       },
//       {
//         id: "e2->3",
//         source: "node2",
//         target: "node3",
//         animated: true,
//       },
//     ],
//   },
// ]);

// export default tasks;
