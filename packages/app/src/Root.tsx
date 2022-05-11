import { CssBaseline, StyledEngineProvider } from '@mui/material';
import React from 'react';

import { WalletProvider } from '@zcloak/react-wallet/WalletProvider';

import { MOONBASE } from '@zkid/app-config/endpoints';
import { ThemeProvider, ZkidExtensionProvider } from '@zkid/react-components';

import App from './App';

const Root: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <WalletProvider supportedChainIds={[MOONBASE.chainId]}>
          <ZkidExtensionProvider>
            <CssBaseline />
            <App />
          </ZkidExtensionProvider>
        </WalletProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Root;
