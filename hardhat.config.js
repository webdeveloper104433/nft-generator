/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")

const fs = require('fs')

const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";
const infuraId = "478f75e7c8c54f90ad96942a8b1f6808";
// const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      // Infura
      url: `https://rinkeby.infura.io/v3/${infuraId}`,
      accounts: [privateKey]
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
