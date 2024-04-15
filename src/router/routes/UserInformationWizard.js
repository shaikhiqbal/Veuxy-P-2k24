import { lazy } from "react";

const UserInformationForm = lazy(() =>
  import("../../views/pages/user-information/form-wizard/steps-with-all-form")
);

const UserInformationForms = [
  {
    path: "/user_information_form",
    element: <UserInformationForm />,
    meta: {
      layout: "blank",
    },
  },
];

export default UserInformationForms;
