import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './redux/store';

import Home from './components/Home/';
import LoginForm from './components/LoginForm';

const isAuthenticated = () => {
  let { isLoginSuccess } = store.getState();
  return isLoginSuccess;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
