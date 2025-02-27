// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

//银行合约
contract Bank{
    mapping (address => uint) public account;

    //代币合约
    address public immutable token;

    //构造函数初始化代币合约地址，完成本合约与代币合约关联
    constructor(address _token){
        token = _token;
    }

    //余额检查修饰器
    modifier requireBalance(uint amount){
        //单位转换 // eth -> wei
        amount = amount * 10 ** 18; 
        //余额校验
        require(amount <= account[msg.sender],"not enough");
        _;
    }

    //查询余额
    function balanceOf() public view returns(uint){
        return account[msg.sender]/(10 ** 18); //wei ->eth
    }

    //存款 ，调用ERC20规范的转账接口
    function deposit(uint amount) public {
        //单位转换 // eth -> wei
        amount = amount * 10 ** 18; 
        // from 调用者  to 本银行合约 ，从调用者转到本银行合约
        //执行transferFrom转账前需授权，即调用代币合约的approve函数
        require(IERC20(token).transferFrom(msg.sender,address(this),amount),"deposit error");
        // 给调用者加存款
        account[msg.sender] += amount;
    }

    //取款
    function withdraw(uint amount) external requireBalance(amount){
        //transfer返回的状态不可靠
        // require(IERC20(token).transfer(msg.sender,amount),"withdraw error");
        //单位转换
        amount = amount * 10 ** 18;
        //安全转账
        SafeERC20.safeTransfer(IERC20(token),msg.sender,amount);
        account[msg.sender] -= amount;
    }

    //转账
    function transfer(address to,uint amount) public requireBalance(amount){
        //单位转换
        amount = amount * 10 ** 18;
        //转账
        account[msg.sender] -= amount;
        account[to] += amount;
    }

}