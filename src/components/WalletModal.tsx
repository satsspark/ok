import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FlexCol, FlexRow, Button } from '../styles/GlobalStyles';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: rgba(0, 0, 0, 0.95);
  border-radius: 24px;
  padding: 32px;
  max-width: 480px;
  width: 100%;
  border: 1px solid rgba(0, 255, 127, 0.3);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(0, 255, 127, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 127, 0.8), transparent);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f8fafc;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const WalletGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
`;

const WalletOption = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
  animation: ${slideUp} 0.3s ease-out;
  
  &:hover:not(:disabled) {
    background: rgba(0, 255, 127, 0.1);
    border-color: rgba(0, 255, 127, 0.3);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const WalletIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WalletInfo = styled.div`
  flex: 1;
`;

const WalletName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 4px;
`;

const WalletDescription = styled.div`
  font-size: 0.9rem;
  color: #94a3b8;
`;

const InstallPrompt = styled.div`
  font-size: 0.8rem;
  color: #00ff7f;
  font-weight: 500;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  margin: 24px 0;
`;

const InfoSection = styled.div`
  text-align: center;
  padding: 20px;
  background: rgba(0, 255, 127, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 127, 0.2);
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 8px;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.5;
  margin: 0;
`;

const LearnMoreButton = styled(Button)`
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 0.9rem;
  background: transparent;
  color: #00ff7f;
  border: 1px solid rgba(0, 255, 127, 0.3);
  
  &:hover {
    background: rgba(0, 255, 127, 0.1);
    border-color: rgba(0, 255, 127, 0.5);
  }
`;

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

const wallets = [
  {
    id: 'okx',
    name: 'OKX Wallet',
    description: '连接到您的OKX钱包',
    icon: '🦊',
    installed: typeof window !== 'undefined' && window.okxwallet,
    installUrl: 'https://www.okx.com/web3'
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    description: '连接到MetaMask钱包',
    icon: '🦊',
    installed: typeof window !== 'undefined' && window.ethereum?.isMetaMask,
    installUrl: 'https://metamask.io'
  },
  {
    id: 'phantom',
    name: 'Phantom',
    description: '连接到Phantom钱包',
    icon: '👻',
    installed: typeof window !== 'undefined' && window.phantom?.ethereum,
    installUrl: 'https://phantom.app'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    description: '连接到Coinbase钱包',
    icon: '🔵',
    installed: typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet,
    installUrl: 'https://wallet.coinbase.com'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    description: '使用WalletConnect协议连接',
    icon: '🔗',
    installed: true,
    installUrl: ''
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    description: '连接到Trust钱包',
    icon: '🛡️',
    installed: typeof window !== 'undefined' && window.ethereum?.isTrust,
    installUrl: 'https://trustwallet.com'
  }
];

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  if (!isOpen) return null;

  const handleWalletClick = (wallet: any) => {
    if (wallet.installed) {
      onConnect(wallet.id);
      onClose();
    } else {
      window.open(wallet.installUrl, '_blank');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>连接钱包</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <WalletGrid>
          {wallets.map((wallet, index) => (
            <WalletOption
              key={wallet.id}
              onClick={() => handleWalletClick(wallet)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <WalletIcon>{wallet.icon}</WalletIcon>
              <WalletInfo>
                <WalletName>{wallet.name}</WalletName>
                <WalletDescription>{wallet.description}</WalletDescription>
                {!wallet.installed && wallet.installUrl && (
                  <InstallPrompt>点击安装</InstallPrompt>
                )}
              </WalletInfo>
            </WalletOption>
          ))}
        </WalletGrid>

        <Divider />

        <InfoSection>
          <InfoTitle>什么是钱包？</InfoTitle>
          <InfoText>
            钱包用于发送、接收、存储和显示像您的加密货币这样的数字资产。它们还提供了一种新的登录方式，不需要创建新的账户和密码。
          </InfoText>
          <LearnMoreButton variant="outline">
            了解更多
          </LearnMoreButton>
        </InfoSection>
      </ModalContainer>
    </ModalOverlay>
  );
};
