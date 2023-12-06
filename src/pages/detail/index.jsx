import React from 'react';
import YouTube from 'react-youtube';

const Detail = () => {
  return (
    <div>
      {/* video Id에 값 변경 시 영상 변경 */}
      <YouTube videoId="q4x9fc0qeSU" style={{ width: '100%' }} opts={{ width: '100%' }} />
    </div>
  );
};

export default Detail;
