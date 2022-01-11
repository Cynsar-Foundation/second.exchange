import React from "react";
import { IoCloseOutline } from "react-icons/io5";

import { useSessionKeyValue } from "../context";
import { useKeyModalValue } from "../context";

export const UserKeyModal = () => {
    const { sessionKey } = useSessionKeyValue();
    // @ts-ignore
    const parsedSessionKey = JSON.parse(sessionKey);

    // @ts-ignore
    const userMnemonic = parsedSessionKey["mnemonic"];
    // @ts-ignore
    const userPrivateKey = parsedSessionKey["privKey"];
    // @ts-ignore
    const userPublicKey = parsedSessionKey["pubKey"];

    const { setKeyOverlayActive } = useKeyModalValue();

    return (
        <div className="wallet-modal__top-level">
            <div className="wallet-modal__container">
                {console.log(sessionKey)}
                <button
                    className="wallet-modal__close-button"
                    onClick={() => setKeyOverlayActive(false)}
                >
                    <IoCloseOutline size={25} />
                </button>
                <div className="wallet-modal__header">
                    <div className="wallet-modal__title">
                        Your Keys
                    </div>
                    <hr />
                </div>
                <div className="key-modal__body">
                <div className="key-modal__subtitle">
                    Make sure you back up your private key!
                </div>
                <div className="key-modal__info">
                    Posts are published using your private key. 
                    Others can see your posts or follow you using only your public key.
                </div>
                <div className="key-setup__generated-key">
                    <span className="key-setup__generated-key-value">
                        <span className="key-setup__generated-key-tag">
                            Seed Words
                        </span>{" "}
                        <br />
                        {/* Need to add these in a copy text block */}
                        {userMnemonic} <br />
                        <span className="key-setup__generated-key-tag">
                            Private key
                        </span>{" "}
                        <br />
                        {userPrivateKey} <br />
                        <span className="key-setup__generated-key-tag">
                            Public key
                        </span>{" "}
                        <br />
                        {userPublicKey}
                    </span>
                </div>
                </div>
                <hr />
                </div>
            </div>
    );
};
