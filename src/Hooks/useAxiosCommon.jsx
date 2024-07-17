import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

export const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const useAxiosCommon = () => {
//   const { logOut } = useAuth()
//   const navigate = useNavigate()
//   useEffect(() => {
//     axiosCommon.interceptors.response.use(
//       res => {
//         return res
//       },
//       async error => {
//         console.log('error tracked in the interceptor', error.response)
//         if (error.response.status === 401 || error.response.status === 403) {
//           await logOut()
//           navigate('/login')
//         }
//         return Promise.reject(error)
//       }
//     )
//   }, [navigate])
  return axiosCommon;
};

export default useAxiosCommon;