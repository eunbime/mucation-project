import axios from 'axios';

// const youtubeApi = axios.create({
//   baseUrL : "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&topicId=/m/04rlf&key=AIzaSyAU_rp1mF7mNe9_DMqBuG9eExHjjODgMA4"
// });
const youtubeApi = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=150&topicId=/m/04rlf&key=${process.env.REACT_APP_YOUTUBE_KEY}`;
export default youtubeApi;
