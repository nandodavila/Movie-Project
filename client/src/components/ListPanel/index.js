import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_LISTS } from '../../utils/queries';



const BadgePanel = () => {

    const { loading, data } = useQuery(GET_LISTS);

    return (
        <div class="card mb-3" style="max-width: 540px;">
            <div className="flex-row justify-space-between my-4">
                {data &&
                    data.map((listItems) => (
                        <div key={listItems} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0">
                                    {listItems} <br />
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BadgePanel;