# Mucation - READ.ME

# 🎵 Mucation

## Overview

> **내일배움캠프 (심화주차 아웃소싱 과제)**
🕗 개발기간: 2023. 12. 4 ~ 2023. 12. 11
💻 배포 주소: https://mucation-project.vercel.app/
> 

## 팀소개

김범수: 

김은비: https://github.com/eunbime

김명섭: https://github.com/kms99

시병택: https://github.com/BYEONGTAEK2023

전지현: https://github.com/jihyun-j

## 프로젝트 소개

<aside>
🎶 내가 원하는 장소에서 내가 좋아하는 음악(영상)을 공유해 보자!

</aside>

## Stack

### Environment

VS Code, Git, Github

### Config

Yarn

### Development

React

### Communication

Slack, Notion, Zep, Figma

### API

Youtube, Kakao Map

### Database

Firebase 

## 화면구성

- 로그인 /  회원가입
    - Firebase Authenticator를 이용해 구글, 깃허브 및 이메일과 비밀번호를 사용해 회원가입 및 로그인
- 홈 - 지도 / 근처에서 공유된 영상들
    - 초기 위치는 내 위치로 지정하여 내 근처에서 공유된 영상 리스트를 볼 수 있음
    - 지도위에 마크된 위치에서 영상의 간단한 정보 보기 및 상세보기 이동 가능
- 게시글 작성 페이지
    - 유튜브 API를 이용해 공유하고 싶은 영상을 가져와서 추가
    - 제목과 내용을 입력하고 공유하고 싶은 위치를 지정해서 게시글을 작성
- 게시글 상세보기
    - Firebase에 영상에대한 정보를 저장해 두고, 공유된 영상에 대한 정보를 볼 수 있음
    - 공유된 게시글이 현재 로그인된 사용자가 게시한 영상이면 수정 및 삭제가 가능 (권한부여)
- 프로필
    - 내가 공유한 영상들 모아서 볼 수 있음
    - 내가 좋아하는 장르 추가 가능

## 주요기능

### 📌 위치를 지정해서 영상 공유 가능

- 내가 기억하고 싶은 장소 또는 공유하고 싶은 장소를 위치로 지정해 음악을 공유할 수 있어요

### 📌 내 근처에서 사람들과 함께 영상 시청 또는 감상

- 내가 공유한 음악을 근처 사람들과 함께 들을 수 있어요
- 특정 위치의 사람들과 음악을 공유할 수 있어요 (멀리 있지만 공감대 형성?)

## /oran📂 아키텍처

