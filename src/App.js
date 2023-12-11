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
      if (!user) return;
      if (currentDate <= user?.stsTokenManager.expirationTime) dispatch(setSuccessLogin());
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
