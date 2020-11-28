import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Navbar from './components/layout/Navbar.js'
import Alert from './components/layout/Alert.js'
import Users from './components/users/Users.js'
import User from './components/users/User.js'
import Search from './components/users/Search.js'
import About from './components/pages/About.js'


const App = () => {
  
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
    <Router>
      <div className='App' >
        <Navbar /> 
        <div className="container">
          <Switch>
            <Route exact path='/' render={props => {
              console.log('this is from Route') 
              console.log(props)
              return (
                <Fragment>
                  <Alert alert={alert} />
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert = {showAlert}
                    />
                    <Users loading={loading}  users={users} />
                </Fragment>
              ) 
            }} />
            <Route exact path='/about' render={props => {
              return (
                <About />
              )
            }} />
            <Route path='/user/:login' render={props => {
              return (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading} />
              )
            }}/>
          </Switch> 
        </div>
      </div>
    </Router>
  ) 
  
}

export default App;
