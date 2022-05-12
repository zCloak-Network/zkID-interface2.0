import { LoadingButton } from '@mui/lab';
import { Box, Button, styled, useTheme } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Proof } from '@zcloak/zkid-core/types';
import { shortenHash } from '@zcloak/zkid-core/utils';

import { CTYPE_HASH } from '@zkid/app-config/constants';
import { ZK_PROGRAM } from '@zkid/app-config/constants/zk';
import { ZkidExtensionContext, ZkRule } from '@zkid/react-components';

const Wrapper = styled(Box)`
  width: 100%;
  text-align: left;
  margin: 20px 0;
`;

const Item = styled(Box)`
  width: 100%;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  margin-top: 10px;

  > label {
    font-size: 12px;
    line-height: 18px;
    color: #666;
    margin-bottom: 4px;
  }

  > .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title,
  .value {
    font-size: 16px;
    line-height: 24px;
    color: #333;
  }

  .value {
    font-weight: 300;
  }
`;

const ZkGenerator: React.FC = () => {
  const { palette } = useTheme();
  const { zkidExtension } = useContext(ZkidExtensionContext);
  const [genLoading, setGenLoading] = useState(false);
  const [proof, setProof] = useState<Proof>();
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  const generate = useCallback(() => {
    setGenLoading(true);
    zkidExtension.openzkIDPopup('OPEN_GENERATE_PROOF', {
      cTypeHash: CTYPE_HASH,
      programHashName: ZK_PROGRAM.name,
      programFieldName: ZK_PROGRAM.filed,
      programHash: ZK_PROGRAM.hash,
      programDetail: ZK_PROGRAM.detailString
    });
  }, [zkidExtension]);

  useEffect(() => {
    const handleEvent = (value: Proof) => {
      setGenLoading(false);
      setProof(value);
    };

    zkidExtension.on('SEND_PROOF_TO_WEB', handleEvent);

    return () => {
      zkidExtension.off('SEND_PROOF_TO_WEB', handleEvent);
    };
  }, [zkidExtension]);

  return (
    <Wrapper>
      <ZkRule onClose={onClose} open={open} />
      <Item>
        <label>zk Program</label>
        <div className="content">
          <span className="title">
            <Button
              onClick={onOpen}
              sx={{
                padding: 0,
                color: 'inherit',
                ':hover': {
                  color: palette.primary.main
                }
              }}
              variant="text"
            >
              {ZK_PROGRAM.name}
              <span style={{ fontFamily: 'iconfont', fontWeight: 700 }}>&nbsp;î£©</span>
            </Button>
          </span>
          <span className="value">{shortenHash(ZK_PROGRAM.hash)}</span>
        </div>
      </Item>
      <Item>
        <label>Credential type</label>
        <div className="content">
          <span className="title">Adventurer Profile</span>
        </div>
      </Item>
      <Item>
        <label>field name</label>
        <div className="content">
          <span className="title">{ZK_PROGRAM.filed}</span>
        </div>
      </Item>
      <Item>
        <label>outputs,rootHash,proof cid</label>
        <div className="content">
          <span className="title">
            {proof && (
              <>
                {proof.expectResult};{shortenHash(proof.rootHash)};{shortenHash(proof.proofCid)}
              </>
            )}
          </span>
          <span className="value">
            {!proof && (
              <LoadingButton loading={genLoading} onClick={generate} variant="contained">
                Generate
              </LoadingButton>
            )}
          </span>
        </div>
      </Item>
    </Wrapper>
  );
};

export default React.memo(ZkGenerator);
