import {lazy} from 'react'


const ActivationUser=lazy(()=>import('../../views/pages/authentication/NewPassword'))




const UserActivation=[

    {
        path: "/activate-user/:uid/:token",
        element: <ActivationUser />,
        layout: "BlankLayout",
        meta: {
          layout: "blank",
          publicRoute: true,
          restricted: true,
        },
      },
]

export default UserActivation