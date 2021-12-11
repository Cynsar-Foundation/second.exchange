import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { TorusConnector } from '@web3-react/torus-connector'

const RPC_URLS = {
    1: process.env.RPC_URL_1,
    4: process.env.RPC_URL_4
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

export const walletconnect = new WalletConnectConnector({
    rpc: { 1: RPC_URLS[1] },
    qrcode: true
  })

export const portis = new PortisConnector({ dAppId: process.env.PORTIS_DAPP_ID, networks: [1, 100] })

export const torus = new TorusConnector({ chainId: 1 })
