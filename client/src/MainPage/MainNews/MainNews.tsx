import React, { ReactNode } from "react";
import Style from "./MainNews.module.css";

const BigBox = ({ backgroundColor }: { backgroundColor: string }) => (
  <div className={Style["bigbox"]} style={{ backgroundColor }}></div>
);

function MainNews() {
  return (
    <>
      <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>전해드릴 소식이 있어요📢</h2>
      <div className={Style["container"]}>
        <BigBox backgroundColor="lightgray" />
      </div>
    </>
  );
}

export default MainNews;
