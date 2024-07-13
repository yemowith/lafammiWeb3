// contracts/MyContract.sol

pragma solidity ^0.8.0;

contract MyContract {
    event SomeEvent(address indexed from, uint256 value);

    function someMethod(uint256 value) public {
        emit SomeEvent(msg.sender, value);
    }
}
