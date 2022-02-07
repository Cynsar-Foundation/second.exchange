import './UserKeyModal.style.scss';

import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Modal } from 'antd';

import { keyModalState } from 'src/application/state';
import { sessionKeyState } from 'src/application/state';

interface IProps {
    fromLandingPage?: boolean;
    generatedKeys?: any;
    toExecute?: any;
}

export const UserKeyModal: FC<IProps> = ({
    fromLandingPage = false,
    generatedKeys,
    toExecute,
}) => {
    const [sessionKey, setSessionKey] = useRecoilState(sessionKeyState);
    const [keyModalActive, setKeyModalActive] = useRecoilState(keyModalState);

    var parsedSessionKey;
    fromLandingPage
        ? (parsedSessionKey = generatedKeys)
        : // @ts-ignore
        (parsedSessionKey = JSON.parse(sessionKey));
    // @ts-ignore
    const userMnemonic = parsedSessionKey['mnemonic'];
    // @ts-ignore
    const userPrivateKey = parsedSessionKey['privKey'];
    // @ts-ignore
    const userPublicKey = parsedSessionKey['pubKey'];

    const refreshPage = () => {
        window.location.reload();
    };

    const handleCancel = () => {
        setKeyModalActive(false);
    };

    return (
        <div className="key-modal__container">
            {<Modal
                className="key-modal__modal"
                title="Your Keys"
                visible={fromLandingPage || keyModalActive}
                onCancel={handleCancel}
                footer={fromLandingPage && [
                    <Button
                        key="proceed"
                        onClick={() => {
                            toExecute(true);
                            refreshPage();
                        }}
                    >
                        Proceed
                    </Button>
                ]}
            >
                <div className="key-modal__body">
                    <div className="key-modal__subtitle">
                        Make sure you back up your private key!
                    </div>
                    <div className="key-modal__info">
                        Posts are published using your private key. Others can see your posts or
                        follow you using only your public key.
                    </div>
                    <div className="key-modal__generated-key">
                        <div>
                            <div className="key-modal__generated-key-tag">Seed Words</div>
                            {/* Need to add these in a copy text block */}
                            <div className="key-modal__generated-key-value">{userMnemonic}</div>
                            <div className="key-modal__generated-key-tag">Private key</div>
                            <div className="key-modal__generated-key-value">{userPrivateKey}</div>
                            <div className="key-modal__generated-key-tag">Public key</div>
                            <div className="key-modal__generated-key-value">{userPublicKey}</div>
                        </div>
                    </div>
                </div>
            </Modal>}
        </div>
    );
};
