import axios from "axios";

const API = axios.create({ baseURL: "https://secondhandvinhome.herokuapp.com/api"});
// const API = axios.create({
//     baseURL: process.env.REACT_APP_BACKEND_URL,
//   });
  
  API.interceptors.request.use(async (req) => {
    console.log(JSON.parse(localStorage.getItem("user")));
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("user"))
      }`;
      console.log(req);
    return req;
  });

  export const getRoleUser = () => API.get('/user/current')
