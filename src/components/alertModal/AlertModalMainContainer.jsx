import React from 'react';
import { StAlertModalContainer } from './alertModal.styles';
import Button from 'components/common/Button';
import { ReactComponent as Close } from '../../styles/img/alertModal/closeBtn.svg';
import useAlert from 'hooks/useAlert';

const AlertModalMainContainer = () => {
  const { onConfirm, onCancel, onAlertClose, alertInfo } = useAlert();

  switch (alertInfo.mode) {
    case 'confirm':
      return (
        <StAlertModalContainer $visible={alertInfo.isOpen}>
          <h3>{alertInfo.title}</h3>
          <p>{alertInfo.message}</p>
          <section>
            <Button mode="black" text="취소" handler={onCancel} />
            <Button text="확인" handler={onConfirm} />
          </section>
        </StAlertModalContainer>
      );
    case 'alert':
      return (
        <StAlertModalContainer $visible={alertInfo.isOpen}>
          <button onClick={onAlertClose}>
            <Close />
          </button>
          <h3>{alertInfo.title}</h3>
          <p>{alertInfo.message}</p>
        </StAlertModalContainer>
      );
  }
};

export default AlertModalMainContainer;
