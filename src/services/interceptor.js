
import axios from 'axios';

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    /* const token = localStorage.getItem('ACCESS_TOKEN')
      ? localStorage.getItem('ACCESS_TOKEN')
      : null;
    const loggedIn = token ? JSON.parse(token).accessToken : null;
    if (loggedIn) {
      // If need authorization
      //config.headers.Authorization = `Bearer ${loggedIn}`; 
    }*/
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error, 'statusCode error');
    if (error.response.status === 401) {
      // If you need redirect to login when token expired
      // Dispatch error toast message
      // localStorage.removeItem('ACCESS_TOKEN');
      // if need redirect to login when token expired
      //window.location.replace(`${/login}`);
    }

    if (error.response.status === 403) {
      // If you need redirect to a page when user not have access
      // window.location.replace('/not-acess');
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
