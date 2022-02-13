import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { setContext } from '@apollo/client/link/context';
import UserList from './pages/UserList';

import Footer from './components/Footer';
import LeftImage from './components/LeftImage';
import RightImage from './components/RightImage';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider className="col-sm-12" client={client}>
      <Router className="col-sm-12">
        <div className="d-flex flex-column col-sm-12">
          <Nav />
          <div className="d-flex flex-row col-sm-12">
            <LeftImage />
            <Switch>
              <Route exact path="/">
                <Home className="col-sm-12"/>
              </Route>
              <Route exact path="/login">
                <Login className="col-sm-12"/>
              </Route>
              <Route exact path="/signup">
                <Signup className="col-sm-12"/>
              </Route>
              <Route exact path="/dashboard">
                <Dashboard className="col-sm-6"/>
              </Route>
              <Route exact path="/user-list">
                <UserList className="col-sm-12"/>
              </Route>
            </Switch>
            <RightImage />
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
