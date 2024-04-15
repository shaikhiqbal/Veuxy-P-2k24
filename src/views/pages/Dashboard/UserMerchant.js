import React from "react";
import Admin from "./userMerchantList/Admin";
import UnderWriter from "./userMerchantList/UnderWriter";
import ISO from "./userMerchantList/ISO";
import FRT from "./userMerchantList/FRT";
export default function UserMerchant() {
  return (
    <div>
      <Admin />
      <UnderWriter />
      <ISO />
      <FRT />
    </div>
  );
}
