import React from "react";
import { Link } from 'react-router-dom';

import PublishNFT from "../assets/images/publish-nft.svg";
import UploadBlog from "../assets/images/upload-blog.svg";
import CreateBlog from "../assets/images/create-blog.svg";
import CreateCanvas from "../assets/images/create-canvas.svg";

export const Dashboard = () => {
    return (
        <div className="DashboardContainer">
            <div className="Dashboard__col-1">
                <div className="Dashboard__col-1-row-1"></div>
                <div className="Dashboard__col-1-row-2"></div>
            </div>
            <div className="Dashboard__col-2">
                <div className="CreateSection">
                    <span className="DashboardHeading">Create</span>
                    <div className="CreateOptions">
                        <Link to='/WriteBlog' className="CreateOptions__item">
                            <span>
                                <img src={CreateBlog} alt="create-blog" />
                            </span>
                            <span className="CreateOptions__item-text">
                                Write Blog
                            </span>
                        </Link>
                        <div className="CreateOptions__item">
                            <span>
                                <img src={UploadBlog} alt="upload-blog" />
                            </span>
                            <span className="CreateOptions__item-text">
                                Upload Blog
                            </span>
                        </div>
                        <div className="CreateOptions__item">
                            <span>
                                <img src={CreateCanvas} alt="create-canvas" />
                            </span>
                            <span className="CreateOptions__item-text">
                                Build Canvas
                            </span>
                        </div>
                        <div className="CreateOptions__item">
                            <span>
                                <img src={PublishNFT} alt="publish-nft" />
                            </span>
                            <span className="CreateOptions__item-text">
                                Publish NFT
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
