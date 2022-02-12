import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../../utils/queries';

const BadgesPanel = ({ allMovieLists }) => {

    const [badge, setBadge] = useState([]);
    const { loading, data } = useQuery(GET_ME);

    //if data loads, run this again
    // useEffect(() => { setBadgeImage() }, [data]);
    useEffect(() => { setBadgeImage(); console.log("3I DID IT!!!!") }, [allMovieLists]);

    // const userCompletedLists = data?.me.completedLists || [];
    let hideBadgeImage = `/images/badges/Hidden-Badge.png`;
    let completedMovieList = [];

    //--- to remove ---
    const justinFixYoStuff = {
        "username": "corher",
        "email": "corher@att.net",
        "password": "jebus1",
        "quizHighScore": 1,
        "totalWatchedHours": 1,
        "watchedMovies": [{
            "_id": "620467712468f33fe04f0c7b",
            "title": "The Three Amigos",
            "year": "2003",
            "omdbId": "tt0301934",
            "isWatched": true
        }],
        "completedLists": [
            { "_id": "62048d3f859bc13208e87eea" }
        ]
    };
    const userCompletedLists = justinFixYoStuff.completedLists || [];
    //--- end ---

    const setBadgeImage = () => {
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
        <div className="badgesForUser">
            <div className="badgeIcon">
                {badge.map(award =>
                    <div key={"div" + award.id} className="listBadge mb-3">
                        <img key={"ing" + award.id} src={process.env.PUBLIC_URL + award.src} alt={award.alt} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BadgesPanel;