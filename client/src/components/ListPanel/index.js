import React, { useEffect, useState } from 'react';


const ListPanel = ({allMovieLists}) => {
    let availableMovieLists = []
    const [list, setList] = useState([]);
    useEffect(() => { setAllLists() }, [])
console.log(allMovieLists);
    const setAllLists = () => allMovieLists.forEach((movieList) => {
        let listId = movieList._id;
        let listName = movieList.name;
        let listBadge = movieList.badge;
        let listMovies = [movieList.movies];
        availableMovieLists.push({
            id: listId,
            name: listName,
            badge: listBadge,
            movies: [listMovies]
            });
            setList(availableMovieLists);
    });

    return (
        <div className="card mb-3">
            <div className="flex-row justify-space-between my-4">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {list.map((listItems) => (
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button key={listItems.id} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    <img src={listItems.badge} /> {listItems.name}
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            {list.movies.map((movieItems) => (
                                <div className="accordion-body"><ul><li key={movieItems.omdbId}>{movieItems.title} - {movieItems.year}</li></ul></div>
                            ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListPanel;