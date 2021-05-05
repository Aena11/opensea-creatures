const HDWalletProvider = require("truffle-hdwallet-provider");

const MNEMONIC = "toilet trim stove art fine stadium midnight desk limit select industry despair";
const NODE_API_KEY = "0VhpbiJB0TObsDdhhWcC6x_O98eknyer";
const isInfura = !!process.env.INFURA_KEY;

const needsNodeAPI =
  process.env.npm_config_argv &&
  (process.env.npm_config_argv.includes("rinkeby") ||
    process.env.npm_config_argv.includes("live"));

if ((!MNEMONIC || !NODE_API_KEY) && needsNodeAPI) {
  console.error("Please set a mnemonic and ALCHEMY_KEY or INFURA_KEY.");
  process.exit(0);
}

const rinkebyNodeUrl = "https://eth-rinkeby.alchemyapi.io/v2/" + NODE_API_KEY;
  // ? "https://rinkeby.infura.io/v3/" + NODE_API_KEY
  // : "https://eth-rinkeby.alchemyapi.io/v2/" + NODE_API_KEY;

const mainnetNodeUrl = "https://eth-mainnet.alchemyapi.io/v2/" + NODE_API_KEY;
  // ? "https://mainnet.infura.io/v3/" + NODE_API_KEY
  // : "https://eth-mainnet.alchemyapi.io/v2/" + NODE_API_KEY;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      gas: 5000000,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, rinkebyNodeUrl);
      },
      gas: 5000000,
      network_id: "*",
    },
    live: {
      network_id: 1,
      provider: function () {
        return new HDWalletProvider(MNEMONIC, mainnetNodeUrl);
      },
      gas: 5000000,
      gasPrice: 5000000000,
    },
  },
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 2,
    },
  },
  compilers: {
    solc: {
      version: "^0.5.0",
    },
  },
};
