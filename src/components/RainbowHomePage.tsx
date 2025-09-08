import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { Button, FlexCol, FlexRow, Input } from '../styles/GlobalStyles';
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at top left, rgba(0, 255, 127, 0.03) 0%, transparent 60%),
    radial-gradient(ellipse at top right, rgba(16, 185, 129, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse at bottom center, rgba(0, 255, 127, 0.02) 0%, transparent 70%),
    #0a0e13;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  padding-top: 70px; /* 为顶部导航栏留出空间 */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, transparent 48%, rgba(0, 255, 127, 0.01) 50%, transparent 52%),
      linear-gradient(-45deg, transparent 48%, rgba(0, 255, 127, 0.01) 50%, transparent 52%);
    background-size: 60px 60px;
    opacity: 0.3;
    pointer-events: none;
  }
`;

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(10, 14, 19, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 255, 127, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 255, 127, 0.05);

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 16px;
  }
`;

const LanguageToggle = styled.button`
  background: rgba(15, 20, 25, 0.6);
  border: 1px solid rgba(0, 255, 127, 0.3);
  color: #00ff7f;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(16px);
  font-family: inherit;

  &:hover {
    background: rgba(0, 255, 127, 0.1);
    border-color: rgba(0, 255, 127, 0.6);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #f8fafc;
  
  img {
    width: 36px;
    height: 36px;
    filter: drop-shadow(0 0 8px rgba(172, 251, 7, 0.6));
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    
    img {
      width: 32px;
      height: 32px;
    }
  }
`;

const WalletSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const MyDomainsButton = styled(Link)`
  background: rgba(15, 20, 25, 0.6);
  border: 1px solid rgba(0, 255, 127, 0.3);
  color: #00ff7f;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(16px);
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;

  &:hover {
    background: rgba(0, 255, 127, 0.1);
    border-color: rgba(0, 255, 127, 0.6);
    transform: translateY(-1px);
    color: #00ff7f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.8rem;
    
    .text-desktop {
      display: none;
    }
    
    svg {
      margin-right: 0 !important;
    }
  }

  @media (min-width: 769px) {
    .text-mobile {
      display: none;
    }
  }
`;

const MainContent = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 10;
  margin-top: -100px; /* 向上移动 */
  padding: 0 20px;

  @media (max-width: 768px) {
    margin-top: -80px;
    padding: 0 16px;
    max-width: 100%;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 12px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 30px;
  }
`;

const SearchCard = styled.div`
  background: rgba(15, 20, 25, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(30, 41, 59, 0.6);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 255, 127, 0.4);
    box-shadow: 
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(0, 255, 127, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 20px 16px;
    margin-bottom: 30px;
  }
`;

const SearchTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SearchSubtitle = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 20px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 20px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: 12px;
  padding: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus-within {
    border-color: rgba(0, 255, 127, 0.6);
    box-shadow: 
      0 0 0 3px rgba(0, 255, 127, 0.1),
      0 4px 12px rgba(0, 255, 127, 0.15);
    background: rgba(30, 41, 59, 0.6);
  }
  
  &:hover {
    border-color: rgba(0, 255, 127, 0.5);
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding: 1px;
  }
`;

const SearchInput = styled(Input)`
  flex: 1;
  height: 48px;
  font-size: 0.95rem;
  padding: 0 18px;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #f8fafc;
  margin: 0;
  
  &::placeholder {
    color: #64748b;
    font-weight: 400;
  }
  
  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
    background: transparent;
    transform: none;
  }

  @media (max-width: 768px) {
    height: 44px;
    font-size: 0.9rem;
    padding: 0 16px;
  }
`;

const DomainSuffix = styled.div`
  color: #00ff7f;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0 10px;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0 8px;
  }
`;

const RegisterButton = styled(Button)`
  height: 42px;
  padding: 0 18px;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 10px;
  background: linear-gradient(135deg, #00ff7f 0%, #32cd32 100%);
  color: #000000;
  border: none;
  position: relative;
  overflow: hidden;
  margin-left: 6px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0, 255, 127, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    height: 38px;
    padding: 0 14px;
    font-size: 0.8rem;
    margin-left: 4px;
  }
`;

const ResultCard = styled.div<{ available?: boolean }>`
  background: rgba(15, 20, 25, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid ${props => props.available ? 'rgba(0, 255, 127, 0.4)' : 'rgba(239, 68, 68, 0.4)'};
  border-radius: 12px;
  padding: 24px;
  margin-top: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.available ? 'rgba(0, 255, 127, 0.6)' : 'rgba(239, 68, 68, 0.6)'};
    box-shadow: 0 4px 12px ${props => props.available ? 'rgba(0, 255, 127, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  }
`;

