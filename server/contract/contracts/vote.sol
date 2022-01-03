// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract vote is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _suggestIdx;
    uint256 _total;
    mapping(uint256 => string) public _suggest;
    mapping(uint256 => address) public _proponent;
    mapping(uint256 => uint256) public _agree;
    mapping(uint256 => uint256) public _oppose;
    mapping(uint256=>string) public _pass;
    constructor(){

    }

    function suggest (address proponent, string memory suggestion) public returns (uint256){
        require(proponent != address(0x0));
        _suggestIdx.increment();
        uint256 idx = _suggestIdx.current();
        _suggest[idx] = suggestion;
        _proponent[idx] = proponent;
        _agree[idx] = 1;
        _oppose[idx] = 1;
        return idx;
    }

    function voting(uint256 _suggestionIdx,address proponent, uint256 _vote, uint256 cutlineAgree, uint256 cutlineOppose) public returns(string memory){
        require(proponent != address(0x0));
        require(_agree[_suggestionIdx] != 0);
        if(_vote == 1){
            //_agree
            _agree[_suggestionIdx] = _agree[_suggestionIdx] +1;
            if(_agree[_suggestionIdx] >= cutlineAgree){
                //pass
                string memory _suggestion = _suggest[_suggestionIdx];
                _pass[_suggestionIdx] = _suggestion;
                delete _suggest[_suggestionIdx];
                delete _proponent[_suggestionIdx];
                return "pass";
            }
            return "vote agree";

        }else{
            _oppose[_suggestionIdx] = _oppose[_suggestionIdx] +1;
            if(_oppose[_suggestionIdx] >= cutlineOppose){
                //reject
                delete _suggest[_suggestionIdx];
                delete _proponent[_suggestionIdx];
                return "reject";
            }
            return "vote oppose"; 
        }
        
        
    }

    function getLatest () public view returns(uint256){
        return _suggestIdx.current();
    }


    function getSuggest (uint256 _suggestionIdx) public view returns (string memory){
        return _suggest[_suggestionIdx];
    }

    
    function getProponent (uint256 _suggestionIdx) public view returns (address){
        return _proponent[_suggestionIdx];
    }

    
    function getPassSuggestion(uint256 passIdx)public view returns(string memory){
        require(passIdx != 0);
        return _pass[passIdx];
    }
    
    

}