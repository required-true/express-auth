import jwt from 'jsonwebtoken'
import { users } from '../models/User'

export const getLogin = (req, res) => {
  return res.render('login')
}

export const postLogin = (req, res) => {
  try {
    const { username, password } = req.body
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      
      return res.redirect('/')
    } 
  } catch (error) {
    req.flash('error', 'User authorization failed')
    return res.redirect('/login')    
  }
}

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  return res.redirect('/login');
}