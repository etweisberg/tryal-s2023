import { Server } from 'socket.io';
import express from 'express';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import http from 'http';
import MongoStore from 'connect-mongo';
import routers from '../routes/routers';
import initializePassport from './configPassport';
import 'dotenv/config';
import apiErrorResponder from '../util/apiErrorResponder';
import ApiError from '../util/apiError';

/**
 * Creates an express instance with the appropriate routes and middleware
 * for the project.
 * @param sessionStore The {@link MongoStore} to use to store user sessions
 * @returns The configured {@link express.Express} instance
 */
const createExpressApp = (sessionStore: MongoStore): express.Express => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  const sessionMiddleware = session({
    secret: process.env.COOKIE_SECRET || 'SHOULD_DEFINE_COOKIE_SECRET',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: sessionStore, // use MongoDB to store session info
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  });

  // Set up passport and strategies
  initializePassport(passport);

  // Sets the port for the app
  app.set('port', process.env.PORT || 4000);
  // Gives express the ability to parse requests with JSON and turn the JSON into objects
  app.use(express.json());
  // Gives express the ability to parse urlencoded payloads
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  // Gives express the ability accept origins outside its own to accept requests from
  app.use(cors());
  // app.use(cors({ credentials: true, origin: process.env.LOCALHOST}));

  // Gives express the ability to parse client cookies and add them to req.cookies
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Use express-session to maintain sessions
  app.use(sessionMiddleware);

  // Init passport on every route call and allow it to use "express-session"
  app.use(passport.initialize());
  app.use(passport.session());

  // Inits routers listed in routers.ts file
  routers.forEach((entry) => app.use(entry.prefix, entry.router));

  // Serving static files
  if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, '../../../../', 'client', 'build');

    app.use(express.static(root));
    app.get('*', (_: any, res: any) => {
      res.sendFile('index.html', { root });
    });
  }

  // Handles all non matched routes
  app.use((req, res, next) => {
    next(ApiError.notFound('Endpoint unavailable'));
  });

  // Sets the error handler to use for all errors passed on by previous handlers
  app.use(apiErrorResponder);

  // sockets
  const wrap = (middleware: any) => (socket: any, next: any) =>
    middleware(socket.request, {}, next);

  io.use(wrap(sessionMiddleware));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));

  io.use((socket: any, next: any) => {
    if (socket.request.user) {
      next();
    } else {
      next(new Error('unauthorized'));
    }
  });

  return app;
};

export default createExpressApp;
