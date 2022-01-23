/* eslint-disable react-hooks/exhaustive-deps */
// import { Col, Row } from "antd";
import { useEffect } from "react";

import { relayPool } from "../external/nostr-tools";
import { PostTile } from './PostTile';

export const UserCollection = () => {

    const initialRelayState = {
        pool: relayPool(),
      };
    // @ts-ignore
//     const pubKey = JSON.parse(localStorage.getItem("user-auth"))["pubKey"];
    var following: [] | [string] = [
        "3cc926bad81f4128b7c5d08e49a1025e0120d32b79285fd3f9b70fa2404992e5",
    ];
    let events: [] = []
    let eventsSet = new Set()
    var mainSub = initialRelayState;
    function restartMainSubscription() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mainSub = initialRelayState.pool.sub(
            {
                filter: [
                  {
                    authors: following,
                    kinds: [0, 1, 3]
                  }
                ],
                cb: async (event: any) => {
                  switch (event.kind) {
                    case 0:
//                      await this.$store.dispatch('addEvent', event)
                      return
      
                    case 1:
                      if (eventsSet.has(event.id)) return
                      eventsSet.add(event.id)
      
                      // manual sorting
                      // newer events first
                      for (let i = 0; i < events.length; i++) {
                          //@ts-ignore
                        if (event.created_at > events[i].created_at) {
                          // the new event is newer than the current index,
                          // so we add it at the previous index
                          // @ts-ignore
                          events.splice(i, 0, event)
                          return
                        }
                      }
      
                      // the newer event is the oldest, add to end
                      // @ts-ignore
                      events.push(event)
                      return
                  }
                }
              },
            "main-channel"
        );
    }
    useEffect(() => {
        // @ts-ignore
        initialRelayState.pool.setPrivateKey(JSON.parse(localStorage.getItem('user-auth'))['privKey'])
        initialRelayState.pool.addRelay("wss://relayer.fiatjaf.com", { read: true, write: true });
        initialRelayState.pool.addRelay("wss://nostr-pub.wellorder.net", { read: true, write: true });
        restartMainSubscription();
    });

    // const userData = [
    //     {
    //         Name: "BORED APE #0",
    //         Image: "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    //     },
    //     {
    //         Name: "BORED APE #1",
    //         Image: "https://ipfs.io/ipfs/QmcJYkCKK7QPmYWjp4FD2e3Lv5WCGFuHNUByvGKBaytif4",
    //     },
    //     {
    //         Name: "BORED APE #2",
    //         Image: "https://ipfs.io/ipfs/QmSg9bPzW9anFYc3wWU5KnvymwkxQTpmqcRSfYj7UmiBa7",
    //     },
    //     {
    //         Name: "BORED APE #3",
    //         Image: "https://ipfs.io/ipfs/QmWBgfBhyVmHNhBfEQ7p1P4Mpn7pm5b8KgSab2caELnTuV",
    //     },
    //     {
    //         Name: "BORED APE #4",
    //         Image: "https://ipfs.io/ipfs/QmW1MBApm4XvwgoSKf45ZtsqJU5cDYdcsW2GBSEUqXWE3T",
    //     },
    //     {
    //         Name: "BORED APE #5",
    //         Image: "https://ipfs.io/ipfs/QmeiZs7AWji15fpwTH6fqpZCBSpZpLg8Xn8UKrt4NVkB2y",
    //     },
    //     {
    //         Name: "BORED APE #6",
    //         Image: "https://ipfs.io/ipfs/QmfNyXX3x7HYBpbJseB3pDFvV1W456tYjXxqdsba7WrEuU",
    //     },
    //     {
    //         Name: "BORED APE #7",
    //         Image: "https://ipfs.io/ipfs/QmSdGMvowFxFFHJr3EajE8RNsPpPyKd5mh4yNaZZegPYqn",
    //     },
    //     {
    //         Name: "BORED APE #8",
    //         Image: "https://ipfs.io/ipfs/QmadJMqL3WWr7SdtXzNUEvusy9o3uxedTbCuXNFHQxpsNZ",
    //     },
    // ];
    return (
        // <Row justify="center">
        //     <Col xxl={22} xl={22} md={22} sm={24} xs={24}>
        //         <Row gutter={20} className="user-collection">
        //             {userData.map((data) => {
        //                 return (
        //                     <Col xxl={4} xl={4} lg={4} md={4} sm={24} xs={24}>
        //                         <img
        //                             className="user-collection-img"
        //                             src={data.Image}
        //                             alt={data.Name}
        //                         />
        //                     </Col>
        //                 );
        //             })}
        //         </Row>
        //     </Col>
//         </Row>
        <div>Hello
            here are the events
            <br />
            <PostTile posts={events} />
        </div>
    );
};
