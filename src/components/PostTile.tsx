import React, { FC } from 'react';

interface IProps {
    posts: any;
}

export const PostTile: FC<IProps> = ({ posts }) => {
    console.log(posts ? posts : "loading");
    return(
        <div>
            {posts.map((post: any) => (<h1>{post['content']}</h1>))}
        </div>
    )
}