import { useEffect, useState } from 'react'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { base58btc } from 'multiformats/bases/base58';
import * as IPFS from 'ipfs-core';
import * as WS from 'libp2p-websockets';
import * as filters from 'libp2p-websockets/src/filters';


let node;
const transportKey = WS.prototype[Symbol.toStringTag]

export default function useIpfs () {
  const [isIpfsReady, setIpfsReady] = useState(Boolean(node))

  useEffect(() => {
    startIpfs()
    return function cleanup () {
      if (node && node.stop) {
        console.log('Stopping IPFS')
        node.stop().catch((err: any) => console.error(err))
        node = null
        setIpfsReady(false)
      }
    }
  }, [])

  async function startIpfs () {
    if (node) {
      console.log('IPFS already started')
    } else {
      try {
        console.time('IPFS Started')
        node = await IPFS.create({
            EXPERIMENTAL: { ipnsPubsub: true },
            config: {
                Addresses: {
                    Swarm: [
                      '/ip4/0.0.0.0/tcp/9090/ws/p2p-webrtc-star',
                      '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                      '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
                    ]
                },
                Bootstrap: []
            }, 
            libp2p: {
              config: {
                transport: {
                  [transportKey]: {
                    filter: filters.all
                  }
                }
              }
            }
        });
        console.timeEnd('IPFS Started')
      } catch (error) {
        console.error('IPFS init error:', error)
        node = null
      }
    }

    setIpfsReady(Boolean(node))
  }

  return { node, isIpfsReady }
}



