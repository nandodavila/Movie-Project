import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../../utils/queries';

const BadgesPanel = ({ allMovieLists }) => {

    const [badge, setBadge] = useState([]);
    const { loading, data } = useQuery(GET_ME);
    //if data loads, run this again
    useEffect(() => { setBadgeImage() }, [data]);
    
    const userCompletedLists = data?.me.completedLists || [];
    let hideBadgeImage = `/images/badges/Hidden-Badge.png`;
    let completedMovieList = [];

    const  setBadgeImage = () => {
         allMovieLists.forEach((listItem) => {
            let badgeImg = hideBadgeImage;
            let badgeId = listItem._id;
            let badgeName = listItem.name;
            if (userCompletedLists.some((listData) => listData.listId === badgeId)) {
                badgeImg = listItem.badge;
                //save into db (on watch) pull in against user
            }
            completedMovieList.push({
                src: badgeImg,
                id: badgeId,
                alt: badgeName
            })
        });
         setBadge(completedMovieList);
    };
    // populate all lists, if movie in users list, then show badge, if not show not badge
    return (
        <div className="card mb-3">
            <div className="flex-row justify-space-between my-4">
                {badge.map(award =>
                    <div className="col-12 col-xl-6"><div className="listBadge mb-3"> {award.id} <img src={process.env.PUBLIC_URL + award.src} key={award.id} alt={award.alt} />
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BadgesPanel;