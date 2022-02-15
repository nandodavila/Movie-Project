import React from "react";
import { Link } from "react-router-dom";

const Carousel = () => {

    return (
        <div id="carouselExampleCaptions" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div classNameName="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={process.env.PUBLIC_URL + "/images/FauxTrilogy.png"} className="d-block w-100" alt="Clerks, Mall Rats, Scream 3 Trilogy"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Make your own Trilogies</h5>
                            <p>Pursue your theories in unofficial trilogies or lists that all happen in the same world</p>
                        </div>
                </div>
                <div className="carousel-item">
                    <img src={process.env.PUBLIC_URL + "/images/CheckList.PNG"} className="d-block w-100" alt="Check List for Movies"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Track all the movies you've watched</h5>
                            <p>As you watch movies, check them off </p>
                        </div>
                </div>
                <div className="carousel-item">
                    <img src={process.env.PUBLIC_URL + "/images/BadgesToEarn.PNG"} className="d-block w-100" alt="Badges to be scratched"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Collect badges</h5>
                            <p>As you complete lists, you collect badges for each achievement</p>
                        </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;