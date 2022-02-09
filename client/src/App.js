import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Nav from './components/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ListPage from './pages/ListPage';
// import Vote from './pages/Vote';
// import NotFound from './pages/NotFound';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="">
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/awards-page">
              <ListPage />
            </Route>

            {/* <Route exact path="/matchup/:id">
              <Vote />
            </Route>
            <Route>
              <NotFound />
            </Route> */}
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
