import { auth } from '../firebase';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, loginEmail, signUpEmail, socialLogin, setUserData, profileUpdate } from '../axios/firebaseApi';
import { setSuccessLogin, setSuccessLogout } from '../redux/modules/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutate = useMutation(logout, {
    onSuccess: () => {
      alert('로그아웃 성공!');
      dispatch(setSuccessLogout());
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
    onSuccess: async ({ response, nickname }) => {
      console.log(nickname, response.user);
      await setUserData(response.user.uid);
      await profileUpdate(nickname);
      console.log(response.user);
      alert('회원가입 성공!!! 즉시 로그인 합니다.');
      dispatch(setSuccessLogin());
      navigate('/');
    },
    onError: (error) => {
      console.error('회원가입 실패>>>>', error.message);
    }
  });

  const socialLoginMutate = useMutation(socialLogin, {
    onSuccess: async (data) => {
      console.log(data);
      await setUserData(data.user.uid);
      dispatch(setSuccessLogin());
      alert('소셜 로그인 성공!!!');
      navigate('/');
    },
    onError: (error) => {
      console.error('회원가입 실패>>>>', error.message);
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
