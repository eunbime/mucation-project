import { useDispatch, useSelector } from 'react-redux';
import { alertOpen, closeModal, confirmOpen, setResolveFunc } from '../redux/modules/alertSlice';

const useAlert = () => {
  const alertInfo = useSelector((state) => state.alertSlice);

  const dispatch = useDispatch();

  // confirm 사용시 // async내에서 await
  const confirm = ({ title, message }) => {
    dispatch(confirmOpen({ title, message }));
    return new Promise((resolve) => {
      dispatch(setResolveFunc({ func: resolve }));
    });
  };

  // alert 사용시
  const alert = ({ title, message }) => {
    dispatch(alertOpen({ title, message }));
  };

  const onConfirm = () => {
    alertInfo.resolveFunc(true);
    dispatch(closeModal());
  };

  const onCancel = () => {
    alertInfo.resolveFunc(false);
    dispatch(closeModal());
  };

  const onAlertClose = () => {
    dispatch(closeModal());
  };

  return { onConfirm, onCancel, confirm, onAlertClose, alert, alertInfo };
};
export default useAlert;
