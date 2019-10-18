import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoginPending, setLoginSuccess, setLoginError, callLoginApi } from '../../redux/reducer';
import './style.scss';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let { email, password } = this.state;
    let { isLoginPending, isLoginSuccess, loginError } = this.props;
    if(isLoginSuccess) {
      this.props.history.push('/');
    }
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
        <div className="form-group-collection">
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} value={email} />
          </div>

          <div className="form-group">
            <input type="password" name="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} value={password} />
          </div>
        </div>

        <input className="login-btn" type="submit" value="Login" />

        <div className="message">
          {isLoginPending && <div>Please wait...</div>}
          {isLoginSuccess && <div>Success.</div>}
          {loginError && <div>{loginError.message}</div>}
        </div>
      </form>
    )
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(setLoginPending(true));
      dispatch(setLoginSuccess(false));
      dispatch(setLoginError(null));

      callLoginApi(email, password, error => {
        dispatch(setLoginPending(false));
        if (!error) {
          dispatch(setLoginSuccess(true));
        } else {
          dispatch(setLoginError(error));
        }
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);