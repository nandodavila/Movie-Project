import React from 'react';
import '../styles/Dashboard.css';
import QuizPanel from '../components/QuizPanel';
import ListPanel from '../components/ListPanel';
import BadgesPanel from '../components/BadgesPanel';

export default function Dashboard() {

  return (
    <div>
      <h1>User Dashboard</h1>
      <div className="dashboardContent">
        <div className="left">
          <ListPanel />
          <button>Check Off Watched Movies</button>
          <button>Create Movie List</button>
        </div>
        <div className="right">
          <BadgesPanel />
          <QuizPanel />
          <button>Take Quiz</button>
        </div>
      </div>
    </div>
  );
}
