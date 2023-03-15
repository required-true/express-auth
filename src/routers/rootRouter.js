import express from 'express';
import { home } from '../controllers/rootController'
import { memberOnlyMiddleware, anonOnlyMiddleware } from '../middlewares';
import { getSessionLogin, postSessionLogin, logout } from '../controllers/sessionController'
import { getTokenLogin, postTokenLogin } from '../controllers/tokenController'

const rootRouter = express.Router();

rootRouter.get('/', memberOnlyMiddleware, home)
rootRouter.route('/session-login').all(anonOnlyMiddleware).get(getSessionLogin).post(postSessionLogin)
rootRouter.route('/token-login').all(anonOnlyMiddleware).get(getTokenLogin).post(postTokenLogin)
rootRouter.get('/logout', memberOnlyMiddleware, logout)

export default rootRouter