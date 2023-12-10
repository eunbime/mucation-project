import React from 'react';
import ReactDOM from 'react-dom';
import BackDrop from './BackDrop';
import AlertModalMainContainer from './AlertModalMainContainer';

const AlertModal = () => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop />, document.getElementById('backdrop'))}
      {ReactDOM.createPortal(<AlertModalMainContainer />, document.getElementById('alertModal'))}
    </>
  );
};

export default AlertModal;
