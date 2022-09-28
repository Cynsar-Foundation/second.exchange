import {
    Client as HyperspaceClient
  } from 'hyperspace'
import { logger } from '../utils/logger'
  
  export async function main () {
    // Setup the Hyperspace Daemon connection
    // =
    await setupHyperspace()
  
    // Create a Hyperdrive
    // =  
    //await cleanup()
  }
  
  async function setupHyperspace () {
    let client
    let server
    
    try {
      client = new HyperspaceClient({
          host: 'localhost'
      })
      await client.ready()
      logger.info(await client.status())
    } catch (e) {
      // no daemon, start it in-process
    //   server = new HyperspaceServer()
    //   await server.ready()
    //   client = new HyperspaceClient()
    //   await client.ready()
    if (e){
      logger.info(e)
    }
    
    }
    
    return {
      client,
      async cleanup () {
        await client.close()
        if (server) {
          console.log('Shutting down Hyperspace, this may take a few seconds...')
          await server.stop()
        }
      }
    }
  }
  
  export default main()