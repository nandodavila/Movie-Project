import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import { GET_ME } from '../../utils/queries';

const BadgesPanel = ({ allMovieLists }) => {
    const [badge, setBadge] = useState([]);
    const [user, setUser] = useState(null);
    const { loading, data } = useQuery(GET_ME, {
        onCompleted: (data) => {
            setUser(data.me)
        },
    });

    //if data loads, run this again
    useEffect(() => {setBadgeImage();}, [allMovieLists, user]);

    let hideBadgeImage = `/images/badges/Hidden-Badge.png`;
    let completedMovieList = [];
    const setBadgeImage = () => {
        let userCompletedLists = [];
        if (user) {
            userCompletedLists = user.completedLists;
            console.log(userCompletedLists)
        } else {
            console.log("user list not found")
        }
        allMovieLists.forEach((listItem) => {
            let badgePopulateImg = hideBadgeImage;
            let badgePopulateId = listItem._id;
            let badgePopulateName = listItem.name;
            if (user && (userCompletedLists.some((listData) => listData._id === badgePopulateId))) {
                badgePopulateImg = listItem.badge;
                //save into db (on watch) pull in against user
            }
            completedMovieList.push({
                src: badgePopulateImg,
                id: badgePopulateId,
                alt: badgePopulateName
            })
        });   
        setBadge(completedMovieList);
    };

    // populate all lists, if movie in users list, then show badge, if not show not badge
    return (

        <div className="badgesForUser ms-auto">
            {badge.map(award =>
                <div key={"div" + award.id} className="listBadge m-3">
                    <img key={"img" + award.id} src={process.env.PUBLIC_URL + award.src} alt={award.alt} />
                </div>
            )}
        </div>
    );
};

export default BadgesPanel;