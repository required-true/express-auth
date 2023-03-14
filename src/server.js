import express from 'express'
import morgan from 'morgan';
import rootRouter from './routers/rootRouter';

const app = express()
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', rootRouter)

const PORT = 4000;
const handleListening = () => console.log(`✅ Server listening on port ${PORT} 🚀`);
app.listen(PORT, handleListening)