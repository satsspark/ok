import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { Card, Button, FlexCol, FlexRow, Text, Input } from '../styles/GlobalStyles';
import { useWallet } from '../hooks/useWallet';
import { useENS } from '../hooks/useENS';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const HeroSection = styled.section`
  padding: 80px 0 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeInUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const SearchSection = styled.section`
  max-width: 1000px;
  margin: 0 auto 80px;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const SearchCard = styled(Card)`
  padding: 60px 80px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 40px 32px;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const DomainSuffix = styled.span`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-weight: 600;
  pointer-events: none;
`;

const SearchButton = styled(Button)`
  width: 100%;
  margin-bottom: 24px;
  font-size: 1.1rem;
  padding: 20px;
`;

const ResultCard = styled.div<{ available?: boolean }>`
  background: ${props => props.available 
    ? 'rgba(16, 185, 129, 0.1)' 
    : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.available 
    ? 'rgba(16, 185, 129, 0.3)' 
    : 'rgba(239, 68, 68, 0.3)'};
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
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => props.available 
    ? 'rgba(16, 185, 129, 0.2)' 
    : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.available ? '#10b981' : '#ef4444'};
`;

const PriceDisplay = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  margin: 24px 0;
`;

const PriceAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const PriceLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const DurationSelector = styled.select`
  padding: 16px 20px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 12px;
  font-size: 16px;
  background: rgba(30, 41, 59, 0.4);
  color: #f8fafc;
  cursor: pointer;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 40px 32px;
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid rgba(71, 85, 105, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(16, 185, 129, 0.3);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-top: 2px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const IntegratedHomePage: React.FC = () => {
  const { t } = useTranslation();
  const { isConnected, switchToXLayer, chainId } = useWallet();
  const { checkDomainAvailability, registerDomain, loading } = useENS();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [duration, setDuration] = useState(1);
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

  const calculateTotalCost = () => {
    if (!searchResult?.price) return '0';
    const basePrice = parseFloat(searchResult.price);
    return (basePrice * duration).toFixed(4);
  };

  return (
    <FlexCol gap={0}>
      <HeroSection>
        <HeroTitle>
          OKB域名注册平台
        </HeroTitle>
        <HeroSubtitle>
          注册您专属的.okb域名，简化OKX链地址，建立Web3身份
        </HeroSubtitle>
      </HeroSection>

      <SearchSection>
        <SearchCard>
          <FlexCol gap={32}>
            <div>
              <h2 style={{ marginBottom: '16px', color: '#f8fafc', fontSize: '1.8rem' }}>
                搜索并注册域名
              </h2>
              <Text style={{ color: '#94a3b8', textAlign: 'center' }}>
                输入您想要的域名，立即查看可用性和价格
              </Text>
            </div>

            <SearchInputContainer>
              <Input
                type="text"
                placeholder="输入域名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{ paddingRight: '80px' }}
              />
              <DomainSuffix>.okb</DomainSuffix>
            </SearchInputContainer>

            <SearchButton
              variant="primary"
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? (
                <FlexRow gap={8} justify="center">
                  <LoadingSpinner />
                  搜索中...
                </FlexRow>
              ) : (
                '🔍 搜索域名'
              )}
            </SearchButton>

            {searchResult && (
              <ResultCard available={searchResult.available}>
                <FlexCol gap={24}>
                  <FlexRow justify="space-between" align="center">
                    <h3 style={{ color: '#f8fafc', margin: 0, fontSize: '1.5rem' }}>
                      {searchResult.name}
                    </h3>
                    <StatusBadge available={searchResult.available}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: searchResult.available ? '#10b981' : '#ef4444' 
                      }} />
                      {searchResult.available ? '可用' : '不可用'}
                    </StatusBadge>
                  </FlexRow>

                  {searchResult.available ? (
                    <FlexCol gap={24}>
                      <FlexRow gap={20} align="center">
                        <div>
                          <Text size="small" style={{ marginBottom: '8px', color: '#94a3b8' }}>
                            注册时长
                          </Text>
                          <DurationSelector
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                          >
                            <option value={1}>1 年</option>
                            <option value={2}>2 年</option>
                            <option value={3}>3 年</option>
                            <option value={5}>5 年</option>
                          </DurationSelector>
                        </div>
                      </FlexRow>

                      <PriceDisplay>
                        <PriceAmount>{calculateTotalCost()} OKT</PriceAmount>
                        <PriceLabel>
                          {duration} 年 • {searchResult.price} OKT/年
                        </PriceLabel>
                      </PriceDisplay>

                      <Button
                        variant="primary"
                        onClick={handleRegister}
                        disabled={!isConnected || registering}
                        style={{ width: '100%', fontSize: '1.1rem', padding: '20px' }}
                      >
                        {registering ? (
                          <FlexRow gap={8} justify="center">
                            <LoadingSpinner />
                            注册中...
                          </FlexRow>
                        ) : !isConnected ? (
                          '请先连接钱包'
                        ) : !isXLayer ? (
                          '切换到X Layer'
                        ) : (
                          '🚀 注册域名'
                        )}
                      </Button>
                    </FlexCol>
                  ) : (
                    <Text style={{ color: '#94a3b8' }}>
                      该域名已被注册，请尝试其他域名。
                    </Text>
                  )}
                </FlexCol>
              </ResultCard>
            )}
          </FlexCol>
        </SearchCard>
      </SearchSection>

      <section style={{ marginBottom: '80px' }}>
        <StatsGrid>
          <StatCard>
            <StatNumber>50K+</StatNumber>
            <StatLabel>已注册域名</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>25K+</StatNumber>
            <StatLabel>独立拥有者</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>100+</StatNumber>
            <StatLabel>集成应用</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>99.9%</StatNumber>
            <StatLabel>网络正常运行时间</StatLabel>
          </StatCard>
        </StatsGrid>
      </section>
    </FlexCol>
  );
};
