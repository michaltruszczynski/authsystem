import React from "react";
import { NavLink } from "react-router-dom";
import { useGetUsersQuery } from "../../features/users/userApiSlice";

import Loading from "../../components/UI/Loading/Loading";

import { isEven } from "../../utility/helpers";

import styles from "./UserList.module.scss";

const ROLES = {
   User: 2001,
   Editor: 1984,
   Admin: 5150,
};

const UserList = () => {
   const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

   console.log(users, isLoading, isSuccess, isError, error);

   if (isLoading) {
      return <Loading />;
   }

   console.log(users);

   if (!users || !users.length) {
      return <p>No users has been found.</p>;
   }

   const renderUserList = () => {
      return users.map((user, index) => (
         <tr className={isEven(index + 1) ? styles["row"] : [styles["row"], styles["row--bgcolor"]].join(" ")} key={user._id}>
            <td className={styles["row__item"]}>
               <div className={styles["none"]}>No</div>
               <div>{index + 1}</div>
            </td>
            <td className={styles["row__item"]}>
               <div className={styles["none"]}>Name</div>
               <div>{user.name}</div>
            </td>
            <td className={styles["row__item"]}>
               <div className={styles["none"]}>Roles</div>
               <div>
                  {user.roles.map((role) => {
                     if (role === ROLES.User) return "User";
                     else if (role === ROLES.Editor) return "Editor";
                     else if (role === ROLES.Admin) return "Administrator";
                     else {
                        return null;
                     }
                  })}
               </div>
            </td>
            <td className={styles["row__item"]}>
               <div className={styles["none"]}>Actions</div>
               <div>
                  <span className={styles["role"]}>
                     <NavLink to={`/edituser`} >View</NavLink>
                  </span>
                  <span className={[styles["role"], styles["role--mleft"]].join(" ")}>
                     <NavLink to={`/edituser/${user._id}`}>Edit</NavLink>
                  </span>
               </div>
            </td>
         </tr>
      ));
   };

   if (isSuccess) {
      return (
         <section className={styles["container"]}>
            <div className={styles["table-container"]}>
               <h1 className={styles["table__heading"]}>Admin Page</h1>
               <p className={styles["table__description"]}>User list</p>

               <table className={styles["table"]}>
                  <thead className={styles["column"]}>
                     <tr className={styles["row__heading"]}>
                        <th className={[styles["column__heading"], styles["col-1"]].join(" ")}>No</th>
                        <th className={[styles["column__heading"], styles["col-2"]].join(" ")}>Name</th>
                        <th className={[styles["column__heading"], styles["col-3"]].join(" ")}>Roles</th>
                        <th className={[styles["column__heading"], styles["col-4"]].join(" ")}>Actions</th>
                     </tr>
                  </thead>
                  <tbody>{renderUserList()}</tbody>
               </table>
            </div>
         </section>
      );
   }
};

export default UserList;
