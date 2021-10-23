// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MYT") {
        _mint(msg.sender, 100000 * (10 ** 18));
    }

    // Transfer(address from, address to, uint256 value)

    // function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
    //     console.log("amoutn", amount);
    //     _transfer(_msgSender(), recipient, amount);
    //     return true;
    // }

    // function sellItem (address seller, uint256 price) public {
    //     // this.transfer(seller, price);
    // }
}