import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../../utils/queries';

const BadgesPanel = ({ allMovieLists }) => {

    const [badge, setBadge] = useState([]);
    const { loading, data } = useQuery(GET_ME);

    //if data loads, run this again
    useEffect(() => { setBadgeImage() }, [allMovieLists]);

    const userCompletedLists = data?.me.completedLists || [];
    let hideBadgeImage = `/images/badges/Hidden-Badge.png`;
    let completedMovieList = [];

    const setBadgeImage = () => {
        console.log(userCompletedLists)
        allMovieLists.forEach((listItem) => {
            let badgeImg = hideBadgeImage;
            let badgeId = listItem._id;
            let badgeName = listItem.name;
            if (userCompletedLists.some((listData) => listData._id === badgeId)) {
                badgeImg = listItem.badge;
                //save into db (on watch) pull in against user
            }
            completedMovieList.push({
                src: badgeImg,
                id: badgeId,
                alt: badgeName
            })
            console.log(completedMovieList)
        });
        setBadge(completedMovieList);
    };

    // populate all lists, if movie in users list, then show badge, if not show not badge
    return (
        <div className="badgesForUser ms-auto">
                {badge.map(award =>
                    <div key={"div" + award.id} className="listBadge m-3">
                        <img key={"ing" + award.id} src={process.env.PUBLIC_URL + award.src} alt={award.alt} />
                    </div>
                )}
        </div>
    );
};

export default BadgesPanel;