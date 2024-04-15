import "./Timeline.css";
import React from "react";
const data = [
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
  {
    text: "Iqbal Akbar Ali",
    date: "March 03 2017",
    category: { tag: "medium", color: "Tomato" },
    link: { url: "http//google.com", text: "Readmore" },
  },
];
const TimelineItems = ({ data }) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <h2>{data.text}</h2>
      <span className="tag">{data.category.tag}</span>
      {data.link && (
        <a href={data.link.url} target="_blank">
          {data.link.text}
        </a>
      )}
      <span className="circle"></span>
    </div>
  </div>
);

export default function TimeLine() {
  return (
    <div className="timeline-container m-5">
      {data.map((data, idx) => (
        <TimelineItems data={data} key={idx} className="m-5" />
      ))}
    </div>
  );
}
