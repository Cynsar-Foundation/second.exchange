import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
    generateSeedWords,
    validateWords,
    seedFromWords,
    privateKeyFromSeed,
} from "nostr-tools/nip06";
import { getPublicKey } from "nostr-tools";

import { useSessionKeyValue, useUserAuthValue } from "../context";
import { useWalletModalValue } from "../context";

const isKey = (key: any) => {
    return key?.toLowerCase()?.match(/^[0-9a-f]{64}$/);
};

const isKeyValid = (key: any) => {
    if (isKey(key)) return true;
    if (validateWords(key.toLowerCase())) return true;
    return false;
};

const refreshPage = () => {
    window.location.reload();
};

const clearLocalStorage = () => {
    localStorage.removeItem("user-auth");
};

export const KeyAuthModal = () => {
    const [userMnemonic, setUserMnemonic] = useState<string>();
    const [userPublicKey, setUserPublicKey] = useState<string>();
    const [userPrivateKey, setUserPrivateKey] = useState<string>();
    const [isKeyValidated, setIsKeyValidated] = useState(false);

    const { sessionKey, setSessionKey } = useSessionKeyValue();
    const { walletOverlayActive, setWalletOverlayActive } =
        useWalletModalValue();
    const { isUserAuthenticated, setIsUserAuthenticated } = useUserAuthValue();

    function toHexString(byteArray: Uint8Array) {
        return Array.from(byteArray, function (byte) {
            return ("0" + (byte & 0xff).toString(16)).slice(-2);
        }).join("");
    }

    var userEnteredKey = "";

    const generateKeys = () => {
        const mnemonic = generateSeedWords();
        const seed = seedFromWords(mnemonic);
        const privKey = privateKeyFromSeed(seed);
        const pubKey = toHexString(getPublicKey(privKey));
        userEnteredKey !== '' ? setUserMnemonic(userEnteredKey) : setUserMnemonic(mnemonic);
        setUserPrivateKey(privKey);
        setUserPublicKey(pubKey);
        setSessionKey({ mnemonic: mnemonic, privKey: privKey, pubKey: pubKey });
        return [privKey, pubKey];
    };

    useEffect(() => {
        localStorage.setItem("user-auth", JSON.stringify(sessionKey));
    }, [sessionKey]);

    return (
        <div className="wallet-modal__top-level">
            <div className="wallet-modal__container">
                <button
                    className="wallet-modal__close-button"
                    onClick={() => setWalletOverlayActive(!walletOverlayActive)}
                >
                    <IoCloseOutline size={25} />
                </button>
                <div className="wallet-modal__header">
                    <div className="wallet-modal__title">
                        {!isUserAuthenticated
                            ? "Getting Started"
                            : "Logout and Clear"}
                    </div>
                </div>
                <hr />
                {!isUserAuthenticated ? (
                    <div className="key-setup">
                        <div className="key-setup__title">Key Setup</div>
                        Enter your nostr key or generate new
                        <div className="key-setup__input">
                            <input
                                className="key-setup__input-box"
                                type="text"
                                onChange={(e) => {
                                    if (e.target.value.length === 15) {
                                        if (isKeyValid(e.target.value)) {
                                            userEnteredKey = e.target.value;
                                            generateKeys();
                                            setIsKeyValidated(true);
                                        }
                                    }
                                }}
                            />
                        </div>
                        <button
                            className="key-setup__generate-button"
                            onClick={() => {
                                generateKeys();
                                setIsKeyValidated(true);
                            }}
                        >
                            Generate
                        </button>
                        <button
                            className="key-setup__proceed"
                            disabled={!isKeyValidated}
                            onClick={() => {
                                setIsUserAuthenticated(true);
                                // This is a hack
                                refreshPage();
                            }}
                        >
                            Enter
                        </button>
                        {(isKeyValidated || userEnteredKey !== "") && (
                            <div className="key-setup__generated-key">
                                <hr />
                                <div className="key-setup__generated-key-title">
                                    Copy and save these keys safe!
                                </div>
                                <span className="key-setup__generated-key-value">
                                    <span className="key-setup__generated-key-tag">
                                        Your seed
                                    </span>{" "}
                                    <br />
                                    {/* Need to add these in a copy text block */}
                                    {userMnemonic} <br />
                                    <span className="key-setup__generated-key-tag">
                                        Your private key
                                    </span>{" "}
                                    <br />
                                    {userPrivateKey} <br />
                                    <span className="key-setup__generated-key-tag">
                                        Your public key
                                    </span>{" "}
                                    <br />
                                    {userPublicKey}
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="delete-local-storage">
                        <div className="delete-local-storage__title">
                            Delete Local Storage
                        </div>
                        <div>Doing this will log you out</div>
                        <button
                            className="delete-local-storage__button"
                            onClick={() => {
                                clearLocalStorage();
                                refreshPage();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
                <hr />
            </div>
        </div>
    );
};
