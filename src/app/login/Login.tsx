import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from 'routing/AppRoute.enum';
import loginImage from '../assets/loginImage.png';
import closeImage from '../assets/close.svg'
import './login.scss';

export const Login = () => {
  return (
    <div className="login">
      <div className='col-left'>
        <img src={loginImage} alt='Man on the wooden bridge' />
      </div>
      <div className='col-right'>
        <Link to={AppRoute.Home}><img className="close" src={closeImage} alt="cross"/></Link>
        <div className='logo'>join.tsh.io</div>
        <h2>Login</h2>
        <form>
          <div className="form-control">
            <label>
              Username:
              <input className="input-field" name="username" placeholder="Enter username"/>
            </label>
          </div>
          <div className="form-control">
            <label>
              Password:
              <input className="input-field" name="password" type="password" placeholder="Enter password"/>
            </label>
          </div>
          <button className="button-blue" type="submit">Log in</button>
          <a className="pass-reset" href="#">Forgot password?</a>
        </form>
      </div>
    </div>
  );
};
