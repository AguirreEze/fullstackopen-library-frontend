import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
  if (!show) return null
  const [getBooks, res] = useLazyQuery(ALL_BOOKS)
  let books = []
  const myData = useQuery(ME)

  useEffect(() => {
    if (myData.data) {
      getBooks({
        variables: {
          genre: myData.data.me.favoriteGenre
        }
      })
    }
  }, [myData.data])

  if (myData.loading || res.loading) return <h1>Loading...</h1>

  if (res.data) books = res.data.allBooks

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
