import jwt from 'jsonwebtoken'
import { users } from '../models/User'

export const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken
  
  if (!accessToken) return next()
  
  try {
    const { id } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    const user = users.find((u) => u.id === id)
    req.loggedIn = true
    req.loggedInUser = user
    return next()

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.cookies.refreshToken

      try {
        const { id } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' })
        res.cookie('accessToken', accessToken, { httpOnly: true })

        const user = users.find((u) => u.id === id)
        req.loggedIn = true
        req.loggedInUser = user
        return next()

      } catch (err) {
        // 리프레시 토큰도 만료된 경우
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        req.loggedIn = false
        req.loggedInUser = {}
        return res.redirect('/login')
      }
    }
  }
}


export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.loggedIn)
  res.locals.loggedInUser = req.loggedInUser || {}
  next()
}

export const memberOnlyMiddleware = (req, res, next) => {
  if (req.loggedIn) {
    return next()
  } else {
    req.flash('error', 'Log in first.')
    return res.redirect('/login')
  }
}

export const anonOnlyMiddleware = (req, res, next) => {
  if (!req.loggedIn) {
    return next()
  } else {
    req.flash('error', 'Not authorized')
    return res.redirect('/')
  }
}