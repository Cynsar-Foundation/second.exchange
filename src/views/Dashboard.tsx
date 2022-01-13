import React, { FC } from "react";
import { Link } from 'react-router-dom';

import PublishNFT from "../assets/images/publish-nft.svg";
import UploadBlog from "../assets/images/upload-blog.svg";
import CreateBlog from "../assets/images/create-blog.svg";
import CreateCanvas from "../assets/images/create-canvas.svg";
import ReadBlog from '../assets/images/read-blog.svg';

export const Dashboard: FC = () => {
    // When on custom domain change Link's "to" value to '/WriteBlog'
    return (
        <div className="dashboard-container">
            <div className="dashboard__col-1">
                <div className="dashboard__col-1-row-1"></div>
                <div className="dashboard__col-1-row-2"></div>
            </div>
            <div className="dashboard__col-2">
                <div className="create-section">
                    <span className="dashboard-heading">Create</span>
                    <div className="create-options">
                        <Link to='/second.exchange/write' className="create-options__item">
                            <span>
                                <img src={CreateBlog} alt="create-blog" />
                            </span>
                            <span className="create-options__item-text">
                                Write Blog
                            </span>
                        </Link>
                        <div className="create-options__item">
                            <span>
                                <img src={UploadBlog} alt="upload-blog" />
                            </span>
                            <span className="create-options__item-text">
                                Upload Blog
                            </span>
                        </div>
                        <div className="create-options__item">
                            <span>
                                <img src={CreateCanvas} alt="create-canvas" />
                            </span>
                            <span className="create-options__item-text">
                                Build Canvas
                            </span>
                        </div>
                        <div className="create-options__item">
                            <span>
                                <img src={PublishNFT} alt="publish-nft" />
                            </span>
                            <span className="create-options__item-text">
                                Publish NFT
                            </span>
                        </div>
                        <Link to='/second.exchange/read' className="create-options__item">
                            <div className="create-options__item">
                                <span>
                                    <img src={ReadBlog} alt="read-blog" />
                                </span>
                                <span className="create-options__item-text">
                                    Read blog
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
