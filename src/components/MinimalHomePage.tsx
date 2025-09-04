import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button, FlexCol, FlexRow, Input } from '../styles/GlobalStyles';
import { useWallet } from '../hooks/useWallet';
import { useENS } from '../hooks/useENS';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const MainContent = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #888888;
  margin-bottom: 48px;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 32px;
`;

const SearchInput = styled(Input)`
  width: 100%;
  height: 64px;
  font-size: 1.1rem;
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: #ffffff;
  text-align: center;
  
  &::placeholder {
    color: #666666;
    text-align: center;
  }
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ActionButton = styled(Button)`
  width: 100%;
  height: 56px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  margin-bottom: 16px;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #374151;
    color: #6b7280;
    cursor: not-allowed;
    transform: none;
  }
`;

const ConnectButton = styled(ActionButton)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const ResultCard = styled.div<{ available?: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.available ? '#10b981' : '#ef4444'};
  border-radius: 16px;
  padding: 32px;
  margin-top: 24px;
  text-align: left;
`;

const StatusBadge = styled.span<{ available?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => props.available ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.available ? '#10b981' : '#ef4444'};
`;

const PriceDisplay = styled.div`
  background: #3b82f6;
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
`;

const PriceAmount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const WalletInfo = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const AddressDisplay = styled.div`
  color: #ffffff;
  font-family: monospace;
  font-size: 0.9rem;
`;

const DisconnectBtn = styled.button`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const MinimalHomePage: React.FC = () => {
  const { t } = useTranslation();
  const { isConnected, address, connectWallet, disconnectWallet, isConnecting, chainId, switchToXLayer } = useWallet();
  const { checkDomainAvailability, registerDomain, loading } = useENS();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [registering, setRegistering] = useState(false);

  const isXLayer = chainId === 196;

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
      {isConnected && (
        <WalletInfo>
          <AddressDisplay>{formatAddress(address!)}</AddressDisplay>
          <DisconnectBtn onClick={disconnectWallet}>断开</DisconnectBtn>
        </WalletInfo>
      )}
      
      <MainContent>
        <Title>您的 web3 用户名</Title>
        <Subtitle>
          您在 web3 上的身份，一个名称就能解析到您所有的加密地址和您的去中心化网站。
        </Subtitle>
        
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="搜索名称"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (isConnected ? handleSearch() : connectWallet())}
          />
        </SearchContainer>

        {!isConnected ? (
          <ConnectButton onClick={connectWallet} disabled={isConnecting}>
            {isConnecting ? (
              <>
                <LoadingSpinner />
                连接中...
              </>
            ) : (
              '连接钱包'
            )}
          </ConnectButton>
        ) : (
          <ActionButton 
            onClick={searchResult ? handleRegister : handleSearch}
            disabled={loading || registering || !searchTerm.trim()}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                搜索中...
              </>
            ) : registering ? (
              <>
                <LoadingSpinner />
                注册中...
              </>
            ) : searchResult ? (
              searchResult.available ? '注册域名' : '域名不可用'
            ) : (
              '搜索域名'
            )}
          </ActionButton>
        )}

        {searchResult && (
          <ResultCard available={searchResult.available}>
            <FlexCol gap={16}>
              <FlexRow justify="space-between" align="center">
                <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.3rem' }}>
                  {searchResult.name}
                </h3>
                <StatusBadge available={searchResult.available}>
                  {searchResult.available ? '✓ 可用' : '✗ 不可用'}
                </StatusBadge>
              </FlexRow>

              {searchResult.available && (
                <PriceDisplay>
                  <PriceAmount>{searchResult.price || '0.1'} OKT</PriceAmount>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>1年注册费用</div>
                </PriceDisplay>
              )}
            </FlexCol>
          </ResultCard>
        )}
      </MainContent>
    </PageContainer>
  );
};
