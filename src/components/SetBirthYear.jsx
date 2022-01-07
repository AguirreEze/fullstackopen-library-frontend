import { useMutation } from '@apollo/client'
import React from 'react'
import { useField } from '../hooks'
import { EDIT_AUTHOR } from '../mutations'
import { ALL_AUTHORS } from '../queries'

const SetBirthYear = () => {
  const author = useField({ type: 'text' })
  const born = useField({ type: 'number' })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      editAuthor({
        variables: {
          author: author.input.value,
          born: parseInt(born.input.value)
        }
      })
      author.reset()
      born.reset()
    } catch (err) { console.log(err) }
  }

  return (
      <div>
          <h2>Set birthyear</h2>
          <form onSubmit={handleSubmit}>
            <input
            {...author.input}
            placeholder='Author'
            name='author'
            />
            <input
            {...born.input}
            placeholder='Born'
            name='born'
            />
          <button>update author</button>
          </form>
      </div>
  )
}

export default SetBirthYear
