import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  if (!props.show) {
    return null
  }
  const [filter, setFilter] = useState(null)
  const [getBooks, res] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks({
      variables: {
        genre: filter
      }
    })
  }, [filter])

  if (res.loading || !res.called) return <h1>Loading...</h1>

  const books = res.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter(a => filter ? a.genres.includes(filter) : true)
            .map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            )}
        </tbody>
      </table>
      <div>
          <button onClick={() => setFilter('test')}>test</button>
          <button onClick={() => setFilter('Magic')}>Magic</button>
          <button onClick={() => setFilter('Terror')}>Terror</button>
          <button onClick={() => setFilter('Suspence')}>Suspence</button>
          <button onClick={() => setFilter(null)}>show all</button>
      </div>
    </div>
  )
}

export default Books
