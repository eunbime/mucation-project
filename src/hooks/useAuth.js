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
      switch (error.code) {
        case 'auth/invalid-credential':
          alert({ title: '로그인에러', message: '잘못된 로그인 정보입니다.' });
          break;
        default:
          alert({ title: '로그인에러', message: '로그인에러 입니다.' });
          break;
      }
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
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert({ title: '회원가입에러', message: '이미 사용중인 이메일입니다.' });
          break;
        default:
          alert({ title: '회원가입에러', message: '회원가입에러 입니다.' });
          break;
      }
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
      alert({ title: '소셜로그인에러', message: error.code });
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
        dispatch(setSuccessLogout());
        return;
      }
      if (currentDate > user?.stsTokenManager.expirationTime) {
        dispatch(setSuccessLogout());
      } else {
        dispatch(setSuccessLogin());
      }
    });
  };

  return { logoutHandler, checkAuth, loginHandler, signUpHandler, socialLoginHandler, currentUser };
};
