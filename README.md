# Kahoot Clone

This project was built as a learning exercise to explore and acquire new technologies such as Next.js, Socket.IO/websockets, and deployment with AWS EC2.
I chose to replicate Kahoot because it offered a straightforward yet powerful structure: a simple frontend, real-time multiplayer features, and a practical use case for sockets.

## Description
Kahoot is a quiz website/application that allows users to quickly create or use existing quizzes. The part I chose to replicate was the classroom mode, where:
* A host starts a game on a large screen (projector in a classroom).
* Players join the game using a unique code on their mobile devices or laptops.
* Questions are displayed in real time, and players submit their answers through their own devices.
This project replicates that flow using modern web technologies.

## Built With
* Next.js
* React
* Socket.io
* MongoDb Atlas
* Prisma.io

## Deployed With
* Aws EC2 Instance
* Pm2

## Getting Started

### Dependencies
Make sure you have the following installed:
* Node.js
* Npm

### Installing
* git clone <your-repo-url>
* cd kahoot-clone
* npm install
* Create a .env with the following:
```
DATABASE_URL=
MONGODB_URI=
HOSTNAME=
PORT=
NEXT_PUBLIC_BASE_URL=
```

### Executing program

* Custom script to run both socket and node server
```
npm run dev:socket
+
Ctrl + Mouse left to open the website
_______________________________________________________
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
* https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc
  




