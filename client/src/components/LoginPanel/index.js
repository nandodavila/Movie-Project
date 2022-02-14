import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

function LoginPanel(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const styles = {
    link: {
      textDecoration: 'none',
      color: '#F2A154',
      fontSize: '20px'
    }
  }

  return (
      <form 
      className="container ms-atuo d-flex justify-content-center align-items-center flex-column col-sm-6 form-group"
      onSubmit={handleFormSubmit}>
        <div className="container ms-atuo d-flex justify-content-center align-items-center flex-column col-sm-12 form-group">
          <input
            className="form-control justify-content-center align-items-center col-sm-12"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="container ms-atuo d-flex justify-content-center align-items-center flex-column col-sm-12 form-group my-2">
          <input
            className="form-control justify-content-center align-items-center col-sm-12"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end d-flex justify-content-center align-items-center col-sm-12">
          <button 
          className="btn d-flex justify-content-center align-items-center col-sm-6"
          type="submit">Submit</button>
        </div>
      </form>
  );
}

export default LoginPanel;