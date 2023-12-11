
import {logger} from "./logger"



export const initConnection = async (pool: any, ndk: any) => {
  if (pool === undefined) {
    // Handle the case when no pool is provided
    // You might want to initialize the pool here or handle the error
    logger.error("No pool provided");
  } else {
    // Existing implementation when pool is provided
    // Assuming ndk.connect(6000) returns a Promise
    try {
      return ndk.connect(6000);
       // Return the result of ndk.connect
    } catch (error) {
      // Handle any errors that occur during the connection
      logger.error("Error in ndk.connect:", error);
      throw error; // Rethrow or handle the error appropriately
    }
  }
};

