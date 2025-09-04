import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useWallet } from '../hooks/useWallet';
import { useENS } from '../hooks/useENS';
import { Card, Button, FlexRow, FlexCol, Badge, Text, LoadingSpinner } from '../styles/GlobalStyles';

const DomainCard = styled(Card)`
  border-left: 4px solid #667eea;
  margin-bottom: 16px;
`;

const DomainName = styled.h3`
  color: #333;
  margin: 0;
  font-size: 1.25rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.3;
`;

export const DomainManager: React.FC = () => {
  const { t } = useTranslation();
  const { address, isConnected } = useWallet();
  const { getUserDomains, loading } = useENS();
  const [domains, setDomains] = useState<any[]>([]);

  useEffect(() => {
    if (address && isConnected) {
      loadUserDomains();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);

  const loadUserDomains = async () => {
    if (!address) return;
    
    try {
      const userDomains = await getUserDomains(address);
      setDomains(userDomains);
    } catch (error) {
      console.error('Error loading domains:', error);
    }
  };

  const handleRenew = (domain: string) => {
    // 实现续费逻辑
    console.log('Renewing domain:', domain);
    alert('续费功能开发中...');
  };

  const handleTransfer = (domain: string) => {
    // 实现转移逻辑
    console.log('Transferring domain:', domain);
    alert('转移功能开发中...');
  };

  const handleSetResolver = (domain: string) => {
    // 实现设置解析器逻辑
    console.log('Setting resolver for domain:', domain);
    alert('设置解析器功能开发中...');
  };

  if (!isConnected) {
    return (
      <Card>
        <EmptyState>
          <EmptyIcon>🔗</EmptyIcon>
          <Text size="large">请先连接钱包以查看您的域名</Text>
        </EmptyState>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <FlexRow justify="center" align="center" gap={12}>
          <LoadingSpinner />
          <Text>{t('common.loading')}</Text>
        </FlexRow>
      </Card>
    );
  }

  if (domains.length === 0) {
    return (
      <Card>
        <EmptyState>
          <EmptyIcon>🌐</EmptyIcon>
          <Text size="large">{t('manage.nodomains')}</Text>
          <Text>开始搜索并注册您的第一个ENS域名！</Text>
        </EmptyState>
      </Card>
    );
  }

  return (
    <FlexCol gap={16}>
      <Card>
        <h2 style={{ color: '#333', marginBottom: '8px' }}>{t('manage.title')}</h2>
        <Text>管理您拥有的ENS域名，包括续费、转移和设置解析器。</Text>
      </Card>

      {domains.map((domain, index) => (
        <DomainCard key={index}>
          <FlexCol gap={16}>
            <FlexRow justify="space-between" align="center">
              <DomainName>{domain.name}</DomainName>
              <Badge variant="success">已拥有</Badge>
            </FlexRow>

            {domain.expires && (
              <FlexRow align="center" gap={8}>
                <Text size="small">
                  {t('manage.expires')}: {domain.expires.toLocaleDateString()}
                </Text>
                {domain.expires < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                  <Badge variant="warning">即将到期</Badge>
                )}
              </FlexRow>
            )}

            <FlexRow gap={12}>
              <Button
                variant="primary"
                onClick={() => handleRenew(domain.name)}
              >
                {t('manage.renew')}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleTransfer(domain.name)}
              >
                {t('manage.transfer')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSetResolver(domain.name)}
              >
                {t('manage.setResolver')}
              </Button>
            </FlexRow>
          </FlexCol>
        </DomainCard>
      ))}
    </FlexCol>
  );
};
