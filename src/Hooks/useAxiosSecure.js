import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://zap-shift-server-eight-alpha.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const token = user?.accessToken;
  useEffect(() => {
    //request interceptor
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const statusCode = err?.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => console.log(err));
        }

        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate, token]);

  return instance;
};

export default useAxiosSecure;
