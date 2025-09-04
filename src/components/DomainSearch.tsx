import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useENS } from '../hooks/useENS';
import { Card, Button, Input, FlexRow, FlexCol, Badge, LoadingSpinner, Text } from '../styles/GlobalStyles';

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInputContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const SearchButton = styled(Button)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 20px;
  min-height: auto;
`;

const DomainSuffix = styled.span`
  position: absolute;
  right: 120px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-weight: 500;
  pointer-events: none;
`;

const ResultCard = styled(Card)`
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid #667eea;
`;

const PriceDisplay = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  text-align: center;
  margin: 16px 0;
`;

const PriceAmount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

const PriceLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const DurationSelector = styled.select`
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

interface DomainSearchProps {
  onRegister?: (domain: string, duration: number) => void;
}

export const DomainSearch: React.FC<DomainSearchProps> = ({ onRegister }) => {
  const { t } = useTranslation();
  const { checkDomainAvailability, registerDomain, loading, isConnected } = useENS();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [duration, setDuration] = useState(1);
  const [registering, setRegistering] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const domain = searchTerm.trim().toLowerCase();
      const fullDomain = domain.endsWith('.eth') ? domain : `${domain}.eth`;
      const result = await checkDomainAvailability(fullDomain);
      setSearchResult(result);
    } catch (error) {
      console.error('Search error:', error);
      alert(t('error.networkError'));
    }
  };

  const handleRegister = async () => {
    if (!searchResult || !searchResult.available || !isConnected) return;

    setRegistering(true);
    try {
      const txHash = await registerDomain(searchResult.name);
      alert(`${t('register.success')} 交易哈希: ${txHash}`);
      onRegister?.(searchResult.name, duration);
      setSearchResult(null);
      setSearchTerm('');
    } catch (error) {
      console.error('Registration error:', error);
      alert(t('register.error'));
    } finally {
      setRegistering(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const calculateTotalCost = () => {
    if (!searchResult?.price) return '0';
    const basePrice = parseFloat(searchResult.price);
    return (basePrice * duration).toFixed(4);
  };

  return (
    <SearchContainer>
      <Card style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(20px)', 
        border: '1px solid rgba(255, 255, 255, 0.1)' 
      }}>
        <FlexCol gap={24}>
          <div>
            <h2 style={{ marginBottom: '8px', color: 'white', fontSize: '2rem', fontWeight: '700' }}>{t('search.title')}</h2>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>搜索并注册您专属的.eth域名</Text>
          </div>

          <SearchInputContainer>
            <Input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ paddingRight: '140px' }}
            />
            <DomainSuffix>.eth</DomainSuffix>
            <SearchButton
              variant="primary"
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? <LoadingSpinner /> : t('search.button')}
            </SearchButton>
          </SearchInputContainer>

          {searchResult && (
            <ResultCard>
              <FlexCol gap={20}>
                <FlexRow justify="space-between" align="center">
                  <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
                    {searchResult.name}
                  </h3>
                  <Badge 
                    variant={searchResult.available ? 'success' : 'error'}
                  >
                    {searchResult.available ? t('search.available') : t('search.unavailable')}
                  </Badge>
                </FlexRow>

                {searchResult.available ? (
                  <FlexCol gap={20}>
                    <FlexRow gap={20} align="center">
                      <div>
                        <Text size="small" style={{ marginBottom: '4px' }}>
                          {t('register.duration')}
                        </Text>
                        <DurationSelector
                          value={duration}
                          onChange={(e) => setDuration(parseInt(e.target.value))}
                        >
                          <option value={1}>1 {t('register.years')}</option>
                          <option value={2}>2 {t('register.years')}</option>
                          <option value={3}>3 {t('register.years')}</option>
                          <option value={5}>5 {t('register.years')}</option>
                          <option value={10}>10 {t('register.years')}</option>
                        </DurationSelector>
                      </div>
                    </FlexRow>

                    <PriceDisplay>
                      <PriceAmount>{calculateTotalCost()} ETH</PriceAmount>
                      <PriceLabel>
                        {duration} {t('register.years')} • {searchResult.price} ETH/{t('register.years')}
                      </PriceLabel>
                    </PriceDisplay>

                    <Button
                      variant="primary"
                      onClick={handleRegister}
                      disabled={!isConnected || registering}
                      style={{ width: '100%' }}
                    >
                      {registering ? (
                        <FlexRow gap={8}>
                          <LoadingSpinner />
                          {t('register.confirming')}
                        </FlexRow>
                      ) : (
                        t('register.button')
                      )}
                    </Button>

                    {!isConnected && (
                      <Text size="small" style={{ textAlign: 'center', color: '#ff6b6b' }}>
                        {t('wallet.connect')}
                      </Text>
                    )}
                  </FlexCol>
                ) : (
                  <FlexCol gap={12}>
                    {searchResult.owner && (
                      <Text size="small">
                        拥有者: {searchResult.owner}
                      </Text>
                    )}
                    <Text>
                      该域名已被注册，请尝试其他域名。
                    </Text>
                  </FlexCol>
                )}
              </FlexCol>
            </ResultCard>
          )}
        </FlexCol>
      </Card>
    </SearchContainer>
  );
};
