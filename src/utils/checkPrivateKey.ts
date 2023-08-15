import { logger } from "./logger";

export const checkPrivateKey = (): string | null => {
    if (typeof window === "undefined") return null;
  
    const privKey = localStorage.getItem("keys")
      ? JSON.parse(localStorage.getItem("keys")!).privateKey
      : null;
  
    if (!privKey) {
      logger.info("No key found!"); // Display UI message
    }
  
    return privKey;
  };