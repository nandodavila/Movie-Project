import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import { GET_ME } from '../../utils/queries';

const BadgesPanel = ({ allMovieLists }) => {
    // componentWillMount() {
    //     this.querySubscription = this.apollo
    //         .watchQuery({
    //             query: GET_ME,
    //         })
    //         .valueChanges.subscribe(({ data }) => {
    //             this.badge = data.completedLists.badge;
    //         });
    // };
    
    const [badge, setBadge] = useState([]);
    const [user, setUser] = useState(null);
    const { loading, error, data } = useQuery(GET_ME
        , {
        onCompleted: (data) => {
            console.log("onCompleted: found a user")
            console.log(data);
            setUser(data)
            setBadgeImage();
        },}
      );

    //if data loads, run this again
    useEffect(() => {
        if (data && !loading) {
          setBadgeImage();
        }
    }, [allMovieLists, data, loading]);

    let hideBadgeImage = `/images/badges/Hidden-Badge.png`;
    let completedMovieList = [];
    const setBadgeImage = () => {
        console.log("--start badge list--")
        let userCompletedLists = [];
        if (data) {
            console.log("found a user")
            userCompletedLists = data.me.completedLists;
            console.log(userCompletedLists)
        } else {
            console.error("user list not found")
        }
        allMovieLists.forEach((listItem) => {
            let badgePopulateImg = hideBadgeImage;
            let badgePopulateId = listItem._id;
            let badgePopulateName = listItem.name;
            if (data && (userCompletedLists.some((listData) => listData._id === badgePopulateId))) {
                badgePopulateImg = listItem.badge;
                //save into db (on watch) pull in against user
            }
            completedMovieList.push({
                src: badgePopulateImg,
                id: badgePopulateId,
                alt: badgePopulateName
            })
        });
        
        console.log(completedMovieList)
        setBadge(completedMovieList);
        console.log("----end----")
    };


    // if (loading) {
    //     return 'Loading...';
    // }

    // if (error) {
    //     return `Error! ${error.message}`;
    // }

    // if (data) {
    //     setBadgeImage();
    // }

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