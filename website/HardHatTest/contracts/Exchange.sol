// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RallysToken.sol";
import "./Kyc.sol";

contract Exchange is Ownable, RallysToken {
    uint public tokenPrice;
    RallysToken public rallysToken;
    Kyc public kyc;
    event BuyTokens(uint amount, uint price);

    constructor() {
        tokenPrice = 3000000000000000;
        rallysToken = new RallysToken();
    }  

    function setTokenPrice(uint _price) public onlyOwner {
        tokenPrice = _price;
    } 

    function buyTokens() public payable {
        require(kyc.isAllowed(msg.sender), "KYC not completed!");
        uint amountMoney = msg.value;
        uint dexBalance = rallysToken.balanceOf(address(this));
        uint amountTokens = msg.value/tokenPrice;
        require(amountMoney > 0, "You need to send some ethers!");
        require(amountTokens <= dexBalance, "Not enough tokens!");
        rallysToken.transfer(msg.sender, amountTokens);
        emit BuyTokens(amountTokens, tokenPrice);
    } 

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getRallysTokenContract() public view returns(address) {
        return address(rallysToken);
    }

    function getBalanceTokensOf(address _client) public view returns(uint) {
        return rallysToken.balanceOf(_client);
    }

    receive() external payable {
        buyTokens();
    }
}