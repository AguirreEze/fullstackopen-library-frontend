import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query  {
  allAuthors {
  name
  bookCount
  born
  id
  }
}
`

export const ALL_BOOKS = gql`
query allBooks ($genre: String) {
  allBooks(genre: $genre) {
  title
  author{
    name
  }
  published
  genres
  id
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id 
  }
}
`
