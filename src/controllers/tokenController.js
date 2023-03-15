import { users } from './rootController'

export const getTokenLogin = (req, res) => {
  return res.render('token-login')
}

export const postTokenLogin = (req, res) => {
  try {
    const { username, password } = req.body
  } catch (error) {
  }
}