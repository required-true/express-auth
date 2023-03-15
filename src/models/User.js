export const users = [
  {
    id: 1,
    username: 'test',
    userEmail: 'test@test.com',
    password: '123',
  },
  {
    id: 2,
    username: 'test2',
    userEmail: 'test2@test.com',
    password: '123',
  }
]

export const isValidUser = (username, password) => {
  const user = users.find((u) => u.username === username && u.password === password)
  if (!user) {
    return false
  }
  return true
}