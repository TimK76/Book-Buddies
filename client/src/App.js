import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";
import ApolloClient from "apollo-boost";
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
// import SingleComment from './pages/SingleComment'; 
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
// import FriendList from './components/FriendList';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks}/>
            {/* <Route exact path="/single" component={SingleComment}/> */}
            <Route exact path="/profile" component={Profile}/>
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
