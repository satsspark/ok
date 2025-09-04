import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, usePublicClient, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { Button, FlexCol, FlexRow, Input } from '../styles/GlobalStyles';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at top left, rgba(0, 255, 127, 0.03) 0%, transparent 60%),
    radial-gradient(ellipse at top right, rgba(16, 185, 129, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse at bottom center, rgba(0, 255, 127, 0.02) 0%, transparent 70%),
    #0a0e13;
  position: relative;
  overflow: hidden;

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

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const Title = styled.h1`
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

const Subtitle = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 32px;
  line-height: 1.6;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 24px;
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

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #f8fafc;
  text-decoration: none;
  
  &:hover {
    color: #f8fafc;
  }
  
  img {
    width: 28px;
    height: 28px;
    filter: drop-shadow(0 0 8px rgba(172, 251, 7, 0.6));
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    
    img {
      width: 24px;
      height: 24px;
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
    padding: 8px 12px;
    font-size: 0.8rem;
    
    .text-desktop {
      display: none;
    }
  }

  @media (min-width: 769px) {
    .text-mobile {
      display: none;
    }
  }
`;

// 自定义RainbowKit按钮样式
const DomainsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const DomainCard = styled.div`
  background: rgba(15, 20, 25, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 127, 0.2);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  animation: ${slideUp} 0.3s ease-out;
  
  &:hover {
    border-color: rgba(0, 255, 127, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 255, 127, 0.1);
  }
`;

const DomainName = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #f8fafc;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 20px;
    height: 20px;
    fill: #00ff7f;
    filter: drop-shadow(0 0 4px rgba(0, 255, 127, 0.4));
  }
`;

const DomainInfo = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const InfoLabel = styled.span`
  color: #94a3b8;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: #f8fafc;
  font-family: 'SF Mono', monospace;
  font-size: 0.9rem;
  font-weight: 500;