```
src
 ┣ api
 ┃ ┗ posts.js
 ┣ assets
 ┣ axios
 ┃ ┣ firebaseApi.js
 ┃ ┣ locationApi.js
 ┃ ┗ youtubeApi.js
 ┣ components
 ┃ ┣ alertModal
 ┃ ┃ ┣ AlertModal.jsx
 ┃ ┃ ┣ AlertModalMainContainer.jsx
 ┃ ┃ ┣ BackDrop.jsx
 ┃ ┃ ┗ alertModal.styles.js
 ┃ ┣ common
 ┃ ┃ ┗ Button.jsx
 ┃ ┣ footer
 ┃ ┃ ┣ Footer.jsx
 ┃ ┃ ┗ Footer.styles.js
 ┃ ┣ header
 ┃ ┃ ┣ nav
 ┃ ┃ ┃ ┗ HeaderNav.jsx
 ┃ ┃ ┣ Header.jsx
 ┃ ┃ ┗ Header.styles.js
 ┃ ┣ location
 ┃ ┃ ┣ CustomMarker.jsx
 ┃ ┃ ┣ CustomMarker.styles.js
 ┃ ┃ ┣ CustomOverlay.jsx
 ┃ ┃ ┣ CustomOverlay.styles.js
 ┃ ┃ ┣ Location.jsx
 ┃ ┃ ┣ Location.styles.js
 ┃ ┃ ┣ MapMarkerClusterer.jsx
 ┃ ┃ ┗ MapMarkerClusterer.styles.js
 ┃ ┣ map-control-button
 ┃ ┃ ┣ CustomControlBar.jsx
 ┃ ┃ ┣ LocationSearch.jsx
 ┃ ┃ ┣ LocationSearch.styles.js
 ┃ ┃ ┣ MapControlButton.jsx
 ┃ ┃ ┗ MapControlButton.styles.js
 ┃ ┗ post-list
 ┃ ┃ ┣ PostItem.jsx
 ┃ ┃ ┣ PostItem.styles.js
 ┃ ┃ ┣ PostList.jsx
 ┃ ┃ ┗ PostList.styles.js
 ┣ hooks
 ┃ ┣ useAlert.js
 ┃ ┣ useAuth.js
 ┃ ┣ useDebounce.js
 ┃ ┗ useInput.js
 ┣ pages
 ┃ ┣ detail
 ┃ ┃ ┣ Detail.styles.js
 ┃ ┃ ┣ DetailPageUserInfo.jsx
 ┃ ┃ ┣ DetailPageVideoArea.jsx
 ┃ ┃ ┣ EditDeleteArea.jsx
 ┃ ┃ ┗ index.jsx
 ┃ ┣ home
 ┃ ┃ ┣ Home.styles.js
 ┃ ┃ ┗ index.jsx
 ┃ ┣ login
 ┃ ┃ ┣ Login.styles.js
 ┃ ┃ ┣ LoginInputSection.jsx
 ┃ ┃ ┣ LoginSocialLoginSection.jsx
 ┃ ┃ ┗ index.jsx
 ┃ ┣ profile
 ┃ ┃ ┣ EditProfileModal.jsx
 ┃ ┃ ┣ EditProfileModal.styles.js
 ┃ ┃ ┣ UserCard.jsx
 ┃ ┃ ┣ UserPostCard.jsx
 ┃ ┃ ┣ index.jsx
 ┃ ┃ ┗ profile.styles.js
 ┃ ┗ write
 ┃ ┃ ┣ WriteModal.jsx
 ┃ ┃ ┣ WriteModal.style.js
 ┃ ┃ ┣ WriteModalSearch.jsx
 ┃ ┃ ┣ WriteModalSearch.stlye.js
 ┃ ┃ ┣ WritePageContext.jsx
 ┃ ┃ ┣ WritePageMap.jsx
 ┃ ┃ ┣ WritePageMap.styles.js
 ┃ ┃ ┣ WritePageTitle.jsx
 ┃ ┃ ┣ WritePageVideoArea.jsx
 ┃ ┃ ┣ index.jsx
 ┃ ┃ ┗ write.styles.js
 ┣ redux
 ┃ ┣ config
 ┃ ┃ ┗ configStore.js
 ┃ ┗ modules
 ┃ ┃ ┣ alertSlice.js
 ┃ ┃ ┣ authSlice.js
 ┃ ┃ ┣ currentVideoSlice.js
 ┃ ┃ ┣ mapSlice.js
 ┃ ┃ ┣ profileSlice.js
 ┃ ┃ ┗ seletcedVideoSlice.js
 ┣ shared
 ┃ ┣ Layout
 ┃ ┃ ┣ AuthLayout.jsx
 ┃ ┃ ┗ Layout.jsx
 ┃ ┗ Router.js
 ┣ styles
 ┃ ┣ img
 ┃ ┃ ┣ alertModal
 ┃ ┃ ┃ ┗ closeBtn.svg
 ┃ ┃ ┣ detailPage
 ┃ ┃ ┃ ┣ arrow-left.svg
 ┃ ┃ ┃ ┣ arrow-right.svg
 ┃ ┃ ┃ ┣ delete.svg
 ┃ ┃ ┃ ┣ edit.svg
 ┃ ┃ ┃ ┗ heart.svg
 ┃ ┃ ┣ loginPage
 ┃ ┃ ┃ ┣ github.svg
 ┃ ┃ ┃ ┣ google.svg
 ┃ ┃ ┃ ┗ home.svg
 ┃ ┃ ┗ map
 ┃ ┃ ┃ ┣ location.svg
 ┃ ┃ ┃ ┗ search.svg
 ┃ ┗ GlobalStyle.js
 ┣ App.js
 ┣ firebase.js
 ┣ index.js
 ┗ logo.svg
```
