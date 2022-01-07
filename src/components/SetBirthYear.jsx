import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useField } from '../hooks'
import { EDIT_AUTHOR } from '../mutations'
import { ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const SetBirthYear = ({ authors }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const born = useField({ type: 'number' })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      editAuthor({
        variables: {
          author: selectedOption.value,
          born: parseInt(born.input.value)
        }
      })
      born.reset()
    } catch (err) { console.log(err) }
  }

  return (
      <div>
          <h2>Set birthyear</h2>
          <form onSubmit={handleSubmit}>
              <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
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
