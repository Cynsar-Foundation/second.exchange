import NDK from "@nostr-dev-kit/ndk";
import { logger } from "./logger";

export const  checkPrivateKey = (type: 'nip07' | 'privateKey', ndk: NDK): any | null => {

  if (type == "privateKey") {
    // look within the localStorage
    if (typeof window === "undefined") return null;
    const privKey = localStorage.getItem("keys")  
    if (!privKey) {
      logger.info("No key found!"); // Display UI message
    }
    return privKey;
  } else if (type == 'nip07'){
    return 
  }
    
  };