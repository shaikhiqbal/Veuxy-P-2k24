import React from "react";
import DashboardMerchantList from "./dashboardMerchantList";
import UserMerchant from "./UserMerchant";
import ApprovedMerchant from "./ApprovedMerchant";
import RejectMerchant from "./RejectMerchant";
import OverdeuMerchant from "./OverdeuMerchant";
import Notes from "./Notes";
import Bank from "./Bank";
import TimeLine from "./TimeLine/TimeLine";
import DashBoardNavigation from "./DashBoardNavigation";
import SwiperAutoplay from "./";
export default function Index() {
  return (
    <div>
      <div>
        <DashboardMerchantList />
      </div>
      <div>
        <UserMerchant />
      </div>
      <div>
        <ApprovedMerchant />
      </div>
      <div>
        <RejectMerchant />
      </div>
      <div>
        <OverdeuMerchant />
      </div>
      <div>
        <Bank />
      </div>
      <div>
        <Notes />
      </div>
      <div>
        <TimeLine />
      </div>
      <div>{/* <DashBoardNavigation /> */}</div>
      {/* <SwiperAutoplay /> */}
    </div>
  );
}
