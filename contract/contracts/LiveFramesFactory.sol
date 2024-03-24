// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./LiveFrames.sol";

contract LiveFramesFactory {
    event LiveFramesContract(
        address indexed owner,
        address indexed erc721Contract,
        string name
    );
    event CloneCreated(address indexed cloneAddress);

    address[] public clones;

    function createERC721(
        string memory name,
        string memory symbol,
        uint256 mintFee
    ) external returns (address) {
        LiveFramesNFT newLiveFrame = new LiveFramesNFT(name, symbol, mintFee);
        newLiveFrame.transferOwnership(msg.sender);
        emit LiveFramesContract(msg.sender, address(newLiveFrame), name);

        address cloneAddress = address(newLiveFrame);
        clones.push(cloneAddress);
        emit CloneCreated(cloneAddress);

        return cloneAddress;
    }

    function getClones() external view returns (address[] memory) {
        return clones;
    }
}
