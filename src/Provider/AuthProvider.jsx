import { createContext, useEffect, useState } from "react";
import useAxiosCommon from "../Hooks/useAxiosCommon";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();
  console.log(user)

  // create user
  const createUser = async (userInfo) => {
    setLoading(true);
    const { data } = await axiosCommon.post("/users", userInfo);
    console.log(data)
    if(data.insertedId){
      setUser(userInfo)
      localStorage.setItem("user", JSON.stringify(userInfo));
    }
    return data;
  };

   // Retrieve user from local storage when the component mounts
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // log out user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  const userInfo = { createUser, loading, setLoading, user, logout };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
