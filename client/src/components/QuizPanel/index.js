import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../../utils/queries';

const QuizPanel = ({ quizHighScore }) => {
    const { loading, data } = useQuery(GET_ME);

    const userQuizHighScore = data?.quizHighScore || [];

    if (!userQuizHighScore.length) {
        return <h3>You haven't taken the quiz yet. </h3>;
    }

    const styles = {
        maxWidth: '540px'
    }

    return (
        <div class="card mb-3" style={styles.maxWidth}>
            <div className="flex-row justify-space-between my-4">
                <div key="userQuizScore" className="col-12 col-xl-6">
                    <div className="card mb-3">
                        <h4 className="card-header bg-dark text-light p-2 m-0">
                        Your quiz score is {quizHighScore}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPanel;