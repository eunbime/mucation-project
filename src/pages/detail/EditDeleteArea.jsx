import React from 'react';
import { ReactComponent as Edit } from '../../styles/img/detailPage/edit.svg';
import { ReactComponent as Delete } from '../../styles/img/detailPage/delete.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StEditDeleteArea } from './Detail.styles';
import { useMutation } from 'react-query';
import { deletePost } from '../../axios/firebaseApi';
import useAlert from 'hooks/useAlert';

const EditDeleteArea = () => {
  const { mutate: deleteMutate } = useMutation({ mutationFn: deletePost });

  const { confirm, alert } = useAlert();

  const datas = useSelector((state) => state.currentVideoSlice.videoInfo);

  const navigate = useNavigate();

  const goToEditPage = () => {
    navigate(`/write/edit?id=${datas?.id}`);
  };

  const goToDeletePage = () => {
    // 삭제로직
    deleteMutate(datas.id, {
      onSuccess: async () => {
        const confirmValue = await confirm({ title: '삭제', message: '해당 게시물을 삭제하시겠습니까?' });

        if (!confirmValue) return;

        alert({ title: '삭제완료', message: '삭제가 완료되었습니다.' });
        navigate('/');
      }
    });
  };

  return (
    <StEditDeleteArea>
      <button onClick={goToEditPage}>
        <Edit />
      </button>
      <button onClick={goToDeletePage}>
        <Delete />
      </button>
    </StEditDeleteArea>
  );
};

export default EditDeleteArea;
