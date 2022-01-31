import React from 'react';
import { BsFillKeyFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { authModalState, keyModalState } from 'src/application/state';

interface IPopoverProps {
    hidePopover: () => void
}

export const PopoverContent: React.FC<IPopoverProps> = ({ hidePopover }) => {
    const [ authModalActive, setAuthModalActive ] = useRecoilState(authModalState);
    const [ keyModalActive, setKeyModalActive ] = useRecoilState(keyModalState);
    return(
      <div>
        <div className="Header__content__user">
            <button 
              className='Header__content__user-format'
              onClick={() => { hidePopover(); setAuthModalActive(true)}}
            >
                <div>
                <BiLogOut size={30} />
                </div>
                </button>
            <button 
              className='Header__content__user-format-text'
              onClick={() => { hidePopover(); setAuthModalActive(true) }}
              style={{ paddingLeft: "10px"}}
            >
                Logout
            </button>
        </div>
        <div className="Header__content__keys">
            <button 
              className='Header__content__keys-format'
              onClick={() => { hidePopover(); setKeyModalActive(true)}}
            >
                <div>
                <BsFillKeyFill size={30} />
                </div>
                </button>
            <button 
              className='Header__content__user-format-text'
              onClick={() => { hidePopover(); setKeyModalActive(true)}}
              style={{ paddingLeft: "10px"}}
            >
                Your Keys
            </button>
        </div>
      </div>
    )
}
