import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { 
    generateSeedWords, 
    validateWords, 
    seedFromWords,
    privateKeyFromSeed } from 'nostr-tools/nip06';
import { getPublicKey } from 'nostr-tools';

import { useUserAuthValue } from "../context";
import { useWalletModalValue } from "../context";

const isKey = (key: any) => {
    return key?.toLowerCase()?.match(/^[0-9a-f]{64}$/)
}

const isKeyValid = (key: any) => {
    if(isKey(key)) return true;
    if(validateWords(key.toLowerCase())) return true;
    return false;
}

const refreshPage = () => {
    window.location.reload();
}

const clearLocalStorage = () => {
    localStorage.removeItem('user-auth');
}

export const KeyAuthModal = () => {
    const [userKey, setUserKey] = useState<string>();
    const [isKeyValidated, setIsKeyValidated] = useState(false);
    const [keys, setKeys] = useState<any>(null);

    const { walletOverlayActive, setWalletOverlayActive } =
        useWalletModalValue();
    const { isUserAuthenticated, setIsUserAuthenticated} = useUserAuthValue();
    var sessionKeys: any;

    function ab2str(buf: any) {
        return Buffer.from(buf).toString('utf-8');
      }

    const generateKeys = async () => {
        const mnemonic = generateSeedWords();
        const seed = seedFromWords(mnemonic);
        const privKey = privateKeyFromSeed(seed);
        const pubKey = await getPublicKey(privKey);
        sessionKeys = { "mnemonic": mnemonic, "privKey": privKey, "pubKey": pubKey }
        console.log(sessionKeys);
        console.log("Public Key: ", pubKey);
        var pkey = JSON.parse(JSON.stringify(pubKey))
        var values = Object.keys(pkey).map(function(key){
            return pkey[key];
        });
        console.log("Converted Public Key: ", ab2str(values));
        setKeys(sessionKeys);
    }

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
                    <div className="wallet-modal__title">{ !isUserAuthenticated ? "Getting Started" : "Logout and Clear"}</div>
                </div>
                <hr />
                { !isUserAuthenticated ? <div className="key-setup">
                    <div className="key-setup__title">Key Setup</div>
                    Enter your nostr key or generate new
                    <div className="key-setup__input">
                        <input 
                            className="key-setup__input-box" 
                            type="text" 
                            onChange={e => {
                                if(e.target.value.length === 15)
                                {
                                    if(isKeyValid(e.target.value))
                                    {
                                        setUserKey(e.target.value)
                                        setIsKeyValidated(true);
                                    }
                                }
                            }}
                        />
                    </div>
                    <button 
                        className="key-setup__generate-button"
                        onClick={() => {
                            setUserKey(generateSeedWords());
                            setIsKeyValidated(true);
                        }}
                    >
                        Generate
                    </button>
                    <button 
                        className="key-setup__proceed"
                        disabled={!isKeyValidated}
                        onClick={() => {
                            generateKeys();
                            localStorage.setItem('user-auth', JSON.stringify(keys));
                            setIsUserAuthenticated(true);
                            // This is a hack
                        }}
                    >
                        Enter
                    </button>
                    {(isKeyValidated && userKey !== '') && (
                        <div className="key-setup__generated-key">
                            Copy and save this key safe!
                            <span className="key-setup__generated-key-value">
                                {userKey}
                            </span>
                        </div>
                    )}
                </div>
                :
                <div className="delete-local-storage">
                    <div className="delete-local-storage__title">Delete Local Storage</div>
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
                    <button onClick={() => {console.log(JSON.stringify(sessionKeys))}}>try</button>
                </div>}
                <hr />
            </div>
        </div>
    );
};
