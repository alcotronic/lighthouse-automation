# Lighthouse Report Automation

*work in progress, basicly working now*

Solution with nestjs backend and angular frontend for manual or scheduled creation of google lighthouse reports (https://github.com/GoogleChrome/lighthouse).

The project started more than two years ago for quality checks of https://taz.de.
It a early fast written prototype and it was abandoned for a two years.
At the moment I am moving the seperated old projects to a single nx-workspace (https://nx.dev), including a lot of refactoring and lib creation.

## Backend

nx graph backend:
![alt text](https://github.com/alcotronic/lighthouse-automation/raw/main/nx-graph-backend.png)

The backend is based on nestjs and uses chrome-launcher (https://github.com/GoogleChrome/chrome-launcher), so some kind of installation of chrome or chromium is needed. MongoDB (https://www.mongodb.com/) is used as database and Redis (https://redis.io) for the job queues for now.
The backend still needs some rework.

### Backend Development server

For developing I added a docker-compose file with dockers for MongoDB and Redis.

Run `nx serve lha-backend` for a dev server. Navigate to http://localhost:3000/. The app will automatically reload if you change any of the source files.

## Frontend

nx graph frontend:
![alt text](https://github.com/alcotronic/lighthouse-automation/raw/main/nx-graph-frontend.png)

The frontend is based on angular (https://angular.io).
At the moment I move parts of it to libs in the nx-workspace and i add ngrx for state manamgent to switch to from the old pull based design to a push based one, components simplification, request reduction and to achive a better overall project structure.

### Frontend Development server

Run `nx serve lha-frontend` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

nx graph:
![alt text](https://github.com/alcotronic/lighthouse-automation/raw/main/nx-graph.png)

Run `nx graph` to see a diagram of the dependencies of the projects.
