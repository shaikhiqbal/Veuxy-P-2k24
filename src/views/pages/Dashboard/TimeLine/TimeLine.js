import "./Timeline.css";
import React from "react";

// under writer data
const UWdata = [
  { writer: "uw", date: "18-10-1998", text: "UnderWriter Assign" },
];
// merchant Data
const MerchantData = [
  {
    writer: "Iqbal Shaikh",
    date: "2022-05-04 10:08:40",
    text: "Merchant Rates Approved",
  },
  {
    writer: "Iqbal Shaikh",
    date: "2022-05-04 10:08:40",
    text: "Merchant Rates Approved",
  },
];

// Under Writer Items
const UWTimelineItems = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <h4>{data.writer}</h4>
      <h4>{data.date}</h4>
      <p>{data.text}</p>
      <span className="circle"></span>
    </div>
  </div>
);

// Merchant  Items
const MerchantTimlineItems = ({ data }) => (
  <div className="timeline-item merchant">
    <div className="timeline-item-content">
      <h4>{data.writer}</h4>
      <h4>{data.date}</h4>
      <p>{data.text}</p>
      <span className="circle"></span>
    </div>
  </div>
);

// Timline Container
export default function TimeLine() {
  return (
    <div className="timeline-container m-5 border">
      {MerchantData.map((data, idx) => (
        <MerchantTimlineItems data={data} key={idx} className="m-5" />
      ))}
      {UWdata.map((data, idx) => (
        <UWTimelineItems data={data} key={idx} className="m-5" />
      ))}
    </div>
  );
}
