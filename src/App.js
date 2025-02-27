import './App.css';
import Web3 from 'web3';
import React, { useState } from 'react';
import BANKABI from './BANKABI.json';
import TOKENABI from './TOKENABI.json';

function App() {
    // 合约地址
    const ContractAddress  = {
        bank:"0x7b802382Be81d54B7813c021618BCAD2683C9a33", // WEB3银行合约地址
        token:"0x4609C85cB7c891fEFe1514B3eBc58a49eB276772" // ZTH代币合约地址
    }

    const [web3, setWeb3] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');
    const [bankContract, setBankContract] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [balance, setBalance] = useState('');
    const [amount,setAmount] = useState('');
    const [toAddress,setToAddress] = useState('');
    const [status,setStatus] = useState('');

    const inputAmount = (e) => {
        setAmount(e.target.value);
    }

    const inputToAddress = (e) => {
        setToAddress(e.target.value);
    }
    // 连接钱包
    const connectWallet = async () => {
        try {
            // 检查是否安装了钱包扩展程序
            if (!window.ethereum) {
                setErrorMessage('请安装钱包扩展程序（如 MetaMask）');
                return;
            }
            setStatus('连接中');
            // 请求用户授权访问钱包
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                setWalletAddress(accounts[0]);
            } else {
                setErrorMessage('未获取到钱包地址');
                return;
            }
            // 创建 Web3 实例
            const web3 = new Web3(window.ethereum);
            setWeb3(web3);
            // 创建合约实例
            const bankContract = new web3.eth.Contract(BANKABI, ContractAddress.bank);
            setBankContract(bankContract);
            setStatus('连接成功');
            // 清除错误消息
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(`连接钱包失败: ${error.message}`);
        }
    };
    // 查询余额
    const getBalance = async () => {
        if (web3 && walletAddress && bankContract) {
            try {
                setStatus('查询中');
                const result = await bankContract.methods.balanceOf().call({ from: walletAddress });
                const fmtBalance = parseFloat(result).toFixed(2);
                setBalance(fmtBalance + ' ZTH');
                setStatus('查询成功');
                setErrorMessage('');
            } catch (error) {
              console.error("查询余额时出错:", error);
              setErrorMessage(`查询余额失败: ${error.message}`);
            }
        } else {
            setErrorMessage('请先连接钱包');
        }
    };
    // 存款
    const deposit = async () => {
        if (web3 && walletAddress && bankContract) {
          try {
            setStatus('存款中');
            await bankContract.methods.deposit(amount).send({ from: walletAddress});
            setStatus('存款成功');
            setErrorMessage('');
          } catch (error) {
            setErrorMessage(`存款失败: ${error.message}`);
          }
        }else {
          setErrorMessage('请先连接钱包');
        }
    }

    // 取款
    const withdraw = async () => {
        if (web3 && walletAddress && bankContract) {
          try {
            setStatus('取款中');
            await bankContract.methods.withdraw(amount).send({ from: walletAddress});
            setStatus('取款成功');
            setErrorMessage('');
          }catch (error) {
            setErrorMessage(`取款失败: ${error.message}`);
          }
        }else {
          setErrorMessage('请先连接钱包');
        }
    }

    // 转账
    const transfer = async () => {
        if (web3 && walletAddress && bankContract) {
          try {
            setStatus('转账中');
            await bankContract.methods.transfer(toAddress,amount).send({ from: walletAddress});
            setStatus('转账成功');
            setErrorMessage('');
          }catch (error) {
            setErrorMessage(`转账失败: ${error.message}`);
          }
        }else {
          setErrorMessage('请先连接钱包');
        }
    }
    // 授权
    const approve = async () => {
        if (web3 && walletAddress) {
          try {
            setStatus('授权中');
            //创建TOKEN合约实例
            const tokenContract = new web3.eth.Contract(TOKENABI, ContractAddress.token);
            await tokenContract.methods.approve(ContractAddress.bank,web3.utils.toWei(amount, 'ether')).send({ from: walletAddress});
            setStatus('授权成功');
            setErrorMessage('');
          }catch (error) {
            setErrorMessage(`授权失败: ${error.message}`);
          }
        }else {
          setErrorMessage('请先连接钱包');
        }
    }

    // 查询授权余额
    const [approveBalance, setApproveBalance] = useState('');
    const getApproveBalance = async () => {
        if (web3 && walletAddress) {
          try {
            setStatus('查询中');
            //创建TOKEN合约实例
            const tokenContract = new web3.eth.Contract(TOKENABI, ContractAddress.token);
            const result = await tokenContract.methods.allowance(walletAddress,ContractAddress.bank).call();
            const fmtBalance = parseFloat(web3.utils.fromWei(result,'ether')).toFixed(2);
            setApproveBalance(fmtBalance +' ZTH');
            setStatus('查询成功');
            setErrorMessage('');
          }catch (error) {
            setErrorMessage(`查询授权余额失败: ${error.message}`);
          }
        }else {
            setErrorMessage('请先连接钱包');
        }
    }

    const [activeTab, setActiveTab] = useState('approve');

    return (
        <div className="App">
            <div className="form-container">
                <h1 className="title">WEB3银行自助终端</h1>
                <p className="subtitle">本终端仅支持ZTH代币，代币合约地址：0x4609C85cB7c891fEFe1514B3eBc58a49eB276772</p>
                <h3>{errorMessage}</h3>
                
                <div className="connect-balance-container">
                    <div className="left">
                        <button className="operator-button" onClick={connectWallet}>连接钱包</button>
                        <p className="wallet-address">地址：{walletAddress}</p>
                    </div>
                    <div className="right">
                        <button className="operator-button" onClick={getBalance}>查询余额</button>
                        <p className="balance-display">余额：{balance}</p>
                    </div>
                </div>
                                
                <div className="tab-nav">
                    <button
                        className={activeTab === 'approve' ? 'active' : ''}
                        onClick={() => setActiveTab('approve')}
                    >
                        授权
                    </button>
                    <button
                        className={activeTab === 'deposit' ? 'active' : ''}
                        onClick={() => setActiveTab('deposit')}
                    >
                        存钱
                    </button>
                    <button
                        className={activeTab === 'withdraw' ? 'active' : ''}
                        onClick={() => setActiveTab('withdraw')}
                    >
                        取钱
                    </button>
                    <button
                        className={activeTab === 'transfer' ? 'active' : ''}
                        onClick={() => setActiveTab('transfer')}
                    >
                        转账
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'approve' && (
                        <div className="approve-container">
                            <div className="left">
                                <button className="operator-button" onClick={approve}>授权</button>
                                <input type="text" placeholder="授权金额" className="input-field" onChange={inputAmount}/>    
                            </div>
                            <div className="right">
                                <button className="operator-button" onClick={getApproveBalance}>查询授权余额</button>
                                <p className="approve-display" >授权余额：{approveBalance}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'deposit' && (
                        <div>
                            <input type="text" placeholder="金额" className="input-field" onChange={inputAmount}/>
                            <button className="operator-button" onClick={deposit}>存钱</button>
                            <p className="subtitle">TIPS: 执行"存钱"操作前，请先授权本合约操作您的ZTH代币</p>
                        </div>
                    )}
                    {activeTab === 'withdraw' && (
                        <div>
                            <input type="text" placeholder="金额" className="input-field" onChange={inputAmount}/>
                            <button className="operator-button" onClick={withdraw}>取钱</button>
                        </div>
                    )}
                    {activeTab === 'transfer' && (
                        <div>
                            <input type="text" placeholder="金额" className="input-field" onChange={inputAmount}/>
                            <input type="text" placeholder="转账地址" className="input-field" onChange={inputToAddress} />
                            <button className="operator-button" onClick={transfer}>转账</button>
                        </div>
                    )}
                    
                </div>
                <p className="status">{status}</p>
            </div>
        </div>
    );
}

export default App;