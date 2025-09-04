import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './useWallet';

// OKB域名服务合约地址 (X Layer)
const DOMAINS_CONTRACT_ADDRESS = '0x74b87a44F885494c445478328748DF7a6Ff423c6'; // 您的新域名注册合约地址

// 域名合约ABI (从您的scenario.json)
const DOMAINS_ABI = [
  'function register(string memory name) external payable',
  'function valid(string memory name) external pure returns (bool)',
  'function getAddress(string memory name) external view returns (address)',
  'function domains(string memory) external view returns (address)',
  'function price() external view returns (uint256)',
  'function tld() external view returns (string)',
  'function getAllNames() external view returns (string[])',
  'function setTwitter(string memory name, string memory record) external',
  'function getTwitter(string memory name) external view returns (string)',
  'function balanceOf(address owner) external view returns (uint256)',
  'function tokenURI(uint256 tokenId) external view returns (string)',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function paused() external view returns (bool)'
];

export interface DomainInfo {
  name: string;
  available: boolean;
  price: string;
  owner?: string;
  expires?: Date;
}

export const useENS = () => {
  const { provider, signer, isConnected } = useWallet();
  const [loading, setLoading] = useState(false);

  // 将域名转换为节点哈希
  const namehash = useCallback((name: string): string => {
    if (!name) return '0x0000000000000000000000000000000000000000000000000000000000000000';
    
    const labels = name.split('.');
    let node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    
    for (let i = labels.length - 1; i >= 0; i--) {
      const labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(labels[i]));
      node = ethers.utils.keccak256(ethers.utils.concat([node, labelHash]));
    }
    
    return node;
  }, []);

  // 检查域名是否可用
  const checkDomainAvailability = useCallback(async (domain: string): Promise<DomainInfo> => {
    if (!provider) {
      throw new Error('Provider not available');
    }

    setLoading(true);
    try {
      // 移除.okb后缀进行检查
      const cleanDomain = domain.replace('.okb', '');
      
      // 验证域名格式
      if (!/^[a-zA-Z0-9-]+$/.test(cleanDomain) || cleanDomain.length < 3) {
        return {
          name: domain,
          available: false,
          price: '0',
        };
      }

      const domainsContract = new ethers.Contract(
        DOMAINS_CONTRACT_ADDRESS,
        DOMAINS_ABI,
        provider
      );

      // 检查域名是否有效
      const isValid = await domainsContract.valid(cleanDomain);
      if (!isValid) {
        return {
          name: domain,
          available: false,
          price: '0',
        };
      }

      // 检查域名是否已被注册
      const domainOwner = await domainsContract.domains(cleanDomain);
      const available = domainOwner === ethers.constants.AddressZero;
      
      // 获取注册价格
      const priceWei = await domainsContract.price();
      const price = ethers.utils.formatEther(priceWei);

      return {
        name: domain,
        available,
        price,
        owner: available ? undefined : domainOwner,
      };
    } catch (error) {
      console.error('Error checking domain availability:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [provider]);

  // 注册域名
  const registerDomain = useCallback(async (
    domain: string
  ): Promise<string> => {
    if (!signer) {
      throw new Error('Signer not available');
    }

    setLoading(true);
    try {
      const cleanDomain = domain.replace('.okb', '');
      
      const domainsContract = new ethers.Contract(
        DOMAINS_CONTRACT_ADDRESS,
        DOMAINS_ABI,
        signer
      );

      // 获取注册价格
      const priceWei = await domainsContract.price();
      
      // 注册域名
      const registerTx = await domainsContract.register(cleanDomain, {
        value: priceWei,
        gasLimit: 300000,
      });

      const receipt = await registerTx.wait();
      return receipt.hash;
    } catch (error) {
      console.error('Error registering domain:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [signer]);

  // 获取用户拥有的域名列表
  const getUserDomains = useCallback(async (address: string): Promise<DomainInfo[]> => {
    if (!provider) return [];
    
    try {
      const domainsContract = new ethers.Contract(
        DOMAINS_CONTRACT_ADDRESS,
        DOMAINS_ABI,
        provider
      );

      // 获取用户拥有的域名数量
      const balance = await domainsContract.balanceOf(address);
      const domains: DomainInfo[] = [];
      
      // 获取所有域名，然后筛选属于该用户的
      const allNames = await domainsContract.getAllNames();
      const priceWei = await domainsContract.price();
      const price = ethers.utils.formatEther(priceWei);
      
      for (const name of allNames) {
        const owner = await domainsContract.domains(name);
        if (owner.toLowerCase() === address.toLowerCase()) {
          domains.push({
            name: `${name}.okb`,
            available: false,
            price,
            owner,
          });
        }
      }

      return domains;
    } catch (error) {
      console.error('Error getting user domains:', error);
      return [];
    }
  }, [provider]);

  return {
    checkDomainAvailability,
    registerDomain,
    getUserDomains,
    loading,
    isConnected,
  };
};
