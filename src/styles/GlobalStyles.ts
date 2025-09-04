import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: 
      radial-gradient(ellipse at top, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
      #0f172a;
    min-height: 100vh;
    color: #f8fafc;
    overflow-x: hidden;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(16, 185, 129, 0.3) transparent;
  }

  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(16, 185, 129, 0.3);
    border-radius: 3px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: rgba(16, 185, 129, 0.5);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  #root {
    min-height: 100vh;
  }

  /* RainbowKit自定义样式 */
  [data-rk] {
    --rk-colors-accentColor: #00ff7f;
    --rk-colors-accentColorForeground: #000000;
    --rk-colors-actionButtonBorder: rgba(0, 255, 127, 0.4);
    --rk-colors-actionButtonBorderMobile: rgba(0, 255, 127, 0.4);
    --rk-colors-actionButtonSecondaryBackground: rgba(0, 0, 0, 0.8);
    --rk-colors-closeButton: #f8fafc;
    --rk-colors-closeButtonBackground: rgba(0, 0, 0, 0.6);
    --rk-colors-connectButtonBackground: rgba(0, 0, 0, 0.8);
    --rk-colors-connectButtonBackgroundError: rgba(239, 68, 68, 0.2);
    --rk-colors-connectButtonInnerBackground: rgba(0, 255, 127, 0.1);
    --rk-colors-connectButtonText: #00ff7f;
    --rk-colors-connectButtonTextError: #ef4444;
    --rk-colors-connectionIndicator: #00ff7f;
    --rk-colors-downloadBottomCardBackground: rgba(0, 0, 0, 0.9);
    --rk-colors-downloadTopCardBackground: rgba(0, 0, 0, 0.9);
    --rk-colors-error: #ef4444;
    --rk-colors-generalBorder: rgba(0, 255, 127, 0.2);
    --rk-colors-generalBorderDim: rgba(255, 255, 255, 0.1);
    --rk-colors-menuItemBackground: rgba(0, 0, 0, 0.6);
    --rk-colors-modalBackdrop: rgba(0, 0, 0, 0.8);
    --rk-colors-modalBackground: rgba(10, 14, 19, 0.95);
    --rk-colors-modalBorder: rgba(0, 255, 127, 0.3);
    --rk-colors-modalText: #f8fafc;
    --rk-colors-modalTextDim: #94a3b8;
    --rk-colors-modalTextSecondary: #cbd5e1;
    --rk-colors-profileAction: rgba(0, 255, 127, 0.1);
    --rk-colors-profileActionHover: rgba(0, 255, 127, 0.2);
    --rk-colors-profileForeground: rgba(0, 0, 0, 0.9);
    --rk-colors-selectedOptionBorder: rgba(0, 255, 127, 0.6);
    --rk-colors-standby: #94a3b8;
    --rk-radii-actionButton: 12px;
    --rk-radii-connectButton: 12px;
    --rk-radii-menuButton: 12px;
    --rk-radii-modal: 16px;
    --rk-radii-modalMobile: 16px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Card = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(24px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(71, 85, 105, 0.2);
  margin: 20px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(16, 185, 129, 0.3);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(16, 185, 129, 0.1),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), transparent, rgba(59, 130, 246, 0.2));
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 16px 32px;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 56px;
  position: relative;
  overflow: hidden;
  font-family: inherit;
  letter-spacing: -0.025em;

  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 
      0 10px 15px -3px rgba(16, 185, 129, 0.1),
      0 4px 6px -2px rgba(16, 185, 129, 0.05),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 20px 25px -5px rgba(16, 185, 129, 0.1),
        0 10px 10px -5px rgba(16, 185, 129, 0.04);
      
      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(0);
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: rgba(30, 41, 59, 0.4);
    color: #f1f5f9;
    border: 1px solid rgba(71, 85, 105, 0.3);
    backdrop-filter: blur(16px);
    
    &:hover {
      background: rgba(30, 41, 59, 0.6);
      border-color: rgba(16, 185, 129, 0.4);
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  `}

  ${props => props.variant === 'outline' && `
    background: transparent;
    color: #10b981;
    border: 2px solid rgba(16, 185, 129, 0.5);
    backdrop-filter: blur(16px);
    
    &:hover {
      background: rgba(16, 185, 129, 0.1);
      border-color: #10b981;
      transform: translateY(-1px);
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 20px 24px;
  border: 1px solid rgba(71, 85, 105, 0.3);
  border-radius: 16px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(30, 41, 59, 0.4);
  color: #f8fafc;
  backdrop-filter: blur(16px);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 
      0 0 0 4px rgba(16, 185, 129, 0.1),
      0 10px 15px -3px rgba(0, 0, 0, 0.1);
    background: rgba(30, 41, 59, 0.6);
  }

  &:hover {
    border-color: rgba(16, 185, 129, 0.4);
  }

  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Subtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
`;

export const Text = styled.p<{ size?: 'small' | 'medium' | 'large' }>`
  color: #cbd5e1;
  line-height: 1.7;
  margin-bottom: 1rem;
  font-weight: 400;

  ${props => props.size === 'small' && 'font-size: 0.875rem; color: #94a3b8;'}
  ${props => props.size === 'large' && 'font-size: 1.125rem; color: #e2e8f0;'}
`;

export const FlexRow = styled.div<{ gap?: number; justify?: string; align?: string }>`
  display: flex;
  gap: ${props => props.gap || 16}px;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'center'};
  flex-wrap: wrap;
`;

export const FlexCol = styled.div<{ gap?: number; align?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || 16}px;
  align-items: ${props => props.align || 'stretch'};
`;

export const Badge = styled.span<{ variant?: 'success' | 'error' | 'warning' | 'info' }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => props.variant === 'success' && `
    background: #d4edda;
    color: #155724;
  `}

  ${props => props.variant === 'error' && `
    background: #f8d7da;
    color: #721c24;
  `}

  ${props => props.variant === 'warning' && `
    background: #fff3cd;
    color: #856404;
  `}

  ${props => props.variant === 'info' && `
    background: #d1ecf1;
    color: #0c5460;
  `}
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
