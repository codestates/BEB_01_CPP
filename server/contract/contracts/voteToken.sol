// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract voteToken is ERC20, Ownable {
    constructor() ERC20("voteToken", "VT") {

    }

    function mintToken(address to, address _erc721, uint256 amount) public onlyOwner returns (bool){
        require(to != address(0x0));
        require(amount > 0);
        _mint(to, amount);
        _approve(to, _erc721, allowance(to, _erc721) + amount);  // approve 추가

        return true;
    }

}