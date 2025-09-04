import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useWallet } from '../hooks/useWallet';
import { Container, Button, FlexRow } from '../styles/GlobalStyles';

const HeaderContainer = styled.header`
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(71, 85, 105, 0.2);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), transparent, rgba(59, 130, 246, 0.05));
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #f8fafc;
  position: relative;
  z-index: 1;

  &::before {
    content: '🌐';
    font-size: 1.8rem;
    filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.6));
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  font-family: inherit;

  &:hover {
    background: rgba(30, 41, 59, 0.4);
    color: #f8fafc;
    transform: translateY(-1px);
  }

  &.active {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.1);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 20%;
      right: 20%;
      height: 2px;
      background: #10b981;
      border-radius: 1px;
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4);
  }
`;

const WalletSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const WalletButton = styled(Button)`
  padding: 12px 20px;
  min-height: 48px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 12px;
  
  ${props => `
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
  `}
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 16px;
  padding: 8px 12px;
  backdrop-filter: blur(16px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(16, 185, 129, 0.4);
  }
`;

const AddressDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.1);
  padding: 6px 12px;
  border-radius: 10px;
  color: #10b981;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: -0.025em;
`;

const NetworkStatus = styled.div<{ isMainnet?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => props.isMainnet 
    ? 'rgba(16, 185, 129, 0.1)' 
    : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.isMainnet ? '#10b981' : '#ef4444'};
`;

const StatusDot = styled.div<{ connected?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.connected ? '#10b981' : '#ef4444'};
  box-shadow: 0 0 6px ${props => props.connected 
    ? 'rgba(16, 185, 129, 0.6)' 
    : 'rgba(239, 68, 68, 0.6)'};
`;

const LanguageToggle = styled.button`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(71, 85, 105, 0.3);
  color: #cbd5e1;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(16px);
  font-family: inherit;

  &:hover {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(16, 185, 129, 0.4);
    color: #f8fafc;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4);
  }
`;

const DisconnectButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgba(239, 68, 68, 0.5);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.4);
  }
`;

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { t, i18n } = useTranslation();
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet, chainId, switchToXLayer } = useWallet();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const isXLayer = chainId === 196; // X Layer chain ID

  return (
    <HeaderContainer>
      <Container>
        <FlexRow justify="space-between" align="center">
          <Logo>
            {t('app.title')}
          </Logo>
          
          <div style={{ flex: 1 }} />

          <WalletSection>
            <LanguageToggle onClick={toggleLanguage}>
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </LanguageToggle>
            
            {!isConnected ? (
              <WalletButton 
                variant="primary"
                onClick={connectWallet} 
                disabled={isConnecting}
              >
                {isConnecting ? t('register.connecting') : t('wallet.connect')}
              </WalletButton>
            ) : (
              <WalletInfo>
                <NetworkStatus isMainnet={isXLayer} onClick={!isXLayer ? switchToXLayer : undefined} style={{ cursor: !isXLayer ? 'pointer' : 'default' }}>
                  <StatusDot connected={isXLayer} />
                  {isXLayer ? 'X Layer' : 'Switch to X Layer'}
                </NetworkStatus>
                <AddressDisplay>
                  {address && formatAddress(address)}
                </AddressDisplay>
                <DisconnectButton onClick={disconnectWallet} title="断开连接">
                  ×
                </DisconnectButton>
              </WalletInfo>
            )}
          </WalletSection>
        </FlexRow>
      </Container>
    </HeaderContainer>
  );
};
