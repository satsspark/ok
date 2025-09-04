import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { Card, Button, FlexCol, FlexRow, Text } from '../styles/GlobalStyles';

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
  padding: 120px 0 80px;
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
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 80px;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const PrimaryButton = styled(Button)`
  padding: 18px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  min-height: 60px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }

  &:hover::after {
    left: 100%;
  }
`;

const SecondaryButton = styled(Button)`
  padding: 18px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  min-height: 60px;
`;

const StatsSection = styled.section`
  margin-bottom: 120px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 32px 24px;
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

const FeaturesSection = styled.section`
  margin-bottom: 120px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  color: #f8fafc;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #94a3b8;
  text-align: center;
  margin-bottom: 80px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
`;

const FeatureCard = styled(Card)`
  text-align: center;
  padding: 48px 32px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 24px;
  animation: ${float} 3s ease-in-out infinite;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 16px;
`;

const FeatureDescription = styled.p`
  color: #94a3b8;
  line-height: 1.7;
  font-size: 1rem;
`;

const CTASection = styled.section`
  text-align: center;
  padding: 80px 0;
`;

const CTACard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 80px 48px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent, rgba(59, 130, 246, 0.1));
    opacity: 0.5;
    animation: ${float} 8s ease-in-out infinite;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
`;

const CTASubtitle = styled.p`
  font-size: 1.1rem;
  color: #94a3b8;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
`;

const CTAActions = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

interface ModernHomePageProps {
  onNavigate: (page: string) => void;
}

export const ModernHomePage: React.FC<ModernHomePageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <FlexCol gap={0}>
      <HeroSection>
        <HeroTitle>
          去中心化域名<br />掌控数字身份
        </HeroTitle>
        <HeroSubtitle>
          使用ENS域名系统注册您专属的.eth域名，简化加密货币地址，建立Web3身份
        </HeroSubtitle>
        <HeroActions>
          <PrimaryButton variant="primary" onClick={() => onNavigate('search')}>
            🔍 搜索域名
          </PrimaryButton>
          <SecondaryButton variant="secondary" onClick={() => onNavigate('manage')}>
            📋 管理域名
          </SecondaryButton>
        </HeroActions>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <StatNumber>2.8M+</StatNumber>
            <StatLabel>已注册域名</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>740K+</StatNumber>
            <StatLabel>独立拥有者</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>500+</StatNumber>
            <StatLabel>集成应用</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>99.9%</StatNumber>
            <StatLabel>网络正常运行时间</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <SectionTitle>为什么选择ENS域名？</SectionTitle>
        <SectionSubtitle>
          简化您的Web3体验，构建专属数字身份
        </SectionSubtitle>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🌐</FeatureIcon>
            <FeatureTitle>简化地址</FeatureTitle>
            <FeatureDescription>
              将复杂的以太坊地址转换为易记的域名，如 yourname.eth，让转账和交互更简单安全。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>完全控制</FeatureTitle>
            <FeatureDescription>
              您完全拥有和控制您的域名，可以自由转移、续费和设置解析记录，无需中介机构。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>Web3集成</FeatureTitle>
            <FeatureDescription>
              与DeFi协议、NFT平台和各种dApp无缝集成，构建您的去中心化数字身份。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>即时解析</FeatureTitle>
            <FeatureDescription>
              快速、可靠的域名解析服务，确保您的域名在整个Web3生态系统中正常工作。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>💎</FeatureIcon>
            <FeatureTitle>数字资产</FeatureTitle>
            <FeatureDescription>
              ENS域名本身就是有价值的数字资产，可以在二级市场进行交易和投资。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🌍</FeatureIcon>
            <FeatureTitle>全球通用</FeatureTitle>
            <FeatureDescription>
              在全球范围内得到广泛支持，与500+应用和服务集成，真正的去中心化标准。
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <CTASection>
        <CTACard>
          <CTATitle>开始您的Web3之旅</CTATitle>
          <CTASubtitle>
            立即搜索并注册您的专属ENS域名，只需几分钟即可完成
          </CTASubtitle>
          <CTAActions>
            <PrimaryButton variant="primary" onClick={() => onNavigate('search')}>
              🚀 立即开始
            </PrimaryButton>
            <SecondaryButton variant="outline" onClick={() => onNavigate('manage')}>
              📖 了解更多
            </SecondaryButton>
          </CTAActions>
        </CTACard>
      </CTASection>
    </FlexCol>
  );
};
