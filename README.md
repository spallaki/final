# React-Redux + Express + Node Starter Pack

When someone on your team tells you they are about to initialize a React project from scratch

![smack](https://media.giphy.com/media/ptDRdwFkFVAkg/giphy.gif)

When you show them this starter pack

![rain](https://media.giphy.com/media/3osxYamKD88c6pXdfO/giphy.gif)

## Table of Contents

1. [Overview](#overview)
1. [Commands](#commands)
1. [File Layout](#file-layout)
1. [Deploying to Heroku](#deploying-to-heroku)
1. [Todos](#todos)

## Overview

**Based off of Horizons Starter. Main differences between this and the Horizons Starter:**
- indents changed from 4 to 2
- removed PropTypes validation
- update `node-sass` dependency so that `yarn` can be used instead of `npm`
- cut down README documentation

## Commands

- `$ yarn frontend`: serve frontend with `webpack`
- `$ yarn backend`
- `$ yarn dev`: backend + frontend
- `$ yarn start`: build your production assets and run the server
- `$ npm run build`: Heroku uses this command during deployment

## File layout

- **Frontend React**
  - The top level application Container is in `frontend/containers/AppContainer.js`
  - CSS styles are in `frontend/assets/stylesheets/base.scss`
- **Backend Express**
  - Entry point is `server.js`
  - API routes are under `backend/api.js`
  - API routes are served under `http://localhost:3000/api`

## Deploying to Heroku

```
$ heroku login
$ heroku create -a name-of-your-app
$ git push heroku master
$ heroku open

```
## Todos

- figure out how to refresh webpack dynamically from http://localhost:3000 upon updates to frontend
- setup global variables that frontend has access to, likely via WebPack (current solution is to store some variable, e.g. backend url, in `localStorage`)
- figure out best practices for React routers: The original Horizons Starter lacks the `History` module that may be used for rerouting. This package lacks that as well. The current solution to rerouting asynchronously is to use `HashRouter` along with `window.location.hash = /react-router-url`. Of course, React `<Link />` can still be used for synchronous routing. **If a better approach exists please let me know at tangj1122 at gmail!**
