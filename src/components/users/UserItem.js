import React from 'react'
import { Link } from 'react-router-dom';

const UserItem = ({ user: { avatar_url, login, html_url } }) => {

  return (
    <div className='card text-center'>
      <img src={avatar_url} alt="Avatar" className='round-img' style={{width: '60px '}}/>
      <h3>{login}</h3>
      <div><Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">Learn More</Link></div>
    </div>
  )
}

export default UserItem
  