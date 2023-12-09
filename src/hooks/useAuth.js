import { auth } from '../firebase';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, loginEmail, signUpEmail, socialLogin, setUserData, profileUpdate } from '../axios/firebaseApi';
import { setSuccessLogin, setSuccessLogout } from '../redux/modules/authSlice';
import useAlert from './useAlert';

export const useAuth = () => {
  const { alert } = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutate = useMutation(logout, {
    onSuccess: () => {
      alert({ title: '로그아웃', message: '성공적으로 로그아웃 되었습니다.' });
      dispatch(setSuccessLogout());
      navigate('/');
    }
  });

  const loginMutate = useMutation(loginEmail, {
    onSuccess: () => {
      dispatch(setSuccessLogin());
      alert({ title: '로그인', message: '성공적으로 로그인하였습니다.' });
      navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패>>>>', error.message);
    }
  });

  const signUpMutate = useMutation(signUpEmail, {
    onSuccess: async ({ response, nickname }) => {
      await setUserData(response.user.uid);
      await profileUpdate(nickname);
      alert({ title: '회원가입', message: '성공적으로 회원가입하였습니다.' });
      dispatch(setSuccessLogin());
      navigate('/');
    },
    onError: (error) => {
      console.error('회원가입 실패>>>>', error.message);
    }
  });

  const socialLoginMutate = useMutation(socialLogin, {
    onSuccess: async (data) => {
      await setUserData(data.user.uid);
      alert({ title: '로그인', message: '성공적으로 로그인하였습니다.' });
      dispatch(setSuccessLogin());
      navigate('/');
    },
    onError: (error) => {
      console.error('소셜로그인 실패>>>>', error.message);
    }
  });

  // 현재 user 정보
  const currentUser = auth.currentUser;

  // 회원가입
  const signUpHandler = (signUpInfo) => {
    signUpMutate.mutate(signUpInfo);
  };

  // 소셜로그인
  const socialLoginHandler = (mode) => {
    socialLoginMutate.mutate(mode);
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
      if (!user) {
        console.log('토큰이 없습니다.');
        dispatch(setSuccessLogout());
        return;
      }
      if (currentDate > user?.stsTokenManager.expirationTime) {
        //console.log('현재시간', currentDate);
        //console.log('만료시간', user?.stsTokenManager.expirationTime);
        //console.log('유효한 토큰이니?>', currentDate <= user?.stsTokenManager.expirationTime);
        console.log('유효하지 않은 토큰입니다.');
        dispatch(setSuccessLogout());
      } else {
        //console.log('현재시간', currentDate);
        //console.log('만료시간', user?.stsTokenManager.expirationTime);
        //console.log('유효한 토큰이니?>', currentDate <= user?.stsTokenManager.expirationTime);
        console.log('유효한 토큰입니다.');
        dispatch(setSuccessLogin());
      }
    });
  };

  return { logoutHandler, checkAuth, loginHandler, signUpHandler, socialLoginHandler, currentUser };
};
