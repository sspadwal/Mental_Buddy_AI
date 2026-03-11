import { createContext, useEffect, useState, useContext } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("userdata");
    if (user) {
      const user_parsing = JSON.parse(user);
      return user_parsing;
    }
  });
  const [loading, setLoading] = useState(false);
  const Login = (token, userdata) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userdata", JSON.stringify(userdata));
    setUser(userdata);
    setLoading(false);
  };
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    localStorage.removeItem("hasSeenWelcome");
    setUser(null);
  };


  return (
    <authContext.Provider value={{ loading, user, Login, Logout }}>
      {" "}
      {children}{" "}
    </authContext.Provider>
  );
};
export { AuthProvider };
export const useAuth = () => useContext(authContext);
