### WEB3 银行自助终端

#### 项目描述

该项目基于以太坊区块链技术构建，前端采用React，集成了web3.js 、openzeppelin/contracts组件，允许用户通过连接钱包(比如 Metamask )与智能合约进行交互，实现对 ZTH 代币的管理操作，如查询余额、授权、存款、取款、转账等。

该项目是作者入坑WEB3的首个练手项目，在学习了B站UP主**IT老炮-仁科**的《7天学会WEB3开发 从0到1开发你的第一个DAPP》系列课程后手撸的项目。

**课程B站地址：**  https://space.bilibili.com/1237993385/lists/4116777?type=season 

![](https://raw.githubusercontent.com/qiuchuanping/web3-bank/main/images/5.png)

该项目没有采用仁科老师的前端，作者本是后端开发，前端着实脑壳有点痛，好在仁科老师推荐的在VS Code中集成豆包的MARSCODE AI插件，前端React编写就相当丝滑了。

该项目在仁科老师教程的基础上增加了授权与授权余额查询功能，不用再跳到remix中去完成授权操作，背景图则是通过阿里的通义文生图制作，效果不错。

**面向AI编程，众享丝滑**

跟随仁科老师的课程，实现了两个智能合约的开发，一个是代币智能合约，ZeroERC20Token.sol，一个是银行智能合约，Bank.sol；并通过Remix+小狐狸Metamask钱包发布在了以太坊Sepolia测试链上。

**代币合约地址**：0x4609C85cB7c891fEFe1514B3eBc58a49eB276772   

**代币名称**：ZERO  

**符号**：ZTH

**银行合约地址**：0x7b802382Be81d54B7813c021618BCAD2683C9a33

再次感谢仁科老师的奉献！

#### 技术栈

- **前端框架**：React，用于构建用户界面，实现组件化开发和状态管理。
- **Web3 库**：Web3.js，用于与以太坊区块链进行交互，包括连接钱包、调用智能合约方法等。
- **openzeppelin 库**：智能合约开发库，提供了符合 ERC - 20、ERC - 721、ERC - 1155 等标准的代币合约实现。
- **智能合约**：Solidity，编写 BANKABI 和 TOKENABI 智能合约，分别处理银行相关操作和代币授权操作。

#### 环境搭建
- 环境准备，Node.js 和 Git 

```
node -v
v18.20.4

npm -v
10.7.0

git -v
```

- 修改npm镜像源

```
npm config set registry https://registry.npmmirror.com/
```

- 运行项目

```
# 进入工作目录,克隆项目到本地
git clone https://github.com/qiuchuanping/web3-bank.git

# 进入项目目录
cd web3-bank

# 安装
npm install

# 运行
npm run start
```


#### 效果展示
- **授权页**
![](https://raw.githubusercontent.com/qiuchuanping/web3-bank-web/main/images/1.png)
- **存钱页**
![](https://raw.githubusercontent.com/qiuchuanping/web3-bank-web/main/images/2.png)
- **取钱页**
![](https://raw.githubusercontent.com/qiuchuanping/web3-bank-web/main/images/3.png)
- **转账页**
![](https://raw.githubusercontent.com/qiuchuanping/web3-bank-web/main/images/4.png)