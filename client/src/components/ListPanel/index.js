import React from 'react';

const BadgePanel = ({ completedLists }) => {
    if (!completedLists.length) {
        return <h3>You haven't completed any lists yet. Check movie lists </h3>;
    }

    const styles = {
        maxWidth: '540px'
    }

    return (
        <div class="card mb-3" style={styles.maxWidth}>
            <div className="flex-row justify-space-between my-4">
                {completedLists &&
                    completedLists.map((completedList) => (
                        <div key={completedList} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0">
                                    {completedLists} <br />
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BadgePanel;