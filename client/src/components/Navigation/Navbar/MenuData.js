const ROLES = {
   User: 2001,
   Editor: 1984,
   Admin: 5150,
};

export const menuData = [
   {
      title: "Home",
      url: "/",
      cName: "nav-link",
      icon: null,
      allowedRoles: [],
   },
   {
      title: "User list",
      url: "/userlist",
      cName: "nav-link",
      icon: null,
      allowedRoles: [ROLES.User, ROLES.Admin, ROLES.Editor],
   },
   {
      title: "Editor",
      url: "/editor",
      cName: "nav-link",
      icon: null,
      allowedRoles: [ROLES.Admin, ROLES.Editor],
   },
   {
      title: "Admin",
      url: "/admin",
      cName: "nav-link",
      icon: null,
      allowedRoles: [ROLES.Admin],
   },
];
