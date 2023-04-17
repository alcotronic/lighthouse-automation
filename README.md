# Lighthouse Report Automation

Solution with nestjs backend and angular frontend for manual or scheduled creation of google lighthouse reports (https://github.com/GoogleChrome/lighthouse).

The project started more than two years ago for quality checks of https://taz.de.
It was not finished and was abandoned for a while.
I move the seperated old projects to a single nx-workspace (https://nx.dev) at the moment, including a lot of refactoring and lib creation.

## Backend

The backend is based on nestjs and uses chrome-launcher (https://github.com/GoogleChrome/chrome-launcher), so some kind of installation of chrome or chromium is needed.

### Backend Development server

Run `nx serve lha-backend` for a dev server. Navigate to http://localhost:3000/. The app will automatically reload if you change any of the source files.

## Frontend

The frontend is baded on angular (https://angular.io). At the moment I move parts of it to libs in the nx-workspace.

### Frontend Development server

Run `nx serve lha-frontend` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.
