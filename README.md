# My Frontend Stat
## Description
A web application designed to track and quantify personal progress in learning frontend development.
## Live Demo
https://dillank-frontend-stat.vercel.app
## Tech stack
Frontend: React, Redux Toolkit, Vite, Jest (unit-testing).
Backend: Node.js, Express, MongoDB.
Typing: TypeScript.
Organization: pnpm Workspaces (Monorepository)
## Motivation
The project was created to solve the problem of motivation and objective assessment of progress during independent learning of web development, as well as to demonstrate skills in working with the main stack of technologies and practical training in backend development.
## Features
- The monorepo architecture was chosen to unify dependency management between the frontend and the backend; pnpm workspaces allowed to automate the launch of a fullstack environment, which greatly simplified the development and debugging process;
- Using a single stack to handle local UI state and asynchronous requests simplified the application architecture and reduced complexity for future support. RTK was chosen for its effectiveness in reducing boiler plate and providing a high-quality DX;
- Mongoose is used to interact with the database. The main reason is strict adherence to data schemas, which is critical for synchronization with TypeScript interfaces on the client and preventing type misalignment;
- The UI implements reactive display of information about the status of an asynchronous request to the database (success/loading/error);
- The layout is based on semantic markup and the use of Flexbox, which guarantees the adaptability of the interface. Visual elements (including the SVG progress circle) are encapsulated in reusable components, eliminating the need for heavy third-party graphics libraries.
## How to launch
Commands:
1) Installing dependencies: 
```pnpm i```
2) Local launch:
```pnpm start```
## Future
Implementing React Router to create a page with a database update interface and an authentication page to restrict access to it.