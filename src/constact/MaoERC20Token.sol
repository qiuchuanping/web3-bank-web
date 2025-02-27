// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//ERC20规范的代币合约
contract MaoERC20Token is ERC20 {
    // constructor(string memory name_, string memory symbol_) ERC20(name_,symbol_){
    //     _mint(msg.sender, 10000 * 10 ** decimals());
    // }

    constructor() ERC20(unicode"ERMAO","MTH"){
        //给部署合约的账户铸造 1000MTH 的币
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}