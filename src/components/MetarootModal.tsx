import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

import { useMetarootModalContext } from "../context";

export const MetarootModal = () => {
    const { metarootOverlayActive, setMetarootOverlayActive } =
    useMetarootModalContext();
    return(
        <div className='metaroot-modal__top-level'>
            <div className='metaroot-modal__container'>
                <button
                    className="metaroot-modal__close-button"
                    onClick={() => setMetarootOverlayActive(!metarootOverlayActive)}
                >
                    <IoCloseOutline size={25} />
                </button>
                <div className="wallet-modal__header">
                    <div className="wallet-modal__title">Claim identity with metaroot</div>
                </div>
                <hr />
                <div className="wallet-modal__buttons-container">Claiming name through metaroot/ANS coming soon</div>
            </div>
        </div>
    )
}
