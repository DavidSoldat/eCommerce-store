// import {
//   createContext,
//   useState,
//   useContext,
//   ReactNode,
//   useEffect,
//   FC,
// } from "react";
// import { UserContextType } from "../utils/Types";
// import { UserEntity } from "../utils/Models";

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<UserEntity | null>(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// };
