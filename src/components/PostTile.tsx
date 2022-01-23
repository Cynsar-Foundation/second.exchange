import React, { FC } from 'react';

interface IProps {
    posts: any;
}

export const PostTile: FC<IProps> = ({ posts }) => {
    return(
        <div>
            <br />
            {posts.map((post: any) => (<p>{post['content']}</p>))}
        </div>
    )
}
