import { Circle } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';

import { Address, FormatBalance } from '@zkid/react-components';
import { useEndpoint, useNativeBalance } from '@zkid/react-hooks';

interface Props {
  account: string;
}

const AccountInfo: React.FC<Props> = ({ account }) => {
  const balance = useNativeBalance(account);
  const endpoint = useEndpoint();

  return (
    <Box
      className="ZkidAccountInfo"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '40px',
        background: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '20px',
        color: '#333'
      }}
    >
      <Box
        sx={{
          padding: '0 10px 0 24px',
          cursor: 'default'
        }}
      >
        <FormatBalance symbol={endpoint?.currencySymbol} value={balance} />
      </Box>
      <Button
        className="ZkidAccountInfo-address"
        endIcon={<Circle sx={{ width: '16px', height: '16px', ml: '14px' }} />}
        size="large"
        sx={{
          background: 'rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          ':hover': {
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.6)'
          }
        }}
        variant="rounded"
      >
        <Address value={account} />
      </Button>
    </Box>
  );
};

export default React.memo(AccountInfo);
