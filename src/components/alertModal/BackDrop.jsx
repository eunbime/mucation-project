import React from 'react';
import { StBackDrop } from './alertModal.styles';
import useAlert from 'hooks/useAlert';

const BackDrop = () => {
  const { onCancel, onAlertClose, alertInfo } = useAlert();

  return <StBackDrop $visible={alertInfo.isOpen} onClick={alertInfo.mode === 'alert' ? onAlertClose : onCancel} />;
};

export default BackDrop;
