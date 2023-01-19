import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetUserQuery } from "../../features/users/userApiSlice";
import Loading from "../../components/UI/Loading/Loading";
import Select from "../../components/Select/Select";

import styles from "./EditUser.module.scss";

const options = [
   {
      label: "First",
      value: 1,
   },
   {
      label: "Second",
      value: 2,
   },
   {
      label: "Third",
      value: 3,
   },
   {
      label: "Fourth",
      value: 4,
   },
   {
      label: "Fifth",
      value: 5,
   },
];

const UserDetails = () => {
   const [isEditing, setIsEditing] = useState(false);
   const[selectValue, setSelectValue] = useState(options[0])
   const { id } = useParams();
   console.log(id);

   const { data: user, isFetching, isLoading } = useGetUserQuery(id);

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   const handleIsEditing = () => {
      setIsEditing((prevState) => !prevState);
   };

   if (isLoading) return <Loading />;
   if (user) {
      console.log(user);
      return (
         <section className={styles["container"]}>
            <div className={styles["form-container"]}>
               <h1>Edit user</h1>
               <form>
                  <div>
                     <p>Name</p> <p>{user.name}</p>
                  </div>
                  <div>
                     <p>Email</p> <p>{user.email}</p>
                  </div>
                  <div>
                     <Select options={options} value={selectValue} onChange={val => setSelectValue(val)} />
                  </div>
               </form>
            </div>
         </section>
      );
   }
};

export default UserDetails;
