import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../../components/UI/Loading/Loading";
import Select from "../../components/Select/Select";
import Button from "./Button/Button";

import { useGetUserQuery, usePutUserMutation } from "../../features/users/userApiSlice";
import { useRefreshMutation} from '../../features/auth/authApiSlice';

import { showSpinner, closeSpinner, setMessage } from "../../features/app/appSlice";

import { getErrorMessage } from "../../utility/messages";

import styles from "./EditUser.module.scss";

const USER_ROLE_OPTIONS = [
   {
      label: "User",
      value: 2001,
   },
   {
      label: "Editor",
      value: 1984,
   },
   {
      label: "Administrator",
      value: 5150,
   },
];

const USER_ROLES = {
   Admin: "Administrator",
   Editor: "Editor",
   User: "User",
};

const ROLES = {
   User: 2001,
   Editor: 1984,
   Admin: 5150,
};

const UserDetails = () => {
   const [isEditing, setIsEditing] = useState(false);
   const [inputTouched, setInputTouched] = useState(false);
   const [userRole, setUserRole] = useState(null);
   const [putUser] = usePutUserMutation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { id } = useParams();

   const { data: user, isFetching, isLoading, refetch } = useGetUserQuery(id);
   const [refresh] = useRefreshMutation();

   const selectRoleChangeHandler = (val) => {
      setUserRole(val);
      if (!inputTouched) {
         setInputTouched(true);
      }
   };

   const handleSubmit = async () => {
      const {email} = user;

      try {
         dispatch(showSpinner);
         const response = await putUser({userRole: userRole.value, userEmail: email}).unwrap();
         console.log(response)
         await refresh().unwrap()
      } catch (error) {
         console.log(error);
         const { errorMessage, errorDetails } = getErrorMessage(error);
         dispatch(setMessage({ message: errorMessage, messageDetails: errorDetails }));
      } finally {
         setIsEditing(false);
         await refetch();
         dispatch(closeSpinner);
      }
   };

   const handleIsEditing = () => {
      setIsEditing((prevState) => !prevState);
   };

   const backToUserList = () => {
      navigate("/userlist");
   };

   const cancelEditing = () => {
      setIsEditing(false);
      refetch();
   };

   useEffect(() => {
      const getRoleValue = (searchedRole) => {
         const userRolesArray = Object.entries(ROLES);
         const foundRole = userRolesArray.find((userRole) => userRole[1] === searchedRole);
         return { label: USER_ROLES[foundRole[0]], value: foundRole[1] };
      };

      if (user) {
         const { roles } = user;
         setUserRole(getRoleValue(roles[0]));
      }
   }, [user, isEditing]);

   if (isLoading || isFetching) return <Loading />;
   if (user) {
      return (
         <section className={styles["container"]}>
            <div className={styles["form-container"]}>
               <h1>Edit user</h1>
               <form className={styles["form"]}>
                  <div className={styles["form__data"]}>
                     <div className={styles["form__label"]}>Name</div> <div className={styles["form__value"]}>{user.name}</div>
                     <div className={styles["form__label"]}>Email</div>
                     <div className={styles["form__value"]}>{user.email}</div>
                     <div className={styles["form__label"]}>Roles</div>
                     <Select options={USER_ROLE_OPTIONS} value={userRole} onChange={selectRoleChangeHandler} disabled={!isEditing} />
                  </div>
                  <div>{!userRole && inputTouched ? <p className={styles["error"]}>Error</p> : <p className={styles["error--non"]}>Error</p>}</div>
                  <div className={styles["buttons-container"]}>
                     {isEditing ? (
                        <>
                           <Button text={"Save"} onClick={handleSubmit} disabled={!userRole} />
                           <Button text={"Cancel"} onClick={cancelEditing} />
                        </>
                     ) : (
                        <>
                           <Button text={"Edit"} onClick={handleIsEditing} />
                           <Button text={"Back to list"} onClick={backToUserList} />
                        </>
                     )}
                  </div>
               </form>
            </div>
         </section>
      );
   }
};

export default UserDetails;