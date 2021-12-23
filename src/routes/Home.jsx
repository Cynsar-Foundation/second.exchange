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
                DECENTRALIZED BLOGGING AND NFT PLATFORM
            </div>
            <div className="title-line">
                Publish blogs,<br />
                Buy and sell as NFTs,<br />
                Support your favorite creators.
            </div>
            <div className="HomeImages">
                <img className="HomeImages__item" src={CanvasPic} alt="collaborate on canvas" />
                <img className="HomeImages__item" src={BloggingPic} alt="write and publish blogs" />
                <img className="HomeImages__item" src={NFTPic} alt="trade NFTs" />
            </div>
            <div className="ProfileContainer">
                <CgProfile size={42} />
            </div>
            </div>
        </div>
    );
}
