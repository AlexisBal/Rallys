// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Kyc is Ownable {
    mapping(address => bool) public allowed;
    event VerifyIdentity(address _client, bool _verify);

    function setKycCompleted(address _addr) public onlyOwner {
        allowed[_addr] = true;
        emit VerifyIdentity(_addr, true);
    }

    function setKycRevoked(address _addr) public onlyOwner {
        allowed[_addr] = false;
        emit VerifyIdentity(_addr, false);
    }

    function isAllowed(address _addr) public view returns(bool) {
        return allowed[_addr];
    }
}   