import { useSessionKeyContext } from '@libs/application/state/SessionKeyContext';
import React, { FC } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useRecoilState } from 'recoil';

import { keyOverlayState } from 'src/context/key-modal-context';
// import { sessionKeyState } from '../../context/session-key-context';

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

//   const [sessionKey, setSessionKey ] = useRecoilState(sessionKeyState);
  const { sessionKey, setSessionKey } = useSessionKeyContext();
  console.log("From userkeymodal: ", sessionKey);
  
  var parsedSessionKey;
  fromLandingPage
    ? (parsedSessionKey = generatedKeys)
    // @ts-ignore
    : (parsedSessionKey = JSON.parse(sessionKey));
  // @ts-ignore
  const userMnemonic = parsedSessionKey['mnemonic'];
  // @ts-ignore
  const userPrivateKey = parsedSessionKey['privKey'];
  // @ts-ignore
  const userPublicKey = parsedSessionKey['pubKey'];

  const [keyOverlayActive, setKeyOverlayActive] = useRecoilState(keyOverlayState);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="wallet-modal__top-level">
      <div className="wallet-modal__container">
        {!fromLandingPage && (
          <button
            className="wallet-modal__close-button"
            onClick={() => setKeyOverlayActive(false)}
          >
            <IoCloseOutline size={25} />
          </button>
        )}
        <div className="wallet-modal__header">
          <div className="wallet-modal__title">Your Keys</div>
          <hr />
        </div>
        <div className="key-modal__body">
          <div className="key-modal__subtitle">
            Make sure you back up your private key!
          </div>
          <div className="key-modal__info">
            Posts are published using your private key. Others can see your posts or
            follow you using only your public key.
          </div>
          <div className="key-setup__generated-key">
            <span className="key-setup__generated-key-value">
              <span className="key-setup__generated-key-tag">Seed Words</span> <br />
              {/* Need to add these in a copy text block */}
              {userMnemonic} <br />
              <span className="key-setup__generated-key-tag">Private key</span> <br />
              {userPrivateKey} <br />
              <span className="key-setup__generated-key-tag">Public key</span> <br />
              {userPublicKey}
            </span>
          </div>
        </div>
        <hr />
        {fromLandingPage && (
          <button
            className="key-modal__proceed-button"
            onClick={() => {
              toExecute(true);
              refreshPage();
            }}
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};
