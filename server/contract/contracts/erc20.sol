// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZeppelinTestToken is ERC20, Ownable {
    constructor() ERC20("ZeppelinTestToken", "ZTT") {
    }

    function mintToken(address to, uint256 amount) public onlyOwner returns (bool){
        require(to != address(0x0));
        require(amount > 0);
        _mint(to, amount);
        _approve(to, msg.sender, allowance(to, msg.sender) + amount);  // approve 추가

        return true;
    }
}