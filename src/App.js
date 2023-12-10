import GlobalStyles from 'styles/GlobalStyle';
import Router from 'shared/Router';
import { useEffect } from 'react';
import { auth } from './firebase';
import { setSuccessLogin } from './redux/modules/authSlice';
import { useDispatch } from 'react-redux';
import AlertModal from 'components/alertModal/AlertModal';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentDate = new Date().getTime();
    auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('토큰이 없습니다.');
        return;
      }
      if (currentDate > user?.stsTokenManager.expirationTime) {
        console.log('유효하지 않은 토큰입니다.');
      } else {
        console.log('유효한 토큰입니다.');
        dispatch(setSuccessLogin());
      }
    });
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <AlertModal />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
