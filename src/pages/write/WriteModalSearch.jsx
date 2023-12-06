import React, { useState } from 'react';
import youtubeApi from '../../axios/youtubeApi';
import useInput from 'hooks/useInput';
import axios from 'axios';

const WriteModalSearch = () => {
  const [value, handler] = useInput('');

  const [search, setSearch] = useState('');

  const getSearchHandler = async () => {
    try {
      const response = await axios.get(`${youtubeApi}&q=${value}`);
      console.log('서치값', response);
      setSearch(response.data);
    } catch {
      console.log('error', console.error);
    }
  };

  return (
    <div>
      <input type="text" onChange={handler} />
      <button onClick={getSearchHandler}>찾기</button>

      {search.map((i) => {
        return (
          <>
            <div>타이틀:{i.items.sinppet.title}</div>
            <div></div>
            <div></div>
          </>
        );
      })}
    </div>
  );
};

export default WriteModalSearch;
