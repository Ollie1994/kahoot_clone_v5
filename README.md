# Kahoot Clone

This project was built as a learning exercise to explore and acquire new technologies such as **Next.js**, **Socket.IO/websockets**, and deployment with **AWS EC2**.  
I chose to replicate Kahoot because it offered a straightforward yet powerful structure: a simple frontend, real-time multiplayer features, and a practical use case for sockets.

## Description

Kahoot is a quiz website/application that allows users to quickly create or use existing quizzes.  
The part I chose to replicate was the classroom mode, where:  
* A **host** starts a game on a large screen (e.g., projector in a classroom).  
* **Players** join the game using a unique code on their mobile devices or laptops.  
* **Questions** are displayed in real time, and players submit their answers through their own devices.  

This project replicates that flow using modern web technologies.  

The main goals of this project were:  
- Learn **Next.js** for an upcoming internship.
- Learn how **websockets** enable real-time communication between multiple users grouped into rooms (e.g., one quiz session per room).
- Gain hands-on experience deploying to an **AWS EC2 instance** using **PM2**.  
- Complement my studies for the **AWS Cloud Practitioner certificate** by practicing cloud deployment.  

## Features

- Create and host a quiz session as a teacher/host.  
- Players can join using a **unique game code**.  
- Real-time communication powered by **Socket.IO**.  
- Live question display for all connected players.  
- Instant answer submissions and feedback.  
- Room-based architecture (multiple games can run independently).  
- Deployed and managed on **AWS EC2** with **PM2** for uptime.

## Future Improvements
- Refine the UI/UX to make the interface more intuitive and user-friendly.  
- Improve mobile responsiveness for a seamless player experience.  
- Add user authentication with **NextAuth** (register/login).  
- Enable users to **save and manage their quizzes**.  
- Implement proper form validation and error handling. 

## Built With
* Next.js
* React
* Socket.io
* MongoDB Atlas
* Prisma.io

## Deployed With
* AWS EC2 Instance
* PM2

## Getting Started

### Dependencies
Make sure you have the following installed:  
* [Node.js](https://nodejs.org/)  
* [npm](https://www.npmjs.com/)  

### Installing
Clone the repository and install dependencies:

```
git clone <your-repo-url>
cd kahoot-clone
npm install
```


* Create a .env with the following:
```
DATABASE_URL=your-mongodb-atlas-uri
HOSTNAME=localhost
PORT=3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```


### Executing program

Run the development servers (Next.js + Socket.IO):
```
npm run dev:socket
Ctrl + Mouse left to open the website

Ctrl + C (to shut down the servers)
```

## License
MIT License

Copyright (c) 2025 Oliwer Karlsson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

⚠️ Disclaimer: This project is inspired by Kahoot!
 but is not affiliated with, endorsed by, or connected to Kahoot! ASA. All trademarks and copyrights related to Kahoot! belong to their respective owners.

## Acknowledgments

Inspiration, code snippets, etc.
* Kahoot (for inspiration)
* https://www.youtube.com/watch?v=b79LOKfXzOk (for learning socket.io)
* https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc (ReadMe Template)
  








