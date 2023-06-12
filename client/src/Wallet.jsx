import server from "./server";

import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { PUBLIC_KEY } from "../config";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const newAddress = keccak256(PUBLIC_KEY).slice(-20);
    setAddress(toHex(newAddress));

    if (newAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${newAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function getBalance(evt) {
    const newAddress = toHex(keccak256(PUBLIC_KEY).slice(-20));
    setAddress(newAddress);

    if (newAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${newAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
      <button type="button" className="button" onClick={getBalance}>Check my balance</button>
    </div>
  );
}

export default Wallet;
