import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { Card, Button, FlexCol, FlexRow, Text } from '../styles/GlobalStyles';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 100px 20px 80px;
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 24px;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 80px;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #00ff7f 0%, #32cd32 100%);
  color: #000;
  padding: 18px 36px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  box-shadow: 0 8px 30px rgba(0, 255, 127, 0.4);
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
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 50px rgba(0, 255, 127, 0.6);

    &::before {
      left: 100%;
    }
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(0, 0, 0, 0.6);
  color: #00ff7f;
  border: 2px solid rgba(0, 255, 127, 0.5);
  padding: 18px 36px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  backdrop-filter: blur(20px);
  
  &:hover {
    background: rgba(0, 255, 127, 0.1);
    border-color: #00ff7f;
    color: #00ff7f;
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 255, 127, 0.3);
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  animation: ${float} 6s ease-in-out infinite;
  opacity: 0.1;
  pointer-events: none;
`;

const StatsSection = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  margin-bottom: 80px;
  border: 1px solid rgba(0, 255, 127, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

const StatItem = styled.div`
  color: white;
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #00ff7f 0%, #32cd32 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(0, 255, 127, 0.5);
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.8;
  font-weight: 500;
`;

const FeatureSection = styled.div`
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 16px;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const FeatureCard = styled(Card)`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 127, 0.2);
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 80px rgba(0, 255, 127, 0.2);
    border-color: rgba(0, 255, 127, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #00ff7f 0%, #32cd32 100%);
    box-shadow: 0 0 10px rgba(0, 255, 127, 0.5);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
`;

const FeatureTitle = styled.h3`
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
`;

const CTASection = styled(Card)`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 20, 0, 0.9) 100%);
  border: 2px solid rgba(0, 255, 127, 0.4);
  color: white;
  text-align: center;
  padding: 80px 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 255, 127, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%);
    animation: ${float} 10s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, transparent 30%, rgba(0, 255, 127, 0.05) 50%, transparent 70%),
      linear-gradient(-45deg, transparent 30%, rgba(0, 255, 127, 0.05) 50%, transparent 70%);
    animation: ${float} 15s ease-in-out infinite reverse;
  }
`;

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <FlexCol gap={0}>
      <HeroSection>
        <FloatingElement style={{ top: '10%', left: '10%', fontSize: '4rem' }}>
          🌐
        </FloatingElement>
        <FloatingElement style={{ top: '20%', right: '15%', fontSize: '3rem', animationDelay: '2s' }}>
          🔗
        </FloatingElement>
        <FloatingElement style={{ bottom: '20%', left: '20%', fontSize: '3.5rem', animationDelay: '4s' }}>
          🚀
        </FloatingElement>
        
        <HeroTitle>
          创建·发现·注册·交易·管理
        </HeroTitle>
        <HeroSubtitle>
          一站式Web3域名与身份平台
        </HeroSubtitle>
        <HeroActions>
          <PrimaryButton onClick={() => onNavigate('search')}>
            🔍 搜索域名
          </PrimaryButton>
          <SecondaryButton onClick={() => onNavigate('manage')}>
            📋 管理域名
          </SecondaryButton>
        </HeroActions>
      </HeroSection>

      <StatsSection>
        <SectionTitle>ENS网络统计</SectionTitle>
        <SectionSubtitle>
          加入数百万用户使用ENS构建Web3身份
        </SectionSubtitle>
        <StatsGrid>
          <StatItem>
            <StatNumber>2.8M+</StatNumber>
            <StatLabel>已注册域名</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>740K+</StatNumber>
            <StatLabel>独立拥有者</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>500+</StatNumber>
            <StatLabel>集成应用</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>99.9%</StatNumber>
            <StatLabel>网络正常运行时间</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <FeatureSection>
        <SectionTitle>一站式Web3域名与身份平台</SectionTitle>
        <SectionSubtitle>
          您所需要的一切都在这里
        </SectionSubtitle>
        
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>发现</FeatureTitle>
            <FeatureDescription>
              在所有顶级域名中搜索您想要的域名，发现最适合您的Web3身份标识。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📝</FeatureIcon>
            <FeatureTitle>注册</FeatureTitle>
            <FeatureDescription>
              从所有域名服务中注册域名，简单快捷的注册流程，几分钟内完成域名注册。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>交易</FeatureTitle>
            <FeatureDescription>
              专为域名投资者打造的市场平台，安全便捷地买卖您的数字资产。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>⚙️</FeatureIcon>
            <FeatureTitle>管理</FeatureTitle>
            <FeatureDescription>
              在一个门户中管理您所有的Web3域名，统一管理，轻松控制您的数字身份。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>安全可靠</FeatureTitle>
            <FeatureDescription>
              基于以太坊区块链的去中心化域名系统，您完全拥有和控制您的域名。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🌍</FeatureIcon>
            <FeatureTitle>全球通用</FeatureTitle>
            <FeatureDescription>
              与全球500+应用集成，在整个Web3生态系统中使用您的域名身份。
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>

      <CTASection>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SectionTitle style={{ marginBottom: '20px' }}>
            开始您的Web3之旅
          </SectionTitle>
          <SectionSubtitle style={{ marginBottom: '40px', color: 'rgba(255, 255, 255, 0.9)' }}>
            立即搜索并注册您的专属ENS域名，构建您的数字身份
          </SectionSubtitle>
          
          <FlexRow justify="center" gap={24}>
            <PrimaryButton onClick={() => onNavigate('search')}>
              🚀 立即开始
            </PrimaryButton>
            <SecondaryButton onClick={() => onNavigate('manage')}>
              📖 了解更多
            </SecondaryButton>
          </FlexRow>
        </div>
      </CTASection>
    </FlexCol>
  );
};
