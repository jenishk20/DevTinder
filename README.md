# DevTinder

DevTinder is a web application designed to connect developers with potential job opportunities and projects. It allows users to create profiles, showcase their skills, and match with companies or projects that align with their expertise.

## Features

- User authentication and profile management
- Skill tagging and search functionality
- Project and job listing
- Matching algorithm to connect users with relevant opportunities
- Real-time chat functionality
- Responsive design for mobile and desktop users

## Technologies Used

- Frontend: React, Redux, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Authentication: JWT, bcrypt
- Real-time communication: Socket.io
- Deployment: Docker, AWS

## AWS Deployment :

- Create new EC2 instance with Ubuntu Server
- Install Node.js and MongoDB
- Clone the DevTinder repository
- Install dependencies using `npm install`
- Start the server using `npm start`
- Configure security groups to allow HTTP and WebSocket traffic
- Set up a reverse proxy using Nginx to handle incoming requests
- Configure SSL using Let's Encrypt for secure connections
