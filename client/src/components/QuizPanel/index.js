import React from 'react';

const QuizPanel = ({ quizHighScore }) => {
    if (!quizHighScore.length) {
        return <h3>You haven't taken the quiz yet. </h3>;
    }

    return (
        <div class="card mb-3" style="max-width: 540px;">
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