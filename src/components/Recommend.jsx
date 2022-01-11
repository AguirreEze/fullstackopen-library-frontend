import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  if (!show) return null
  const res = useQuery(ALL_BOOKS)
  const myData = useQuery(ME)

  if (res.loading || myData.loading) return <h1>Loading...</h1>

  const books = res.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <p>Your favorite genre is <b>{myData.data.me.favoriteGenre}</b></p>
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
            .filter(a => a.genres.includes(myData.data.me.favoriteGenre))
            .map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
