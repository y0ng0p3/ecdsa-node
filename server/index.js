const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "48a6772c61cf83ab07f4712c150598699bc0ea93": 100,
  "48cd7b98450258cecad0c81f403e4966e530f3ad": 50,
  "a53e566613fa9dedc3aceb58501dfed361c8fb36": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, recipient, amount } = req.body;

  console.log(signature);

  const hashMessage = keccak256(utf8ToBytes(`${amount} ${recipient}`));

  const recoveredPublicKey = secp.recoverPublicKey(hashMessage, signature[0], signature[1]);
  const recoveredAddress = keccak256(recoveredPublicKey.slice(1)).slice(-20);
  console.log({ recoveredAddress });

  setInitialBalance(recoveredAddress);
  setInitialBalance(recipient);

  if (balances[recoveredAddress] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[recoveredAddress] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[recoveredAddress] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
