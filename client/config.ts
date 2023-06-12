import { getPublicKey } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

export const PRIVATE_KEY = "56e9213f3b5caa343d1f0c7a85bde5d4d7d6417bff6b047fabb83e9b55a1525f";
export const PUBLIC_KEY = getPublicKey(PRIVATE_KEY);

export const PRIVATE_KEY_1 = "7b46760575752c034dc285c59fd00389515b3af191ab8dd90a6bd46b22c206f6";
export const PUBLIC_KEY_1 = getPublicKey(PRIVATE_KEY_1);

export const PRIVATE_KEY_2 = "e790ceb5ed5738a135e1f78ed3b55eeab6fc34f8e6f77193d63938887198c47c";
export const PUBLIC_KEY_2 = getPublicKey(PRIVATE_KEY_2);

export const PRIVATE_KEY_3 = "3da8b8acd3c4c7cb8bbb8c7772589a5b6dd50daa28677e5fad0ee9c5ff0fe83b";
export const PUBLIC_KEY_3 = getPublicKey(PRIVATE_KEY_3);
