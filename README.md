# Focù - Voice-Controlled, AI Task Management

![showcase](/resources/showcase.png)

![Project Status](https://img.shields.io/badge/Status-Work%20in%20Progress-orange)
![Built with Electron](https://img.shields.io/badge/Built%20with-Electron-blueviolet)
![Frontend: Vue 3](https://img.shields.io/badge/Frontend-Vue%203-brightgreen)
![Language: TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![AI Powered by](https://img.shields.io/badge/AI%20Powered%20by-Groq-red)

## Project Overview

Foku is a desktop application designed to revolutionize task management, particularly for individuals who experience challenges with hyperactivity or maintaining focus. Leveraging voice control and AI-driven insights, Foku helps users break down large, daunting tasks into smaller, more manageable subtasks, making productivity feel less overwhelming. It is highly inspired by the [Anne Research Project](https://github.com/salernoelia/anne-hub).

This project is currently under active development, with core features being implemented and refined. It serves as a demonstration of building cross-platform desktop applications using modern web technologies (Electron, Vue 3, TypeScript) integrated with external APIs (Groq) for intelligent functionality and utilizing graph visualization for a novel task representation.

## Features

Foku aims to provide an intuitive and supportive environment for getting things done. Currently implemented or in active development features include:

- **Voice-Controlled Input:** Easily create and manage tasks using natural speech.
- **AI-Driven Task Breakdown:** Utilize AI to intelligently analyze task descriptions and suggest smaller, actionable subtasks with details like deadlines and dependencies.
- **Visual Task Mapping:** Visualize your tasks and their subtasks as an interactive, node-based graph, providing a clear overview of project structure.
- **Task Dashboard:** Browse, search, and filter your existing tasks.
- **Basic Task Status Tracking:** Assign statuses (Todo, In Progress, Completed) to main tasks and potentially subtasks.
- **Local Data Persistence:** Your tasks are stored locally using Electron Store, ensuring privacy and offline access.
- **Cross-Platform Desktop Application:** Built with Electron to run on Windows, macOS, and Linux.

## Technology Stack

- **Electron:** For building the cross-platform desktop application.
- **Vue 3:** Frontend framework for building the user interface.
- **TypeScript:** For enhanced code maintainability and type safety.
- **Electron Vite:** Build tool for faster development cycles.
- **Electron Builder:** For packaging and distributing the application.
- **Vue Flow:** Library for rendering the node-based task graph.
- **Dagre:** Graph layout library used for automatically arranging task nodes.
- **Groq API:** Powers the AI capabilities for transcription and task breakdown.
- **Electron Store:** Simple, persistent user data storage.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Motion:** Animation library for UI enhancements.
- **uuid:** For generating unique IDs for tasks and nodes.

## Work in Progress

Please note that Foku is actively being developed. Key areas currently being worked on include:

- A fully neatles and hands-free interaction with a task session.
- Refining the AI prompt and parsing logic for task breakdown.
- Developing the interactive graph UI for editing nodes, adding/removing subtasks and connections.
- Implementing visual indicators for subtask status, deadlines, and timers within the graph view.
- Improving error handling and user feedback during AI interactions.
- Enhancing the user interface and experience based on user testing.

Contributions and feedback are welcome as the project evolves.

## Installation & Setup

To get Foku running on your local machine for development or testing:

1.  **Prerequisites:**

    - Node.js (v14 or higher recommended)
    - npm or Yarn or pnpm

2.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd focu-desktop
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

4.  **Set up Environment Variables:**
    - Create a `.env` file in the project root.
    - Obtain a Groq API key from [Groq Cloud](https://console.groq.com/keys).
    - Add the API key to your `.env` file:
      ```dotenv
      VITE_APP_GROQ_API_KEY=your_groq_api_key_here
      ```
    - _Note: Ensure your `.gitignore` file includes `.env` to prevent committing your API key._

### Building the Application

To build the executable application for your operating system:

```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

The built application will be located in the `out` directory.

### Basic Application Interaction (Current)

- Upon launching, you will see the dashboard.
- Press `Ctrl + N` (Windows/Linux) or `Cmd + N` (macOS) to enter the task creation flow using voice input.
- Follow the voice prompts to describe your task. Press `Enter` to finish recording and initiate the AI breakdown process.
- Once created, the task will appear on the dashboard. Click a task card to view its graph representation.
- Press `Ctrl + P` (Windows/Linux) or `Cmd + P` (macOS) from any screen to open a quick task search/selection bar.
- Press `Escape` to close the task input or navigate back from the current view (dashboard or task board).

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
