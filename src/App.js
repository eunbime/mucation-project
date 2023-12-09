import GlobalStyles from 'styles/GlobalStyle';
import Router from 'shared/Router';
import { useEffect } from 'react';
import { auth } from './firebase';
import { setSuccessLogin } from './redux/modules/authSlice';
import { useDispatch } from 'react-redux';
import { QueryClient } from 'react-query';

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
        // console.log('현재시간', currentDate);
        // console.log('만료시간', user?.stsTokenManager.expirationTime);
        // console.log('유효한 토큰이니?>', currentDate <= user?.stsTokenManager.expirationTime);
        console.log('유효하지 않은 토큰입니다.');
      } else {
        // console.log('현재시간', currentDate);
        // console.log('만료시간', user?.stsTokenManager.expirationTime);
        // console.log('유효한 토큰이니?>', currentDate <= user?.stsTokenManager.expirationTime);
        console.log('유효한 토큰입니다.');
        dispatch(setSuccessLogin());
      }
    });
  }, []);
  return (
    <>
   
     
     
      <GlobalStyles />
      {/* <QueryClientProvider client={queryClient}> */}
      <Router />
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;
