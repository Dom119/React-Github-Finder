import React, {Fragment, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar.js'
import Alert from './components/layout/Alert.js'
import Users from './components/users/Users.js'
import User from './components/users/User.js'
import Search from './components/users/Search.js'
import About from './components/pages/About.js'
import AppStateContext, {AppContext} from './AppStateContext'


const App = () => {

  const appContext = useContext(AppContext)

  // const { searchUsers, clearUsers, showAlert, getUser, getUserRepos, loading, users, repos, user } = appContext;
  
  return (
    <AppStateContext>
      <Router>
        <div className='App' >
          <Navbar /> 
          <div className="container">
            <Switch>
              <Route exact path='/' render={props => {
                return (
                  <Fragment>
                    <Alert alert={alert} />
                      <Search
                        searchUsers={appContext.searchUsers}
                        clearUsers={appContext.clearUsers}
                        showClear={appContext.users.length > 0 ? true : false}
                        setAlert = {appContext.showAlert}
                      />
                      <Users loading={appContext.loading}  users={appContext.users} />
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
                    getUser={appContext.getUser}
                    getUserRepos={appContext.getUserRepos}
                    user={appContext.user}
                    repos={appContext.repos}
                    loading={appContext.loading} />
                )
              }}/>
            </Switch> 
          </div>
        </div>
      </Router>
    </AppStateContext>
  ) 
  
}

export default App;
