import { isValidUser } from '../models/User'

export const getSessionLogin = (req, res) => {
  return res.render('session-login')
}

export const postSessionLogin = (req, res) => {
  const { username, password } = req.body

  if (isValidUser(username, password)) {
    req.session.loggedIn = true;
    req.session.username = username;
    return res.redirect('/')

  } else {
    req.flash('error', 'User authorization failed')
    return res.redirect('/session-login')
  }
}

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/session-login');
}