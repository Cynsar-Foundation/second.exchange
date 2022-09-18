// Hmm , after thinking for a while , why don't we just map relays here
import { isEmpty } from "lodash";
import getConfig from "next/config";
const runTimeConfig = getConfig();
import { logger } from "../utils/logger";

// this function gets the relay

export const getRelays = async (type?: any) => {
  // get All the relays from the process.env
  // set local if we are in local dev
  if (isEmpty(type)) {
    logger.info(
      `The type value is ${type} not set please define the type in function getRelays(local), types are local, default, foundation.`
    );
    if (process.env.NEXT_PUBLIC_LOCAL_SETUP) {
      logger.info("Setting type as local , we determined that we are in local");
      type = "local";
      getRelays("local");
    } else {
      logger.info("Lets connect with default relays");
      type = "default";
      getRelays("default");
    }
  }
  if (type == "local") {
    logger.info("Fetching local relay");
    return runTimeConfig.publicRuntimeConfig.relays[type];
  }

  if (type == "foundation") {
    logger.info("We are going non-profit this time");
    return runTimeConfig.publicRuntimeConfig.relays[type];
  }

  if (type == "default") {
    logger.info(
      "We are going non-profit this time , connecting to default relays"
    );
    return runTimeConfig.publicRuntimeConfig.relays[type];
  }
};
