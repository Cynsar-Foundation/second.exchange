import './AuthModal.style.scss';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import {
    generateSeedWords,
    validateWords,
    seedFromWords,
    privateKeyFromSeed,
} from '../../external/nostr-tools/nip06';
import { getPublicKey } from '../../external/nostr-tools';
import { useRecoilState } from 'recoil';

import { UserKeyModal } from '../UserKeyModal/UserKeyModal';
import { sessionKeyState, userAuthState, authModalState } from 'src/application/state';
import { Button, Modal } from 'antd';

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
    localStorage.removeItem('user-auth');
};

export const KeyAuthModal = () => {
    const [userMnemonic, setUserMnemonic] = useState<string>();
    const [userPublicKey, setUserPublicKey] = useState<string>();
    const [userPrivateKey, setUserPrivateKey] = useState<string>();
    const [isKeyValidated, setIsKeyValidated] = useState(false);
    const [keyModalVisible, setKeyModalVisible] = useState(false)

    const [ sessionKey, setSessionKey ] = useRecoilState(sessionKeyState);
    const [ isUserAuthenticated, setIsUserAuthenticated ] = useRecoilState(userAuthState);
    const [ localKey, setLocalKey] = useState();

    const [authModalActive, setAuthModalActive ] = useRecoilState(authModalState);

    function toHexString(byteArray: Uint8Array) {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xff).toString(16)).slice(-2);
        }).join('');
    }

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        let seed;
        if (userMnemonic !== null) {
            seed = seedFromWords(userMnemonic);
            setUserPrivateKey(privateKeyFromSeed(seed));
        }
    }, [userMnemonic, userPrivateKey]);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (userPrivateKey !== undefined)
            setUserPublicKey(toHexString(getPublicKey(userPrivateKey)));
    }, [userPrivateKey]);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (isUserAuthenticated) {
            if(!localStorage.getItem('user-auth'))
                    localStorage.setItem('user-auth', JSON.stringify(localKey));
        }
    }, [isUserAuthenticated, sessionKey]);

    const userInput = useRef<HTMLInputElement>();
    // @ts-ignore
    const clearInput = () => (userInput.current.value = '');
    // @ts-ignore
    const dispalyMnemonic = (mnemonic: string | '') => (userInput.current.value = mnemonic);

    useEffect(() => {
        if (!isUserAuthenticated) {
            dispalyMnemonic(userMnemonic ? userMnemonic : '');
        }
    }, [isUserAuthenticated, userMnemonic]);

    const handleOk = () => {
        setAuthModalActive(false);
    };

    const handleCancel = () => {
        setAuthModalActive(false);
    };

    const handleDelete = () => {
        clearLocalStorage();
        refreshPage();
    }

    const handleProceed = () => {
        setSessionKey({
            //@ts-ignore
            mnemonic: userMnemonic,
            privKey: userPrivateKey,
            pubKey: userPublicKey,
        });
        setLocalKey({
            //@ts-ignore
            mnemonic: userMnemonic,
            privKey: userPrivateKey,
            pubKey: userPublicKey,
        });
        setKeyModalVisible(true);
    }

    const handleReset = () => {
        clearInput();
    }

    const handleGenerate = () => {
        setUserMnemonic(generateSeedWords());
        setIsKeyValidated(true);
    }

    const modalButtons = [
        <div>
            {isUserAuthenticated ? (
                <Button
                    key="delete"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            ) : (
                <div>
                    <Button
                        key="generate"
                        onClick={handleGenerate}
                    >
                        Generate
                    </Button>
                    <Button
                        key="reset"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        key="proceed"
                        onClick={handleProceed}
                        disabled={!isKeyValidated}
                    >
                        Proceed
                    </Button>
                </div>
            )}
        </div>
    ]

    return (
        <div className="wallet-modal__top-level">
            <Modal 
                title={isUserAuthenticated 
                    ? "Logout and Clear" 
                    : "Getting Started"} 
                visible={authModalActive} /*onOk={handleOk}*/ 
                onCancel={handleCancel}
                footer={modalButtons}
            >
                {!isUserAuthenticated ? (
                    <div className="key-setup__container">
                        <div className='key-setup__title'>Key Setup</div>
                        <div className='key-setup__subtitle'>Enter your nostr key or generate new</div>
                        <div className="key-setup__input">
                            {/* @ts-ignore */}
                            <input ref={userInput}
                                placeholder="Enter Key"
                                defaultValue={userMnemonic || ''}
                                className="key-setup__input-box"
                                type="text"
                                onChange={(event: any) => {
                                    if (event.target.value.split(' ').length === 12) {
                                        if (isKeyValid(event.target.value)) {
                                            setUserMnemonic(event.target.value);
                                            setIsKeyValidated(true);
                                        }
                                    }
                                    else {
                                        setIsKeyValidated(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="delete-storage__body">
                        <p className="delete-storage__title">Delete Local Storage</p>
                        <p className="delete-storage__info">Are you sure you want to logout? Doing this 
                        will delete your keys from the browser and log you out</p>
                    </div>
                )}
            </Modal>
            {keyModalVisible && <UserKeyModal fromLandingPage={true} generatedKeys={localKey} toExecute={setIsUserAuthenticated} />}
        </div>
    );
};
