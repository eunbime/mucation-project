import { auth } from '../firebase';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, loginEmail, signUpEmail, loginGoogle } from '../axios/firebaseApi';
import { setSuccessLogin } from '../redux/modules/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutate = useMutation(logout, {
    onSuccess: () => {
      alert('로그아웃 성공!');
      dispatch(setSuccessLogin());
      navigate('/');
    }
  });

  const loginMutate = useMutation(loginEmail, {
    onSuccess: () => {
      dispatch(setSuccessLogin());
      alert('로그인 성공!!!');
      navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패>>>>', error.message);
    }
  });

  const signUpMutate = useMutation(signUpEmail, {
    onSuccess: () => {
      alert('회원가입 성공!!! 즉시 로그인 합니다.');
      dispatch(setSuccessLogin());
      navigate('/');
    },
    onError: (error) => {
      console.error('회원가입 실패>>>>', error.message);
    }
  });

  const signUpHandler = (signUpInfo) => {
    signUpMutate.mutate(signUpInfo);
  };

  // 일반 로그인
  const loginHandler = (loginInfo) => {
    loginMutate.mutate(loginInfo);
  };

  //   로그아웃
  const logoutHandler = () => {
    logoutMutate.mutate();
  };

  //   회원정보 체크
  const checkAuth = () => {
    const currentDate = new Date().getTime();
    auth.onAuthStateChanged((user) => {
      if (currentDate > user?.stsTokenManager.expirationTime) {
        // console.log('현재시간', currentDate);
        // console.log('만료시간', user?.stsTokenManager.expirationTime);
        // console.log('유효한 토큰이니?>', currentDate <= user?.stsTokenManager.expirationTime);
        console.log('유효하지 않은 토큰입니다.');
        logoutHandler();
      } else {
        // console.log('현재시간', currentDate);
        // console.log('만료시간', user?.stsTokenManager.expirationTime);
        // console.log('유효한 토큰이니?>', currentDate <= user?.stsTokenManager.expirationTime);
        console.log('유효한 토큰입니다.');
      }
    });
  };

  return { logoutHandler, checkAuth, loginHandler, signUpHandler };
};
