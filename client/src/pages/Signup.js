import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
    <div className="container ms-auto d-flex justify-content-center align-items-center flex-column col-sm-12 form-group">
      <Link style={styles.link}to="/login">Already Signed Up? <br></br>← Go to Login</Link>
      <h2>Signup</h2>
      <form 
      className="col-sm-6"
      onSubmit={handleFormSubmit}
      >
        <div className="flex-row space-between my-2">
          <input
            className="form-control justify-content-center align-items-center col-sm-12"
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <input
            className="form-control justify-content-center align-items-center col-sm-12"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <input
            className="form-control justify-content-center align-items-center col-sm-12"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end d-flex justify-content-center align-items-center col-sm-12">
          <button 
          className="btn d-flex justify-content-center align-items-center col-sm-6"
          type="submit"
          >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
