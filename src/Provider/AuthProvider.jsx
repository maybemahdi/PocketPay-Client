import { createContext, useEffect, useState } from "react";
import useAxiosCommon from "../Hooks/useAxiosCommon";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();
  // console.log(user);

  // create user
  const createUser = async (userInfo) => {
    setLoading(true);
    const { data } = await axiosCommon.post("/users", userInfo);
    // console.log(data);
    if (data?.insertedId && userInfo?.status === "verified") {
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
    }
    return data;
  };

  //login user
  const signIn = async (userInfo) => {
    setLoading(true);
    // console.log(userInfo);
    const { data } = await axiosCommon.get("/users", { params: userInfo });
    // console.log(data);
    if (data?.loggedIn && data?.user?.status === "verified") {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  };

  // Retrieve user from local storage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      axiosCommon.post(`/jwt`, user).then((res) => {
        console.log(res.data);
      });
    } else {
      setUser(null);
      localStorage.removeItem("user");
      axiosCommon.post(`/logout`, user).then((res) => {
        console.log(res.data);
      });
    }
    setLoading(false);
  }, [update]);

  // log out user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const userInfo = {
    createUser,
    loading,
    setLoading,
    user,
    logout,
    signIn,
    update,
    setUpdate,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
