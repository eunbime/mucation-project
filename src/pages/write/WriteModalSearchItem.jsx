import React from 'react';
import {
  StWriteModalSectionBorder,
  StThumbnailBox,
  StWriteModalImg,
  StInfoBox,
  StPostTitle
} from './WriteModalSearch.stlye';

const WriteModalSearchItem = ({ item, handleVideoSelect }) => {
  return (
    <section>
      <StWriteModalSectionBorder
        onClick={() => handleVideoSelect({ videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.high.url })}
      >
        <StThumbnailBox>
          <StWriteModalImg src={item.snippet.thumbnails.high.url} alt="앨범이미지" />
        </StThumbnailBox>
        <StInfoBox>
          <StPostTitle> {item.snippet.title}</StPostTitle>
          <div id={item.id.videoId}></div>
        </StInfoBox>
      </StWriteModalSectionBorder>
    </section>
  );
};

export default WriteModalSearchItem;
