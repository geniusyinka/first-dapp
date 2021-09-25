// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract WavePortal {
    uint totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint timestamp, string message);
    
    struct Wave {
        address waver;
        string message;
        uint timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("is this the power of a god");
    }
    
    function wave(string memory _message) public {

        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            'wait 15m'
        );

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s is waved!", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        uint256 randomNum = (block.difficulty + block.timestamp + seed) % 100;
        console.log('random # generated: %s', randomNum);

        seed = randomNum;

        if(randomNum < 50) {
            console.log('%s won!:', msg.sender);


            uint256 prizeMoney = 0.0001 ether;
            require(
                prizeMoney <= address(this).balance,
                'trying to withdray more money than thr contract has'
            );
            (bool success, ) =  (msg.sender).call{value: prizeMoney}('');
            require(success, "failed to witdraw money!");

        }

        emit NewWave(msg.sender, block.timestamp, _message);
        }

    function getAllWaves() view public returns(Wave[] memory) {
        return waves;
    }
    
    function getTotalWaves() view public returns (uint) {
        console.log("we have %d total waves", totalWaves);
        return totalWaves;
    }
}


