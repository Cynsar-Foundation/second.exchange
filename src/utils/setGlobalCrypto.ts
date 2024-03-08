import { CryptoDriverNoble, setGlobalCryptoDriver } from "earthstar";
// Define the KeypairBytes and UpdatableHash types if they aren't already defined

// Set the custom crypto driver as the global crypto driver for Earthstar
import { schnorr } from "@noble/curves/secp256k1";
import { sha256 } from "@noble/hashes/sha256";
import { ICryptoDriver, KeypairBytes } from "earthstar";
import { UpdatableHash } from "./updateHash";

import { createHash } from "sha256-uint8array";

import { bytesToHex } from "@noble/hashes/utils";

// Utility function to convert string to Uint8Array
function stringToBytes(str: string) {
  return new TextEncoder().encode(str);
}

export const CryptoDriverSchnorr: ICryptoDriver = class {
  static async sha256(input: string | Uint8Array): Promise<Uint8Array> {
    if (typeof input === "string") {
      input = stringToBytes(input);
    }
    return Promise.resolve(sha256(input));
  }

  static updatableSha256() {
    return new UpdatableHash({
      hash: sha256.create(),
      update: (hash, data) => hash.update(data),
      digest: (hash) => hash.digest(),
    });
  }

  static async generateKeypairBytes(): Promise<KeypairBytes> {
    //get from local
    let privateKey;
    let publicKey;

    // Attempt to get the private key from localStorage
    const storedKey = localStorage.getItem("keys");

    if (storedKey) {
      // If a private key exists in localStorage, use it
      privateKey = Uint8Array.from(Buffer.from(storedKey, "hex"));
      publicKey = schnorr.getPublicKey(privateKey);
    } else {
      // If no private key is found in localStorage, generate a new keypair
      privateKey = schnorr.utils.randomPrivateKey();
      publicKey = schnorr.getPublicKey(privateKey);

      // Store the newly generated private key in localStorage
      // Note: Storing sensitive data like private keys in localStorage is generally not recommended
      //localStorage.setItem("privateKey", Array.from(privateKey).toString());
    }

    return {
      pubkey: publicKey,
      secret: privateKey,
    };
  }

  static async sign(
    keypairBytes: KeypairBytes,
    msg: string | Uint8Array
  ): Promise<Uint8Array> {
    if (typeof msg === "string") {
      msg = stringToBytes(msg);
    }
    const messageHash = sha256(msg);
    return schnorr.sign(keypairBytes.secret, messageHash);
  }

  static async verify(
    publicKey: Uint8Array,
    sig: Uint8Array,
    msg: string | Uint8Array
  ): Promise<boolean> {
    if (typeof msg === "string") {
      msg = stringToBytes(msg);
    }
    const messageHash = sha256(msg);
    return schnorr.verify(sig, messageHash, publicKey);
  }
};
