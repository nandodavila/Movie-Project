import React from 'react';
import '../styles/Dashboard.css';
import { Link } from "react-router-dom";

import QuizPanel from '../components/QuizPanel';
import ListPanel from '../components/ListPanel';
import BadgesPanel from '../components/BadgesPanel';
import LoginPanel from '../components/LoginPanel';
import { useQuery } from '@apollo/client';
import { GET_LISTS } from '../utils/queries';
import Auth from '../utils/auth';

export default function Dashboard() {
  const { loading, data } = useQuery(GET_LISTS);
  const allMovieLists = data?.lists || [];

if (Auth.loggedIn()) {
  return (
    <div>
      <h1>User Dashboard</h1>
      <div className="dashboardContent">
        <div className="column">
          <ListPanel key="listPanel" allMovieLists={allMovieLists} />
          <button className="btn justify-content-center align-items-center col-lg-12 ml-auto">
            <Link to="/awards-page">
              Check off watched movies
            </Link>
          </button>
          <button className="btn justify-content-center align-items-center col-lg-12 ml-auto">
            <Link to="/awards-page">
              Create a Flicks on the Record checklist
            </Link>
          </button>
        </div>
        <div className="column">
          <BadgesPanel key="badgePanel" allMovieLists={allMovieLists} />
          {/* <QuizPanel key="quizPanel"/> */}
          <button className="btn justify-content-center align-items-center col-lg-12 ml-auto">Take Quiz</button>
        </div>
      </div>
    </div>
  );
    
  } else {
    return (
      <div>
        <h1>User Dashboard</h1>
          <h1>Before you can do that, you need to log in</h1>
          <LoginPanel />
          <div>Not a member?
          <Link to="/signup">Go to Signup</Link>
          </div>
      </div>
    );
  }
}
