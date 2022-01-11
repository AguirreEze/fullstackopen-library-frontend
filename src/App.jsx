import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [isLogged, setIsLogged] = useState(() => !!localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const logout = () => {
    setIsLogged(false)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {isLogged && <button onClick={() => setPage('add')}>add book</button>}
        {
        isLogged
          ? <button onClick={logout}>Logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setIsLogged={setIsLogged}
        setPage={setPage}
      />

    </div>
  )
}

export default App
