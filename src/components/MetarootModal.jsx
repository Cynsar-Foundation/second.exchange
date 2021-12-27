import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

import { useMetarootModalValue } from "../context";

export const MetarootModal = () => {
    const { metarootOverlayActive, setMetarootOverlayActive } =
    useMetarootModalValue();
    return(
        <div className='MetarootModal__toplevel'>
            <div className='MetarootModal__container'>
                <button
                    className="MetarootModal__close-button"
                    onClick={() => setMetarootOverlayActive(!metarootOverlayActive)}
                >
                    <IoCloseOutline size={25} />
                </button>
                <div className="WalletModal__header">
                    <div className="WalletModal__title">Claim identity with metaroot</div>
                </div>
                <hr />
                <div className="WalletModal__buttons-container">Claiming name through metaroot/ANS coming soon</div>
            </div>
        </div>
    )
}