const StatusBadge = styled.div<{ available?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${props => props.available 
    ? 'rgba(0, 255, 127, 0.15)' 
    : 'rgba(239, 68, 68, 0.15)'};
  color: ${props => props.available ? '#00ff7f' : '#ef4444'};
  border: 1px solid ${props => props.available ? 'rgba(0, 255, 127, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
`;

const PriceCard = styled.div`
  background: linear-gradient(135deg, #00ff7f 0%, #32cd32 100%);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%);
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const PriceAmount = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  color: #000000;
  margin-bottom: 4px;
  position: relative;
  z-index: 1;
`;

const PriceLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 1;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 255, 127, 0.3);
  border-top: 2px solid #00ff7f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 自定义RainbowKit按钮样式
const StyledConnectButton = styled.div`
  /* 覆盖RainbowKit默认样式 */
  button[data-testid="rk-connect-button"] {
    background: rgba(0, 0, 0, 0.8) !important;
    border: 1px solid rgba(0, 255, 127, 0.4) !important;
    border-radius: 12px !important;
    padding: 10px 18px !important;
    font-weight: 600 !important;
    font-size: 0.9rem !important;
    color: #00ff7f !important;
    height: 42px !important;
    min-height: 42px !important;
    transition: all 0.3s ease !important;
    backdrop-filter: blur(10px) !important;
    
    &:hover {
      background: rgba(0, 255, 127, 0.1) !important;
      border-color: rgba(0, 255, 127, 0.6) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(0, 255, 127, 0.2) !important;
    }
  }
  
  /* 已连接状态的样式 */
  button[data-testid="rk-account-button"] {
    background: rgba(0, 0, 0, 0.8) !important;
    border: 1px solid rgba(0, 255, 127, 0.4) !important;
    border-radius: 12px !important;
    padding: 8px 12px !important;
    height: 42px !important;
    min-height: 42px !important;
    color: #f8fafc !important;
    font-size: 0.85rem !important;
    
    &:hover {
      background: rgba(0, 255, 127, 0.1) !important;
      border-color: rgba(0, 255, 127, 0.6) !important;
    }
  }
  
  /* 余额显示样式 */
  [data-testid="rk-balance-text"] {
    color: #00ff7f !important;
    font-weight: 600 !important;
    font-size: 0.85rem !important;
  }
  
  /* 地址显示样式 */
  [data-testid="rk-address-text"] {
    color: #f8fafc !important;
    font-family: 'SF Mono', monospace !important;
    font-size: 0.8rem !important;
  }
  
  /* 网络标识样式 */
  [data-testid="rk-chain-button"] {
    background: rgba(0, 255, 127, 0.15) !important;
    border: 1px solid rgba(0, 255, 127, 0.3) !important;
    color: #00ff7f !important;
    font-size: 0.75rem !important;
    padding: 4px 8px !important;
    height: 28px !important;
    min-height: 28px !important;
  }
`;

// 合约地址和ABI
const DOMAINS_CONTRACT_ADDRESS = '0x1A1b6AeeE5D388C4f21e53132455802028B98C37';
const DOMAINS_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "name", "type": "string"}],
    "name": "register",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "name", "type": "string"}],
    "name": "valid",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "", "type": "string"}],
    "name": "domains",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "", "type": "string"}],
    "name": "price",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllNames",
    "outputs": [{"internalType": "string[]", "name": "", "type": "string[]"}],
    "stateMutability": "view",
    "type": "function"
  },

] as const;

// 自定义提示框组件
const ToastContainer = styled.div<{ show: boolean; type: 'success' | 'error' | 'warning' }>`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => {
    switch (props.type) {
      case 'success': return 'rgba(34, 197, 94, 0.95)';
      case 'error': return 'rgba(239, 68, 68, 0.95)';
      case 'warning': return 'rgba(251, 191, 36, 0.95)';
      default: return 'rgba(15, 20, 25, 0.95)';
    }
  }};
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  max-width: 400px;
  text-align: center;
  font-weight: 500;
  white-space: pre-line;
`;

// 滚动域名组件样式
const ScrollingContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  overflow: hidden;
  background: rgba(15, 20, 25, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 255, 127, 0.2);
  border-radius: 12px;
  padding: 16px 0;
`;

const ScrollingTitle = styled.div`
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ScrollingTrack = styled.div`
  display: flex;
  animation: scroll 30s linear infinite;
  gap: 20px;
  
  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  
  &:hover {
    animation-play-state: paused;
  }
`;

const DomainItem = styled.div`
  background: rgba(0, 255, 127, 0.1);
  color: #00ff7f;
  padding: 8px 16px;
  border-radius: 20px;
  white-space: nowrap;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(0, 255, 127, 0.3);
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: '•';
    color: #00ff7f;
    font-weight: bold;
  }
`;

// 滚动域名组件
const ScrollingDomains: React.FC = () => {
  const { t } = useTranslation();
  const publicClient = usePublicClient();
  const [domains, setDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDomains = async () => {
      if (!publicClient) return;

      try {
        // 获取所有已注册域名
        
        // 直接调用合约的getAllNames函数
        const allNames = await publicClient.readContract({
          address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
          abi: DOMAINS_ABI,
          functionName: 'getAllNames',
        });

        // 处理获取到的域名数据
        
        if (allNames && Array.isArray(allNames) && allNames.length > 0) {
          // 去重并取最新的域名
          const uniqueNames = Array.from(new Set(allNames as string[]));
          const latestDomains = uniqueNames
            .slice(-20)
            .reverse()
            .map(name => `${name}.okb`);
          
          setDomains(latestDomains);
          console.log('处理后的域名列表:', latestDomains);
        } else {
          console.log('没有找到已注册的域名');
          setDomains([]);
        }
      } catch (error) {
        console.error('获取域名列表失败:', error);
        setDomains([]);
      } finally {
        setLoading(false);
      }
    };

    loadDomains();

    // 每30秒刷新一次
    const interval = setInterval(loadDomains, 30000);
    return () => clearInterval(interval);
  }, [publicClient]);

  if (loading) {
    return (
      <ScrollingContainer>
        <ScrollingTitle>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            border: '2px solid rgba(0, 255, 127, 0.3)',
            borderTop: '2px solid #00ff7f',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
{t('home.loadingDomains')}
        </ScrollingTitle>
      </ScrollingContainer>
    );
  }

  if (domains.length === 0) {
    return null; // 没有数据时不显示
  }

  return (
    <ScrollingContainer>
      <ScrollingTitle>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
{t('home.recentDomains')} ({domains.length})
      </ScrollingTitle>
      <ScrollingTrack>
        {/* 为了让滚动效果明显，重复显示域名，但用间隔分开 */}
        {(() => {
          if (domains.length < 5) {
            // 域名少时，重复多次并加间隔
            const repeatedDomains = [];
            for (let i = 0; i < 4; i++) {
              repeatedDomains.push(...domains);
              // 在每组域名之间添加一些空间
              if (i < 3) {
                repeatedDomains.push(`spacer-${i}`);
              }
            }
            return repeatedDomains.map((domain, index) => {
              if (domain.startsWith('spacer-')) {
                return <div key={domain} style={{ width: '60px' }}></div>;
              }
              return (
                <DomainItem key={`${domain}-${index}`}>
                  {domain}
                </DomainItem>
              );
            });
          } else {
            // 域名多时，只重复一次
            return [...domains, ...domains].map((domain, index) => (
              <DomainItem key={`${domain}-${index}`}>
                {domain}
              </DomainItem>
            ));
          }
        })()}
      </ScrollingTrack>
    </ScrollingContainer>
  );
};

export const RainbowHomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  // 动态设置浏览器标题
  useEffect(() => {
    document.title = `${t('app.title')} - ${t('home.subtitle')}`;
  }, [t, i18n.language]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [confirming, setConfirming] = useState(false);
  
  // 自定义提示框状态
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'warning' }>({
    show: false,
    message: '',
    type: 'error'
  });

  // 显示提示框的函数
  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // 语言切换函数
  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  // 添加点击外部和ESC键隐藏搜索结果的功能
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // 如果点击的不是搜索相关的元素，就隐藏搜索结果
      if (!target.closest('.search-container') && !target.closest('.search-result')) {
        setSearchResult(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchResult(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isXLayer = chainId === 196; // X Layer chain ID

  const handleSearch = async () => {
    if (!searchTerm.trim() || !publicClient) return;
    
    setLoading(true);
    try {
      const domain = searchTerm.trim().toLowerCase();
      const cleanDomain = domain.replace('.okb', '');
      
      // 验证域名格式
      if (!/^[a-zA-Z0-9-]+$/.test(cleanDomain)) {
        showToast(t('error.invalidFormat'), 'error');
        setLoading(false);
        return;
      }
      
      if (cleanDomain.length < 1 || cleanDomain.length > 50) {
        showToast(t('error.invalidLength'), 'error');
        setLoading(false);
        return;
      }
      
      console.log('搜索域名:', cleanDomain);
      
      // 检查域名是否已被注册
      const owner = await publicClient.readContract({
        address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
        abi: DOMAINS_ABI,
        functionName: 'domains',
        args: [cleanDomain],
      });

      const available = owner === '0x0000000000000000000000000000000000000000';
      
      // 获取该域名的动态价格
      const priceWei = await publicClient.readContract({
        address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
        abi: DOMAINS_ABI,
        functionName: 'price',
        args: [cleanDomain],
      });

      const price = ethers.utils.formatEther((priceWei as bigint).toString());

      const result = {
        name: `${cleanDomain}.okb`,
        available,
        price,
        owner: available ? undefined : owner,
      };

      console.log('搜索结果:', result);
      setSearchResult(result);
    } catch (error) {
      console.error('Search error:', error);
      showToast(t('error.searchFailed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!searchResult || !searchResult.available || !isConnected) return;
    
    console.log('开始注册域名:', searchResult.name);
    console.log('当前网络:', chainId);
    console.log('钱包连接状态:', isConnected);
    console.log('钱包客户端:', walletClient);

    if (!isXLayer) {
      showToast(t('error.wrongNetwork'), 'warning');
      return;
    }

    if (!walletClient) {
      showToast(t('error.walletNotReady'), 'warning');
      return;
    }

    setRegistering(true);
    try {
      const cleanDomain = searchResult.name.replace('.okb', '');
      console.log('注册域名 (去除后缀):', cleanDomain);
      
      // 合约已解除暂停，可以正常注册
      
      // 检查域名长度 (1-50 字符)
      if (cleanDomain.length < 1 || cleanDomain.length > 50) {
        showToast(t('error.invalidLength'), 'error');
        return;
      }
      
      // 再次验证域名格式
      const isValidDomain = await publicClient?.readContract({
        address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
        abi: DOMAINS_ABI,
        functionName: 'valid',
        args: [cleanDomain],
      });
      
      console.log('域名格式验证:', isValidDomain);
      console.log('域名长度:', cleanDomain.length);
      
      if (!isValidDomain) {
        showToast(t('error.invalidFormat'), 'error');
        return;
      }
      
      // 检查余额
      const balance = await publicClient?.getBalance({
        address: address as `0x${string}`,
      });
      console.log('当前余额 (wei):', balance?.toString());
      
      // 获取该域名的动态价格（基于长度）
      let priceWei = BigInt('30000000000000000'); // 默认0.03 OKB
      try {
        const contractPrice = await publicClient?.readContract({
          address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
          abi: DOMAINS_ABI,
          functionName: 'price',
          args: [cleanDomain], // 新合约需要域名参数来计算价格
        });
        priceWei = contractPrice as bigint;
        console.log(`域名"${cleanDomain}"的价格 (wei):`, priceWei.toString());
        console.log(`域名"${cleanDomain}"的价格 (OKB):`, ethers.utils.formatEther(priceWei.toString()));
      } catch (error) {
        console.log('无法获取合约价格，使用默认价格 0.03 OKB');
        console.log('默认价格 (wei):', priceWei.toString());
      }
      
      console.log('价格比较:');
      console.log('- 用户余额:', balance?.toString(), 'wei');
      console.log('- 需要价格:', priceWei.toString(), 'wei');
      console.log('- 价格 (OKB):', ethers.utils.formatEther(priceWei.toString()));
      
      if (balance && balance < priceWei) {
        showToast(t('error.insufficientFunds'), 'error');
        return;
      }

      // 再次检查域名是否已被注册（防止并发注册）
      const currentOwner = await publicClient?.readContract({
        address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
        abi: DOMAINS_ABI,
        functionName: 'domains',
        args: [cleanDomain],
      });
      
      console.log('当前域名拥有者:', currentOwner);
      
      if (currentOwner !== '0x0000000000000000000000000000000000000000') {
        showToast(t('error.domainTaken'), 'error');
        setSearchResult({ ...searchResult, available: false, owner: currentOwner });
        return;
      }

      // 注册域名
      console.log('调用合约注册...');
      console.log('发送价值:', priceWei.toString(), 'wei');
      console.log('注册参数:', [cleanDomain]);
      
      const hash = await walletClient.writeContract({
        address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
        abi: DOMAINS_ABI,
        functionName: 'register',
        args: [cleanDomain],
        value: priceWei,
        gas: BigInt(500000), // 提高gas限制到500k
      });

      console.log('交易已提交，哈希:', hash);
      setRegistering(false);
      setConfirming(true);

      // 等待交易确认
      try {
        console.log('等待交易确认...');
        const receipt = await publicClient?.waitForTransactionReceipt({ 
          hash: hash as `0x${string}` 
        });
        
        console.log('交易确认收据:', receipt);
        
        if (receipt?.status === 'success') {
          showToast(`🎉 ${t('register.success')}\n${searchResult.name}`, 'success');
          setSearchResult(null);
          setSearchTerm('');
        } else {
          showToast(t('register.error'), 'error');
        }
      } catch (confirmError) {
        console.error('等待确认时出错:', confirmError);
        showToast(`⏳ ${t('register.submitted')}`, 'warning');
      } finally {
        setConfirming(false);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // 更详细的错误信息
      let errorMessage = '注册失败';
      let errorType: 'error' | 'warning' = 'error';
      
      if (error.message) {
        if (error.message.includes('insufficient funds')) {
          errorMessage = t('error.insufficientFunds');
        } else if (error.message.includes('user rejected') || error.message.includes('User rejected')) {
          errorMessage = t('error.userCancelled');
          errorType = 'warning';
        } else if (error.message.includes('AlreadyRegistered')) {
          errorMessage = t('error.domainTaken');
        } else if (error.message.includes('InvalidName')) {
          errorMessage = t('error.invalidFormat');
        } else if (error.message.includes('network')) {
          errorMessage = t('error.networkError');
        } else {
          errorMessage = t('register.error');
        }
      }
      
      showToast(errorMessage, errorType);
    } finally {
      setRegistering(false);
      setConfirming(false);
    }
  };


  return (
    <PageContainer>
      {/* 自定义提示框 */}
      <ToastContainer show={toast.show} type={toast.type}>
        {toast.message}
      </ToastContainer>
      
      <TopBar>
        <Logo>
          <img src="/logo.svg" alt="Logo" style={{ width: '36px', height: '36px' }} />
          {t('app.title')}
        </Logo>
        <WalletSection>
          <LanguageToggle onClick={toggleLanguage}>
            {i18n.language === 'zh' ? 'EN' : 'ZH'}
          </LanguageToggle>
          
          {isConnected && (
            <MyDomainsButton to="/names">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-desktop">{t('nav.myNames')}</span>
              <span className="text-mobile" style={{ display: 'none' }}></span>
            </MyDomainsButton>
          )}
          
          <StyledConnectButton>
            <ConnectButton />
          </StyledConnectButton>
        </WalletSection>
      </TopBar>
      
      <MainContent>
        <HeroTitle>{t('home.title')}</HeroTitle>
        <HeroSubtitle>
          {t('home.subtitle')}
        </HeroSubtitle>
        
        <SearchCard>
          <SearchTitle>{t('search.title')}</SearchTitle>
          <SearchSubtitle>{t('search.subtitle')}</SearchSubtitle>
          
          
          <SearchContainer className="search-container">
            <SearchInput
              type="text"
              placeholder={t('search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <DomainSuffix>.okb</DomainSuffix>
            <RegisterButton
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  {t('search.loading')}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('search.button')}
                </>
              )}
            </RegisterButton>
          </SearchContainer>

          {searchResult && (
            <ResultCard available={searchResult.available} className="search-result">
              <FlexCol gap={16}>
                <FlexRow justify="space-between" align="center">
                  <h3 style={{ color: '#f8fafc', margin: 0, fontSize: '1.2rem' }}>
                    {searchResult.name}
                  </h3>
                  <StatusBadge available={searchResult.available}>
                    {searchResult.available ? `✅ ${t('search.available')}` : `❌ ${t('search.unavailable')}`}
                  </StatusBadge>
                </FlexRow>

                {searchResult.available && (
                  <>
                    <PriceCard>
                      <PriceAmount>{searchResult.price} OKB</PriceAmount>
                      <PriceLabel>{t('register.cost')}</PriceLabel>
                    </PriceCard>
                    
                    <Button
                      variant="primary"
                      onClick={handleRegister}
                      disabled={!isConnected || registering || confirming}
                      style={{ width: '100%', marginTop: '16px' }}
                    >
                      {registering ? (
                        <>
                          <LoadingSpinner />
                          {t('register.connecting')}
                        </>
                      ) : confirming ? (
                        <>
                          <LoadingSpinner />
                          {t('register.confirming')}
                        </>
                      ) : !isConnected ? (
                        t('wallet.connect')
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {t('register.button')}
                        </>
                      )}
                    </Button>
                  </>
                )}
              </FlexCol>
            </ResultCard>
          )}
        </SearchCard>
        
        <ScrollingDomains />
      </MainContent>

    </PageContainer>
  );
};
