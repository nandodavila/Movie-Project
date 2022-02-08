import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME, GET_LISTS } from '../../utils/queries';

const BadgesPanel = ({ badges }) => {
    const [badge, setBadge] = useState([]);
    const { meLoading, meData } = useQuery(GET_ME);
    const { loading, listData } = useQuery(GET_LISTS);

    const userCompletedLists = meData?.completedLists || [];
    const movieListIds = listData?.omdbId || [];

    let completedMovieList = [];
    let hideBadgeImage = `image_tag Rails.root.join('public', 'images', 'Hidden-Badge.png')`;
    console.log(movieListIds);

    const setBadgeImage = () => {
        listData.forEach((listItem) => {
            let badgeImg = hideBadgeImage;
            let badgeId = listItem._id;
            let badgeName = listItem.name;
            if (userCompletedLists.some((listData) => listData.listId === badgeId)) {
                badgeImg = listItem.badge;
            }
            completedMovieList.push({
                src: {badgeImg},
                id: {badgeId},
                alt: {badgeName}})
        });

        setBadge(completedMovieList)
    };

    // populate all lists, if movie in users list, then show badge, if not show not badge
    return (
        <div className="card mb-3">
            <div className="flex-row justify-space-between my-4">
                <div className="col-12 col-xl-6">
                    <div className="card mb-3">
                    {badge.map(award => 
                    <img src={award.src} key={award.id} alt={award.alt} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgesPanel;