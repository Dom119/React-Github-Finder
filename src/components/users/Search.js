import React, { useState } from 'react'

const Search = ({showClear, clearUsers, setAlert, searchUsers}) => {

  const[text, setText] = useState('');

  const onChange = event => setText(event.target.value)

  const onSubmit = event => {
    event.preventDefault();
    if (text === "") {
      setAlert('Please enter something...', 'light')
    } else {
      searchUsers(text);
      setText("")
    }
  }

  return (
    <div>
      <form className='form'>
        
        <input type="text" name='text'
                placeholder='Search Users...'
                value={text}
                onChange={onChange} />
        
        <input type="submit" value="Search" className='btn btn-dark btn-block' onClick={onSubmit} />
        
        {showClear && <button className='btn btn-dark btn-block' onClick={clearUsers}>Clear</button>}
        
      </form>
    </div>
  )
}

export default Search
