/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import { EDITOR_JS_TOOLS } from "../constants/editor-constants";
import { createReactEditorJS } from "react-editor-js";
import { relayPool } from '../external/nostr-tools';

const ReactEditorJS = createReactEditorJS();

export const BlogEditor = () => {
  const editorCore = React.useRef(null);

  const initialRelayState = {
    pool: relayPool(),
  };
  // @ts-ignore
  const pubKey = JSON.parse(localStorage.getItem('user-auth'))['pubKey'];
  var following: [] | [string] = ['ce597b3f0057916aa991dcfc6eb0503cef523927a2d8819292423d4f9f3031a0']
  var mainSub = initialRelayState;
  function restartMainSubscription() {
    mainSub = initialRelayState.pool.sub(
      {
        filter: [
          // notes, profiles and contact lists of people we follow (and ourselves)
          {
            kinds: [0, 1, 2, 3],
            authors: following.concat(pubKey)
          },

          // posts mentioning us and direct messages to us
          {
            kinds: [1, 4],
            '#p': [pubKey]
          },

          // our own direct messages to other people
          {
            kinds: [4],
            authors: [pubKey]
          }
        ],
        cb: async (event: any, relay: any) => {
          //              store.dispatch('addEvent', {event, relay})
          console.log(following);
        }
      },
      'main-channel'
    )
  }

  useEffect(() => {
    console.log("FROM HERE")
    // @ts-ignore
    initialRelayState.pool.setPrivateKey(JSON.parse(localStorage.getItem('user-auth'))['privKey'])
    initialRelayState.pool.addRelay("wss://relayer.fiatjaf.com", { read: true, write: true });
    initialRelayState.pool.addRelay("wss://nostr-pub.wellorder.net", { read: true, write: true });
    restartMainSubscription();
  }, []);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async () => {
    //@ts-ignore
    const savedData = await editorCore.current.save();
    //@ts-ignore
    let event = await initialRelayState.pool.publish({
      // @ts-ignore
      pubkey: JSON.parse(localStorage.getItem('user-auth'))['pubKey'],
      created_at: Math.floor(Date.now() / 1000),
      kind: 1,
      tags: [],
      content: JSON.stringify(savedData)
    });
    console.log("From BlogEditor", event);
  }, []);

  return (
    <div className="blog-editor-container">
      {/* @ts-ignore */}
      <ReactEditorJS onInitialize={handleInitialize} instanceRef={(instance) => (instanceRef.current = instance)}
        tools={EDITOR_JS_TOOLS}
        i18n={{
          messages: {},
        }}
        data={{
          time: 1556098174501,
          blocks: [
            {
              type: "header",
              data: {
                text: "Editor.js",
                level: 2
              }
            }
          ]
        }}
      />

      <button
        className="blog-ops-button"
        onClick={handleSave}
      >
        Save!
      </button>
    </div>
  );
};
