// import mercury from "@mercury-js/core";
// const rules = [
//   {
//     modelName: "User",
//     access: {
//       create: true,
//       read: true,
//       update: true,
//       delete: true,
//     },
//   },
//   {
//     modelName: "Book",
//     access: {
//       create: true,
//       update: true,
//       delete: true,
//       read: true,
//     },
//   },
// ];
// export const Userprofile = mercury.access.createProfile("USER",rules);
import mercury from "@mercury-js/core";

const userRules = [
  {
    modelName: "User",
    access: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  },
  {
    modelName: "Book",
    access: {
      create: false,
      update: false,
      delete: false,
      read: true,
    },
  },
];

export const UserProfile = mercury.access.createProfile("USER", userRules);