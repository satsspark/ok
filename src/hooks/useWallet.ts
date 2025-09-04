import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
    okxwallet?: any;
    phantom?: any;
  }
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  chainId: number | null;
  walletType: string | null;
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    provider: null,
    signer: null,
    chainId: null,
    walletType: null,
  });

  const updateWalletState = useCallback(async (provider: ethers.providers.Web3Provider, walletType: string) => {
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      
      setWalletState({
        address,
        isConnected: true,
        isConnecting: false,
        provider,
        signer,
        chainId: network.chainId,
        walletType,
      });
    } catch (error) {
      console.error('Failed to update wallet state:', error);
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
      }));
    }
  }, []);

  const connectWallet = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));

    try {
      // 优先尝试OKX钱包
      let ethereum = window.okxwallet || window.ethereum;
      let walletType = window.okxwallet ? 'okx' : 'metamask';

      if (!ethereum) {
        alert('请安装OKX钱包或MetaMask!');
        setWalletState(prev => ({ ...prev, isConnecting: false }));
        return;
      }

      await ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(ethereum);
      await updateWalletState(provider, walletType);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
      }));
    }
  }, [updateWalletState]);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      address: null,
      isConnected: false,
      isConnecting: false,
      provider: null,
      signer: null,
      chainId: null,
      walletType: null,
    });
  }, []);

  const switchToXLayer = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      // 尝试切换到X Layer
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xC4' }], // X Layer chain ID (196)
      });
    } catch (switchError: any) {
      // 如果链不存在，添加它
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xC4',
                chainName: 'X Layer Mainnet',
                nativeCurrency: {
                  name: 'OKB',
                  symbol: 'OKB',
                  decimals: 18,
                },
                rpcUrls: ['https://xlayerrpc.okx.com'],
                blockExplorerUrls: ['https://www.oklink.com/xlayer'],
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add X Layer:', addError);
        }
      } else {
        console.error('Failed to switch network:', switchError);
      }
    }
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          await updateWalletState(provider, 'metamask');
        }
      }
    };

    checkConnection();

    // 监听账户变化
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          updateWalletState(provider, 'metamask');
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [updateWalletState, disconnectWallet]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchToXLayer,
  };
};
