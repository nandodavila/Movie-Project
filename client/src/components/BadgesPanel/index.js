import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../../utils/queries';

const BadgesPanel = ({allMovieLists}) => {
    const styles = {
        listBadge: {
        width: "20px",
        height: "auto"
        },
    }
    const [badge, setBadge] = useState([]);
    const { loading, data } = useQuery(GET_ME);
    useEffect(() => {setBadgeImage()}, []);

    const userCompletedLists = data?.me.completedLists || [];
    
    let completedMovieList = [];
    let hideBadgeImage = `/images/badges/Hidden-Badge.png`;
    const setBadgeImage = () => {
        allMovieLists.forEach((listItem) => {
            let badgeImg = hideBadgeImage;
            let badgeId = listItem._id;
            let badgeName = listItem.name;
            if (userCompletedLists.some((listData) => listData.listId === badgeId)) {
                badgeImg = listItem.badge;
            }
            completedMovieList.push({
                src: badgeImg,
                id: badgeId,
                alt: badgeName})
        });
        completedMovieList.forEach(toPrint => console.log(toPrint));
        setBadge(completedMovieList)
    };

    // populate all lists, if movie in users list, then show badge, if not show not badge
    const styles = {
        maxWidth: '540px'
    }
    return (
        <div className="card mb-3">
            <div className="flex-row justify-space-between my-4">
                    {badge.map(award => 
                    <div className="col-12 col-xl-6"><div styles={styles.listBadge} className="card mb-3"> <img src={process.env.PUBLIC_URL + award.src} key={award.id} alt={award.alt} />
                    </div>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default BadgesPanel;