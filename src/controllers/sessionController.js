import { isValidUser } from '../models/User'

export const getLogin = (req, res) => {
  return res.render('login')
}

export const postLogin = (req, res) => {
  const { username, password } = req.body

  if (isValidUser(username, password)) {
    req.session.loggedIn = true;
    req.session.username = username;
    return res.redirect('/')

  } else {
    req.flash('error', 'User authorization failed')
    return res.redirect('/login')
  }
}

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/login');
}