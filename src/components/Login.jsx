import { useMutation } from '@apollo/client'
import React from 'react'
import { useField } from '../hooks'
import { LOGIN } from '../mutations'

const Login = ({ show, setIsLogged, setPage }) => {
  if (!show) return null
  const user = useField({ type: 'text' })
  const password = useField({ type: 'password' })
  const [login] = useMutation(LOGIN)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({
        variables: {
          username: user.input.value,
          password: password.input.value
        }
      })
      if (res.data.login) {
        localStorage.setItem('library-user-token', res.data.login.value)
        setIsLogged(true)
        setPage('authors')
      }
    } catch (err) { console.log(err) }
  }

  return (
  <form onSubmit={handleSubmit}>
      <div>
          <label name='user'>User</label>
          <input
          {...user.input}
          placeholder='User'
          name='user'
          />
      </div>
      <div>
          <label name='password'>Password</label>
          <input
          {...password.input}
          placeholder='Password'
          name='password'
          />
      </div>
      <button>Login</button>
  </form>
  )
}

export default Login
