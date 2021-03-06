pragma solidity ^0.6.0;
import "../interfaces/IHRC20.sol";

interface IBowToken is IHRC20 {
    function mint(address to, uint256 amount) external returns (bool);

    function availableSupply() external view returns (uint256 result);

    function transferMinterTo(address _minter) external;

    function getMinter() external view returns (address _minter);
}
