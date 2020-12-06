import { createContext, useState } from 'react'
import axios from 'axios';


export const AppContext = createContext()

const AppStateContext = props => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
 
  const searchUsers = async (text) => {

    setLoading(true)
      
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    setUsers(res.data.items)
    setLoading(false)
    setAlert(null)
  }
   
  //Get a single github user
  const getUser = async (username) => {
    setLoading(true)
      
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    setUser(res.data)
    setLoading(false)
  }

  //Get Repositories from a single github user
  const getUserRepos = async (username) => {
    setLoading(true)
      
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    setRepos(res.data)
    setLoading(false)
  }

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  const showAlert = (msg, type) => {
    setAlert({msg, type})
  }
  return (
    <AppContext.Provider
      value={{
        user: user,
        users: users,
        repos: repos,
        loading: loading,
        alert: alert,
        clearUsers,
        searchUsers,
        showAlert,
        getUser,
        getUserRepos
    }}>
      {/* {props.children} */}
    </AppContext.Provider>
  )
}

export default AppStateContext