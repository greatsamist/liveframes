// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiveFramesNFT is ERC721, Ownable(msg.sender) {
    uint256 public mintFee;
    uint256 public tokenId;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _mintFee
    ) ERC721(name, symbol) {
        mintFee = _mintFee;
    }

    function setMintFee(uint256 _mintFee) external onlyOwner {
        mintFee = _mintFee;
    }

    function mint() external payable {
        require(msg.value >= mintFee, "Insufficient fee");
        tokenId++;
        _safeMint(msg.sender, tokenId);
    }
}
