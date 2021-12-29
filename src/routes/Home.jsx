import React from "react";
import { CgProfile } from 'react-icons/cg';

import CanvasPic from '../assets/images/canvas.jpg';
import BloggingPic from '../assets/images/blogging.png';
import NFTPic from '../assets/images/nft.jpg';

export const Home = () => {
    return (
        <div className="Home">
            <div className="MainContent">
            <div className="subtitle">
                Create your community, voice collective and share wealth, <p> The first exchange was only benefitting few , lets reclaim the space of our attention and re-distribute what is ours (all of us) </p>
            </div>
            <div className="title-line">
                Create communities,<br />
                Share values,<br />
                Support your favorite creators, <br/>
            </div>
            <div className="HomeImages">
                <img className="HomeImages__item" src={CanvasPic} alt="collaborate on canvas" />
                <img className="HomeImages__item" src={BloggingPic} alt="write and publish blogs" />
                <img className="HomeImages__item" src={NFTPic} alt="trade attention" />
            </div>
            <div className="ProfileContainer">
                <CgProfile size={42} />
            </div>
            </div>
        </div>
    );
}
