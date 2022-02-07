/* eslint-disable react-hooks/exhaustive-deps */
// import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";

import { relayPool } from "../external/nostr-tools";
import { PostTile } from "./PostTile";

export const UserCollection = () => {
    const initialRelayState = {
        pool: relayPool(),
    };
    // @ts-ignore
    var following: [] | [string] = [
        "3cc926bad81f4128b7c5d08e49a1025e0120d32b79285fd3f9b70fa2404992e5",
    ];
    let events: [] = [];
    let eventsSet = new Set();
    var mainSub = initialRelayState;
    function restartMainSubscription() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mainSub = initialRelayState.pool.sub(
            {
                filter: [
                    {
                        authors: following,
                        kinds: [0, 1, 3],
                    },
                ],
                cb: async (event: any) => {
                    switch (event.kind) {
                        case 1:
                            if (eventsSet.has(event.id)) return;
                            eventsSet.add(event.id);
                            // manual sorting
                            // newer events first
                            for (let i = 0; i < events.length; i++) {
                                //@ts-ignore
                                if (event.created_at > events[i].created_at) {
                                    // the new event is newer than the current index,
                                    // so we add it at the previous index
                                    // @ts-ignore
                                    events.splice(i, 0, event);
                                    return;
                                }
                            }
                            // the newer event is the oldest, add to end
                            // @ts-ignore
                            events.push(event);
                            return;
                    }
                },
            },
            "main-channel"
        );
    }

    const [posts, setPosts] = useState([]);
    const [showPosts, setShowPosts] = useState(false);

    useEffect(() => {
        initialRelayState.pool.setPrivateKey(
            // @ts-ignore
            JSON.parse(localStorage.getItem("user-auth"))["privKey"]
        );
        initialRelayState.pool.addRelay("wss://relayer.fiatjaf.com", {
            read: true,
            write: true,
        });
        initialRelayState.pool.addRelay("wss://nostr-pub.wellorder.net", {
            read: true,
            write: true,
        });
        restartMainSubscription();
        setPosts(events);
    }, []);

    return (
        <div>
            <br />
            Followed user: {following[0]}
            <br />
            <button
                onClick={() => {
                    if (posts.length > 0) setShowPosts(!showPosts);
                }}
            >
                {showPosts ? "Hide Posts" : "Show Posts"}
            </button>
            {/* @ts-ignore */}
            {showPosts && <PostTile posts={posts} />}
        </div>
    );
};
