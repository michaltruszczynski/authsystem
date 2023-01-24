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

export const getRoleValue = (searchedRole) => {
   const userRolesArray = Object.entries(ROLES);
   const foundRole = userRolesArray.find((userRole) => userRole[1] === searchedRole);
   return { label: USER_ROLES[foundRole[0]], value: foundRole[1] };
};

export const getRoleString = (roles) => {
   return roles.map((role) => {
      if (role === ROLES.User) return "User";
      else if (role === ROLES.Editor) return "Editor";
      else if (role === ROLES.Admin) return "Administrator";
      else {
         return null;
      }
   })
}


export const isEven = (number) => {
   if (number % 2 === 0) {
      return true;
   }
   return false;
};
