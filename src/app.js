import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { petsRouter } from './routes/pets.router.js';
import { testSocketChatRouter } from './routes/test.socket.chat.router.js';
import { usersHtmlRouter } from './routes/users.html.router.js';
import { usersRouter } from './routes/users.router.js';
import { loginRouter } from './routes/login.router.js';
import { viewsRouter } from './routes/views.router.js';
import { __dirname, connectMongo, connectSocket } from './utils.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import FileStore from 'session-file-store';
const FileStoreSession = FileStore(session);

const app = express();
const port = 8000;

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

connectMongo();
connectSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(cookieParser('coder-secret'));
app.use(session({ secret: 'un-re-secreto', resave: true, saveUninitialized: true })); */

app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://guillermofergnani:AdKFB89Q0rn6B99u@51395.qrp9dhg.mongodb.net/', ttl: 86400 * 7 }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/sessions', loginRouter);

/* app.use('/users', usersHtmlRouter);
app.use('/test-chat', testSocketChatRouter); */
app.use('/', viewsRouter);

app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'no encontrado',
    data: {},
  });
});
