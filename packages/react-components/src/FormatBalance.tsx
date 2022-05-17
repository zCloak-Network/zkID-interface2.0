import { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

interface Props {
  decimals?: number;
  value?: BigNumberish;
  logo?: string;
  unit?: number;
  symbol?: string;
}

export const formatDisplay = (value: string, decimal = 3) => {
  if (value.includes('.')) {
    const [pre, suf] = value.split('.');

    return decimal === 0 ? pre : pre + '.' + suf.slice(0, decimal);
  } else {
    return value;
  }
};

const FormatBalance: React.FC<Props> = ({ decimals, logo, symbol, unit = 3, value = '0' }) => {
  const display = useMemo(() => {
    const _display = formatUnits(value.toString(), decimals);

    return formatDisplay(_display, unit);
  }, [value, decimals, unit]);

  return (
    <Box alignItems="center" display="inline-flex">
      {logo && <Box component="img" height={6} mr={2} src={logo} width={6} />}
      <Box className="FormatBalance-text" component="span">
        {display}
      </Box>
      {symbol && (
        <Box className="FormatBalance_symbol" component="span" ml={1}>
          {symbol.toUpperCase()}
        </Box>
      )}
    </Box>
  );
};

export default React.memo<typeof FormatBalance>(FormatBalance);