`;

const DomainActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionButton = styled(Button)`
  padding: 10px 16px;
  font-size: 0.85rem;
  height: 40px;
  border-radius: 10px;
  flex: 1;
  min-width: 120px;
  
  &.primary {
    background: linear-gradient(135deg, #00ff7f 0%, #32cd32 100%);
    color: #000000;
    border: none;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(0, 255, 127, 0.4);
    }
  }
  
  &.secondary {
    background: rgba(0, 255, 127, 0.1);
    color: #00ff7f;
    border: 1px solid rgba(0, 255, 127, 0.3);
    
    &:hover {
      background: rgba(0, 255, 127, 0.15);
      border-color: rgba(0, 255, 127, 0.5);
    }
  }
  
  &.danger {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
    
    &:hover {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.5);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #94a3b8;
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
  opacity: 0.3;
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid rgba(0, 255, 127, 0.3);
  border-top: 4px solid #00ff7f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 40px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const RecordEditor = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(0, 255, 127, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`;

const RecordInput = styled(Input)`
  margin-bottom: 12px;
  height: 40px;
  font-size: 0.9rem;
`;

// 合约地址和ABI
const DOMAINS_CONTRACT_ADDRESS = '0x74b87a44F885494c445478328748DF7a6Ff423c6';
const DOMAINS_ABI = [
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
  {
    "inputs": [{"internalType": "string", "name": "name", "type": "string"}],
    "name": "getTwitter",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

interface MyDomainInfo {
  name: string;
  owner: string;
  price: string;
}

export const MyNamesPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  
  const [domains, setDomains] = useState<MyDomainInfo[]>([]);
  const [loading, setLoading] = useState(false);

  // 动态设置浏览器标题
  useEffect(() => {
    document.title = `${t('manage.title')} - ${t('app.title')}`;
  }, [t, i18n.language]);

  // 语言切换函数
  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  const isXLayer = chainId === 196;

  useEffect(() => {
    if (address && isXLayer) {
      loadUserDomains();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isXLayer]);

  const loadUserDomains = async () => {
    if (!address || !publicClient) return;
    
    setLoading(true);
    try {
      // 生产环境移除调试日志
      
      // 获取所有域名
      const allNames = await publicClient.readContract({
        address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
        abi: DOMAINS_ABI,
        functionName: 'getAllNames',
      });

      // 调试日志已移除

      const userDomains: MyDomainInfo[] = [];
      
      for (const name of allNames as string[]) {
        // 检查域名所有权
        
        // 检查域名拥有者
        const owner = await publicClient.readContract({
          address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
          abi: DOMAINS_ABI,
          functionName: 'domains',
          args: [name],
        });

        if ((owner as string).toLowerCase() === address.toLowerCase()) {
          
          // 获取价格
          const priceWei = await publicClient.readContract({
            address: DOMAINS_CONTRACT_ADDRESS as `0x${string}`,
            abi: DOMAINS_ABI,
            functionName: 'price',
            args: [name],
          });

          userDomains.push({
            name: `${name}.okb`,
            owner: owner as string,
            price: ethers.utils.formatEther((priceWei as bigint).toString()),
          });
        }
      }

      // 设置用户域名数据
      setDomains(userDomains);
    } catch (error) {
      console.error('Error loading domains:', error);
      // 使用toast通知替代alert
      console.error('Error loading domains:', error);
    } finally {
      setLoading(false);
    }
  };



  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  };

  if (!isConnected) {
    return (
      <PageContainer>
        <TopBar>
          <Logo to="/">
            <img src="/logo.svg" alt="Logo" style={{ width: '36px', height: '36px' }} />
            {t('app.title')}
          </Logo>
          <WalletSection>
            <LanguageToggle onClick={toggleLanguage}>
              {i18n.language === 'zh' ? 'EN' : 'ZH'}
            </LanguageToggle>
            <StyledConnectButton>
              <ConnectButton />
            </StyledConnectButton>
          </WalletSection>
        </TopBar>
        <Container>
          <Header>
            <Title>{t('names.title')}</Title>
            <Subtitle>{t('names.connectWallet')}</Subtitle>
          </Header>
        </Container>
      </PageContainer>
    );
  }

  if (!isXLayer) {
    return (
      <PageContainer>
        <TopBar>
          <Logo to="/">
            <img src="/logo.svg" alt="Logo" style={{ width: '36px', height: '36px' }} />
            {t('app.title')}
          </Logo>
          <WalletSection>
            <StyledConnectButton>
              <ConnectButton />
            </StyledConnectButton>
          </WalletSection>
        </TopBar>
        <Container>
          <Header>
            <Title>{t('names.title')}</Title>
            <Subtitle>{t('names.switchNetwork')}</Subtitle>
          </Header>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TopBar>
        <Logo to="/">
          <img src="/logo.svg" alt="Logo" style={{ width: '36px', height: '36px' }} />
          {t('app.title')}
        </Logo>
        <WalletSection>
          <LanguageToggle onClick={toggleLanguage}>
            {i18n.language === 'zh' ? 'EN' : '中文'}
          </LanguageToggle>
          <StyledConnectButton>
            <ConnectButton />
          </StyledConnectButton>
        </WalletSection>
      </TopBar>
      
      <Container>
        <Header>
          <Title>{t('names.title')}</Title>
          <Subtitle>{t('names.subtitle')}</Subtitle>
          <Button 
            variant="outline" 
            onClick={loadUserDomains}
            disabled={loading}
            style={{ marginTop: '16px' }}
          >
{loading ? t('common.loading') : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '6px' }}>
                  <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t('names.refresh')}
              </>
            )}
          </Button>
        </Header>

        {loading ? (
          <LoadingSpinner />
        ) : domains.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '80px', height: '80px', opacity: '0.3' }}>
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </EmptyIcon>
            <h3 style={{ color: '#f8fafc', marginBottom: '12px', fontSize: '1.5rem' }}>
              {t('names.empty.title')}
            </h3>
            <p style={{ marginBottom: '24px' }}>
              {t('names.empty.description')}
            </p>
          </EmptyState>
        ) : (
          <>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <p style={{ color: '#94a3b8' }}>
                {i18n.language === 'zh' ? (
                  <>您拥有 <strong style={{ color: '#00ff7f' }}>{domains.length}</strong> 个域名</>
                ) : (
                  <>You own <strong style={{ color: '#00ff7f' }}>{domains.length}</strong> domains</>
                )}
              </p>
            </div>
            
            <DomainsGrid>
              {domains.map((domain, index) => (
                <DomainCard key={domain.name} style={{ animationDelay: `${index * 0.1}s` }}>
                  <DomainName>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {domain.name}
                  </DomainName>
                  
                  <DomainInfo>
                    <InfoRow>
                      <InfoLabel>{t('manage.owner')}</InfoLabel>
                      <InfoValue>{formatAddress(domain.owner)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{t('manage.registrationFee')}</InfoLabel>
                      <InfoValue>{domain.price} OKB</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{t('manage.type')}</InfoLabel>
                      <InfoValue>{t('manage.permanent')}</InfoValue>
                    </InfoRow>
                  </DomainInfo>


                </DomainCard>
              ))}
            </DomainsGrid>
          </>
        )}
      </Container>
    </PageContainer>
  );
};
