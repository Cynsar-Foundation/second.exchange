import React, { useEffect, useState } from 'react';
import { inject } from 'njct';
import { useRecoilState, useRecoilValue } from 'recoil';

import { RelayService } from '@libs/api';
import { profilePubkeyState, profilePostsState } from '@libs/application/state';
import Article from '../Article/Article.component';
import { NostrEvent } from '@libs/application/interfaces';

export const ProfileView = () => {
    const relayService: RelayService = inject('relayservice');
    const [posts, setPosts] = useState<NostrEvent[]>();
    const profilePubkey = useRecoilValue(profilePubkeyState);
    const [postsSet, setPostsSet] = useState(false);
    const [profilePosts, setProfilePosts] = useRecoilState(profilePostsState)

    const getEvents = (matchedProfile: string) => {
        relayService.sub(
            (event, relay) => {
                setProfilePosts(events => [...events, event]);
            },
            {
                authors: [matchedProfile],
                kinds: [0, 1, 3],
            },
            'main-channel',
        );
    }

    useEffect(() => {
        getEvents(profilePubkey);
    }, []);

    useEffect(() => {
        setPosts(profilePosts.filter((articleData) => articleData.pubkey === profilePubkey));
        setPostsSet(true);
    }, [profilePosts]);

    return (
        <div className='post-list'>
            { /* @ts-ignore */}
            {postsSet && posts.map(articleData => (
                <div className='post'>
                    <Article key={articleData.id} item={articleData} />
                </div>
            ))}
        </div>
    );
}
