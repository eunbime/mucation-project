import React from 'react';
import { ReactComponent as Edit } from '../../styles/img/detailPage/edit.svg';
import { ReactComponent as Delete } from '../../styles/img/detailPage/delete.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditDeleteArea = () => {
  const datas = useSelector((state) => state.currentVideoSlice.videoInfo);

  const navigate = useNavigate();

  const goToEditPage = () => {
    navigate(`/write/edit?id=${datas?.id}`);
  };

  const goToDeletePage = () => {
    // 삭제로직
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

const StEditDeleteArea = styled.section`
  display: flex;
  align-items: center;
  margin-top: 0.3125rem;
  & > button {
    background: none;
    color: var(--mainWhite);
  }
  & > button:hover {
    color: var(--mainOrange);
  }
`;

export default EditDeleteArea;
