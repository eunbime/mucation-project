import axios from 'axios';

const youtubeApi = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&topicId=/m/04rlf&key=${process.env.REACT_APP_YOUTUBE_KEY}`;
export default youtubeApi;
