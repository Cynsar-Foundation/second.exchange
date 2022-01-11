import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
    generateSeedWords,
    validateWords,
    seedFromWords,
    privateKeyFromSeed,
} from "nostr-tools/nip06";
import { getPublicKey } from "nostr-tools";

import { useSessionKeyContext, useUserAuthContext } from "../context";
import { useAuthModalContext } from "../context";
import { UserKeyModal } from "./UserKeyModal";

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
    const [keyModalVisible, setKeyModalVisible] = useState(false);

    const { sessionKey, setSessionKey } = useSessionKeyContext();
    const { setAuthOverlayActive } = useAuthModalContext();
    const { isUserAuthenticated, setIsUserAuthenticated } = useUserAuthContext();

    function toHexString(byteArray: Uint8Array) {
        return Array.from(byteArray, function (byte) {
            return ("0" + (byte & 0xff).toString(16)).slice(-2);
        }).join("");
    }

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if(firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        var seed;
        if(userMnemonic !== null)
        {
            seed = seedFromWords(userMnemonic);
            setUserPrivateKey(privateKeyFromSeed(seed));
        }
    }, [userMnemonic, userPrivateKey]);

    useLayoutEffect(() => {
        if(firstUpdate.current) {
            firstUpdate.current = false;
            return;
       }

        if(userPrivateKey !== undefined)
            setUserPublicKey(toHexString(getPublicKey(userPrivateKey)));
    }, [userPrivateKey]);

    useLayoutEffect(() => {
        if(firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if(isUserAuthenticated)
        {
            localStorage.setItem("user-auth", JSON.stringify(sessionKey));
        }
    }, [isUserAuthenticated, sessionKey]);

    const userInput = useRef<HTMLInputElement>();
    // @ts-ignore
    const clearInput = () => (userInput.current.value = "");
    // @ts-ignore
    const dispalyMnemonic = (mnemonic: string | "") => (userInput.current.value = mnemonic)

    useEffect(() => {
        if(!isUserAuthenticated)
        {
            dispalyMnemonic(userMnemonic ? userMnemonic : "");
        }
    }, [isUserAuthenticated, userMnemonic])

    return (
        <div className="wallet-modal__top-level">
            { !keyModalVisible && <div className="wallet-modal__container">
                <button
                    className="wallet-modal__close-button"
                    onClick={() => setAuthOverlayActive(false)}
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
                            {/* @ts-ignore */}
                            <input ref={userInput}
                                defaultValue={userMnemonic || ""}
                                className="key-setup__input-box"
                                type="text"
                                onChange={(e) => {
                                    if(e.target.value.split(' ').length === 12) {
                                        if (isKeyValid(e.target.value)) {
                                            setUserMnemonic(e.target.value);
                                            setIsKeyValidated(true);
                                        }
                                    }
                                    else {
                                        setIsKeyValidated(false);
                                    }
                                }}
                            />
                        </div>
                        <button
                            className="key-setup__generate-button"
                            onClick={() => {
                                setUserMnemonic(generateSeedWords());
                                setIsKeyValidated(true);
                            }}
                        >
                            Generate
                        </button>
                        <button
                            className="key-setup__proceed"
                            disabled={!isKeyValidated}
                            onClick={() => {
                                setSessionKey({
                                    mnemonic: userMnemonic,
                                    privKey: userPrivateKey,
                                    pubKey: userPublicKey,
                                });
                                setKeyModalVisible(true);
                            }}
                        >
                            Proceed
                        </button>
                        <button
                            className="key-setup__proceed"
                            onClick={() => {
                                clearInput();
                            }}
                        >
                            Reset
                        </button>
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
            </div>}
            { keyModalVisible && <UserKeyModal fromLandingPage={true} generatedKeys={sessionKey} toExecute={setIsUserAuthenticated} /> }
        </div>
    );
};
