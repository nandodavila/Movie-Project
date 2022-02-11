import React from 'react';
import '../styles/Dashboard.css';

import QuizPanel from '../components/QuizPanel';
import ListPanel from '../components/ListPanel';
import BadgesPanel from '../components/BadgesPanel';
import { useQuery } from '@apollo/client';
import { GET_LISTS } from '../utils/queries';

export default function Dashboard() {
  const { loading, data } = useQuery(GET_LISTS);
  const allMovieLists = data?.lists || [];

  return (
    <div>
      <h1>User Dashboard</h1>
      <div className="dashboardContent">
        <div className="left">
          {/* <ListPanel key="listPanel" allMovieLists={allMovieLists}/> */}
          <button className="btn justify-content-center align-items-center col-lg-12 ml-auto">Check Off Watched Movies</button>
          <button className="btn justify-content-center align-items-center col-lg-12 ml-auto">Create Movie List</button>
        </div>
        <div className="right">
          <BadgesPanel key="badgePanel" allMovieLists={allMovieLists}/>
          {/* <QuizPanel key="quizPanel"/> */}
          <button className="btn justify-content-center align-items-center col-lg-12 ml-auto">Take Quiz</button>
        </div>
      </div>
    </div>
  );
}
