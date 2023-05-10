import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Headers/Header";
import Footer from "../../Footers/Footer";
import Style from "../SubPage.module.css";

function ViewAll() {
  return (
    <div>
      <div className={Style["App"]}>
        <Header />
      </div>
      <div className={Style["liner"]}></div>
      {/* <br /> */}
      <h1 style={{ marginLeft: "5rem" }}>상품 모두보기 페이지</h1>
      <Footer />
    </div>
  );
}

export default ViewAll;