import express from 'express';
import { home } from '../controllers/rootController'
import { memberOnlyMiddleware, anonOnlyMiddleware } from '../middlewares';
import { getLogin, postLogin, logout } from '../controllers/sessionController'

const rootRouter = express.Router();

rootRouter.get('/', memberOnlyMiddleware, home)
rootRouter.route('/login').all(anonOnlyMiddleware).get(getLogin).post(postLogin)
rootRouter.get('/logout', memberOnlyMiddleware, logout)

export default rootRouter