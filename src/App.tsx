import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { GlobalStyles } from './styles/GlobalStyles';
import { RainbowHomePage } from './components/RainbowHomePage';
import { MyNamesPage } from './components/MyNamesPage';
import { config } from './wagmi';
import './i18n';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#00ff7f',
            accentColorForeground: '#000000',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          modalSize="compact"
        >
          <GlobalStyles />
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<RainbowHomePage />} />
                <Route path="/names" element={<MyNamesPage />} />
              </Routes>
            </div>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
