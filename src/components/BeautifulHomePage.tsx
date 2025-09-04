import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { Button, FlexCol, FlexRow, Input } from '../styles/GlobalStyles';
import { useWallet } from '../hooks/useWallet';
import { useENS } from '../hooks/useENS';


const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 127, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 127, 0.6); }
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
  background: rgba(10, 14, 19, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(30, 41, 59, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #f8fafc;
  
  &::before {
    content: '⬢';
    font-size: 1.8rem;
    color: #00ff7f;
    filter: drop-shadow(0 0 8px rgba(0, 255, 127, 0.6));
  }
`;

const WalletSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MyDomainsButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
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

  &:hover {
    background: rgba(0, 255, 127, 0.1);
    border-color: rgba(0, 255, 127, 0.6);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const WalletButton = styled(Button)`
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  background: linear-gradient(135deg, #00ff7f 0%, #32cd32 100%);
  color: #000000;
  border: none;
  position: relative;
  overflow: hidden;
  
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
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 255, 127, 0.5);
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(16px);
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 127, 0.4);
`;

const AddressDisplay = styled.div`
  color: #f8fafc;
  font-family: 'SF Mono', monospace;
  font-size: 0.9rem;
  font-weight: 500;
`;

const DisconnectBtn = styled.button`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(239, 68, 68, 0.3);
  }
`;

const MainContent = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 10;
  margin-top: 100px;
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
    padding: 24px 20px;
  }
`;

const SearchTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 8px;
`;

const SearchSubtitle = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 24px;
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
`;

const DomainSuffix = styled.div`
  color: #00ff7f;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0 10px;
  pointer-events: none;
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
  gap: 8px;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${props => props.available 
    ? 'rgba(0, 255, 127, 0.15)' 
    : 'rgba(239, 68, 68, 0.15)'};
  color: ${props => props.available ? '#00ff7f' : '#ef4444'};
  border: 1px solid ${props => props.available ? 'rgba(0, 255, 127, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
  backdrop-filter: blur(10px);
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

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 60px;
`;

const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  border: 1px solid rgba(0, 255, 127, 0.3);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 255, 127, 0.6);
    box-shadow: 0 20px 40px rgba(0, 255, 127, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff7f 0%, #32cd32 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid rgba(0, 255, 127, 0.3);
  border-top: 3px solid #00ff7f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 12px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const BeautifulHomePage: React.FC = () => {
  const { t } = useTranslation();
  const { isConnected, address, connectWallet, disconnectWallet, isConnecting, chainId, switchToXLayer } = useWallet();
  const { checkDomainAvailability, registerDomain, loading } = useENS();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [registering, setRegistering] = useState(false);


  const isXLayer = chainId === 196; // X Layer chain ID

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const domain = searchTerm.trim().toLowerCase();
      const fullDomain = domain.endsWith('.okb') ? domain : `${domain}.okb`;
      const result = await checkDomainAvailability(fullDomain);
      setSearchResult(result);
    } catch (error) {
      console.error('Search error:', error);
      alert('搜索出错，请重试');
    }
  };

  const handleRegister = async () => {
    if (!searchResult || !searchResult.available || !isConnected) return;

    if (!isXLayer) {
      switchToXLayer();
      return;
    }

    setRegistering(true);
    try {
      const txHash = await registerDomain(searchResult.name);
      alert(`域名注册成功！交易哈希: ${txHash}`);
      setSearchResult(null);
      setSearchTerm('');
    } catch (error) {
      console.error('Registration error:', error);
      alert('注册失败，请重试');
    } finally {
      setRegistering(false);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };



  return (
    <PageContainer>
      <TopBar>
        <Logo>OKB 域名服务</Logo>
        <WalletSection>
          {isConnected && (
            <MyDomainsButton>
              📋 我的域名
            </MyDomainsButton>
          )}
          
          {!isConnected ? (
            <WalletButton onClick={connectWallet} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <LoadingSpinner />
                  连接中...
                </>
              ) : (
                '🦊 连接 OKX 钱包'
              )}
            </WalletButton>
          ) : (
            <WalletInfo>
              <AddressDisplay>{formatAddress(address!)}</AddressDisplay>
              <DisconnectBtn onClick={disconnectWallet}>断开</DisconnectBtn>
            </WalletInfo>
          )}
        </WalletSection>
      </TopBar>
      
      <MainContent>
        <HeroTitle>打造您的 Web3 身份</HeroTitle>
        <HeroSubtitle>
          注册专属的 .okb 域名，简化复杂地址，构建去中心化数字身份
        </HeroSubtitle>
        
        <SearchCard>
          <SearchTitle>搜索域名</SearchTitle>
          <SearchSubtitle>输入您想要的域名，立即查看可用性</SearchSubtitle>
          
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="输入您想要的域名"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <DomainSuffix>.okb</DomainSuffix>
            <RegisterButton
              onClick={searchResult?.available ? (!isConnected ? connectWallet : handleRegister) : handleSearch}
              disabled={loading || registering || (!searchResult?.available && searchResult) || (!isConnected && isConnecting)}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  搜索
                </>
              ) : registering ? (
                <>
                  <LoadingSpinner />
                  注册
                </>
              ) : searchResult?.available ? (
                !isConnected ? '连接钱包' : '注册'
              ) : searchResult ? (
                '不可用'
              ) : (
                '搜索'
              )}
            </RegisterButton>
          </SearchContainer>

          {searchResult && (
            <ResultCard available={searchResult.available}>
              <FlexCol gap={20}>
                <FlexRow justify="space-between" align="center">
                  <h3 style={{ color: '#f8fafc', margin: 0, fontSize: '1.2rem' }}>
                    {searchResult.name}
                  </h3>
                  <StatusBadge available={searchResult.available}>
                    {searchResult.available ? '✅ 可用' : '❌ 不可用'}
                  </StatusBadge>
                </FlexRow>

                {searchResult.available && (
                  <PriceCard>
                    <PriceAmount>{searchResult.price || '0.1'} OKT</PriceAmount>
                    <PriceLabel>1年注册费用</PriceLabel>
                  </PriceCard>
                )}
              </FlexCol>
            </ResultCard>
          )}
        </SearchCard>


      </MainContent>


    </PageContainer>
  );
};
