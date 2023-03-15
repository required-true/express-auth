import 'dotenv/config';
import express from 'express'
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import session from 'express-session';
import flash from 'express-flash';

import { localsMiddleware } from './middlewares';
import rootRouter from './routers/rootRouter';

const app = express()
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // 쿠키를 서명할 때 사용하는 비밀키  
    resave: false, // 세션 데이터가 바뀌기 전까지 세션 저장소에 저장되는 것을 방지
    saveUninitialized: false, // 초기화되지 않은 세션을 저장소에 저장하는 것을 방지
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 쿠키의 만료 시간 (1일)
      httpOnly: true, // 클라이언트 스크립트에서 쿠키에 접근할 수 없도록 함
    },
  }),
);
app.use(flash());

app.use('/static', express.static('public'));
app.use(localsMiddleware)
app.use('/', rootRouter)

const PORT = 4000;
const handleListening = () => console.log(`✅ Server listening on port ${PORT} 🚀`);
app.listen(PORT, handleListening)