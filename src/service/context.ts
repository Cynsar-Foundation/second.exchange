import React, { useContext } from 'react'
import ProvidedService from "./providedServices";
import { logger } from "../utils/logger";


const contexts = new Map<ProvidedService, React.Context<any | undefined>> ();

const Contextualizer  = {
    createContext: <T>(service: ProvidedService): React.Context<T | undefined> => {
        const context = React.createContext<T | undefined>(undefined)
        contexts.set(service, context)
        logger.info(`Context Created ${context.displayName}, ${service}`)
        return context
    },

    use: <T>(services: ProvidedService): T => {
        const context = contexts.get(services)
        if (context === undefined){
            throw new Error(`${ProvidedService[services]} was not created`)
        }
        const service = useContext(context)

        if (service === undefined){
            throw new Error(`You must use ${ProvidedService[services]} from within its service`)
        }
        return service;
    },
    clear() {
        contexts.clear()
    }
}

export default Contextualizer