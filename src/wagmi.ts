import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain, http } from 'viem';

// 定义X Layer链
const xLayer = defineChain({
  id: 196,
  name: 'X Layer',
  nativeCurrency: {
    decimals: 18,
    name: 'OKB',
    symbol: 'OKB',
  },
  rpcUrls: {
    default: {
      http: ['https://xlayerrpc.okx.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'OKLink',
      url: 'https://www.oklink.com/xlayer',
    },
  },
});

export const config = getDefaultConfig({
  appName: 'OKONS',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || '0', // 临时禁用WalletConnect
  chains: [xLayer],
  transports: {
    [xLayer.id]: http('https://xlayerrpc.okx.com'),
  },
  ssr: false,
});
