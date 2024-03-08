
import { NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { logger } from './logger';
export const generateKey = async (signerType: 'privateKey' | 'nip07', noRecreate: boolean) => {
    let signer;
    if (signerType === 'privateKey'){
        if (noRecreate) {
            const key = localStorage.getItem('keys');
            logger.info('Keys stored locally')
            signer = new NDKPrivateKeySigner(key as string)
        }else {
            const { generatePrivateKey, getPublicKey } = await import("nostr-tools");
            const sk = generatePrivateKey();
            const pk = getPublicKey(sk);
            localStorage.setItem('keys', sk);
            localStorage.setItem('pubKey', pk)
            localStorage.setItem('type', signerType)
            logger.info('Keys stored locally')
            signer = new NDKPrivateKeySigner(sk)
        }
        
    } else if ( signerType === 'nip07'){
        signer = new NDKNip07Signer();
        localStorage.setItem('type', signerType)
    }
    return signer;
}
