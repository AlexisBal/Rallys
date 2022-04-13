// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Exchange.sol";
import "./Kyc.sol";

contract SubscriptionManager is Ownable, Exchange {

    uint public subscriptionPrice;

    constructor(Kyc _kyc) {
        subscriptionPrice = 1;
        kyc = _kyc;
    }

    struct SubscriptionClient {
        uint _startDate;
        uint _amountTokens;
        bool _isActive;
    }   
    
    mapping(address => SubscriptionClient) public subscriptions;

    event Subscribe(address client, uint duration, uint price, uint timestamp);
    event UnSubscribe(address client, uint timestamp);

    function subscribe(uint _duration) public {
        uint amountTokens = _duration*subscriptionPrice;
        require(rallysToken.balanceOf(msg.sender)>=amountTokens, "Insufficient balance!");
        require(rallysToken.allowance(msg.sender, address(this))>=amountTokens, "Insufficient allowance!");
        rallysToken.transferFrom(msg.sender, address(this), amountTokens);
        subscriptions[msg.sender] = SubscriptionClient(block.timestamp, amountTokens, true);
        emit Subscribe(msg.sender, amountTokens/subscriptionPrice, amountTokens, block.timestamp);
    }

    function unSubscribe() public {
        require(subscriptions[msg.sender]._isActive, "Subscription not active!");
        require(block.timestamp-subscriptions[msg.sender]._startDate<=2 weeks, "Withdrawal period exceeded!");
        subscriptions[msg.sender]._isActive = false;
        rallysToken.transfer(msg.sender, subscriptions[msg.sender]._amountTokens);
        emit UnSubscribe(msg.sender, block.timestamp);
    }

    function setSubscriptionPrice(uint _priceSub) public onlyOwner {
        subscriptionPrice = _priceSub;
    }

    function isActive(address _client) public view returns (bool) {
        return subscriptions[_client]._isActive;
    }

    function subscriptionDuration(address _client) public view returns (uint) {
        return subscriptions[_client]._amountTokens;
    }
}