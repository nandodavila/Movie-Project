import React, { useEffect, useState } from 'react';
import { Collapse } from 'bootstrap';


const ListPanel = ({ allMovieLists }) => {

    return (
        <div className="card mb-3">
            <div className="flex-row justify-space-between my-4">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {allMovieLists.map((movieList) => (
                        <div key={"accrd" + movieList._id} className="accordion-item">
                            <h2 key={"h2" + movieList._id} className="accordion-header" id={"h2" + movieList._id}>
                                <button key={"btn" + movieList._id} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#listFor" + movieList._id} aria-expanded="false" aria-controls={"listFor" + movieList._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                                    </svg>
                                    {movieList.name}
                                    key={"btn" + movieList._id}
                                </button>
                            </h2>
                            <div key={"listFor" + movieList._id} id={"listFor" + movieList._id} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div key={"accrdBdy" + movieList._id} className="accordion-body">
                                    <ul>
                                        {movieList.movies.map((movie) => (
                                            <li key={movieList._id + "movie" + movie.omdbId} >
                                                {movie.title} - {movie.year}
                                                key={movieList._id + "movie" + movie.omdbId}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListPanel;