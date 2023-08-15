import getConfig from "next/config";
import { logger } from "../utils/logger";

const runTimeConfig = getConfig();

type RelayType = "local" | "default" | "foundation";

export const getRelays = (type?: RelayType): string[] => {
    if (!type) {
        if (process.env.NEXT_PUBLIC_LOCAL_SETUP) {
            logger.info("Setting type as local, we determined that we are in local.");
            type = "local";
        } else {
            logger.info("Connecting with default relays.");
            type = "default";
        }
    }
    
    const relayDescriptions: Record<RelayType, string> = {
        local: "Fetching local relay",
        default: "Connecting to default relays",
        foundation: "We are going non-profit this time"
    };

    logger.info(relayDescriptions[type]);
    
    return runTimeConfig.publicRuntimeConfig.relays[type];
};
