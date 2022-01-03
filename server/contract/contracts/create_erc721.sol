// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract cppNft is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _tokenIdx;
    mapping(address => uint256) private _erc20Ids;
    uint256 nftPrice;

    constructor() ERC721("cppVote", "vote") {
        nftPrice = 10;
    }

    function getPrice() public view returns (uint256){
        return nftPrice;
    }

    function mintNFT(address recipient, string memory tokenURI,address tokenAddress) public onlyOwner returns (uint256) {
        require(_erc20Ids[tokenAddress] != 0,"can not use this token");
        require(IERC20(tokenAddress).balanceOf(recipient) > nftPrice,"not enough token to buy nft");
        IERC20(tokenAddress).transferFrom(recipient, msg.sender, nftPrice);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function setToken (address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        //token = IERC20(tokenAddress);
        _tokenIdx.increment();
        uint256 idx = _tokenIdx.current();
        _erc20Ids[tokenAddress] = idx;        
        return true;
    }

    function isOwner (address person) public view returns (bool){
        for(uint256 i = 1; i < _tokenIds.current(); i++) {
            if(ownerOf(i) == person){
                return true;
            }  
	    }   
        return false;
    }
}