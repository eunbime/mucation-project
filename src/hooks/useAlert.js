import { useDispatch, useSelector } from 'react-redux';
import { alertOpen, closeModal, confirmOpen, setConfirmInfo, setResolveFunc } from '../redux/modules/alertSlice';
import { useState } from 'react';

const useAlert = () => {
  const alertInfo = useSelector((state) => state.alertSlice);
  const dispatch = useDispatch();

  // confirm
  const confirm = ({ title, message }) => {
    dispatch(confirmOpen({ title, message }));
    return new Promise((resolve) => {
      dispatch(setResolveFunc({ func: resolve }));
    });
  };

  const onConfirm = () => {
    alertInfo.resolveFunc(true);
    dispatch(closeModal());
  };

  const onCancel = () => {
    alertInfo.resolveFunc(false);
    dispatch(closeModal());
  };

  // alert
  const alert = ({ title, message }) => {
    dispatch(alertOpen({ title, message }));
  };

  const onAlertClose = () => {
    dispatch(closeModal());
  };

  return { onConfirm, onCancel, confirm, onAlertClose, alert, alertInfo };
};
export default useAlert;
