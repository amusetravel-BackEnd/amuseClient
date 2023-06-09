import { Routes, Route } from "react-router-dom";
import Home from "../src/Home";
import SubPageComp from "./SubPages/SubPageComp";
import MyPage from "./MyPages/MyPage";
import Login from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import Detail from "./DetailPage/Detail/Detail";
import Review from "./MyPages/Review/Review";
import ViewAll from "./SubPages/ViewAllPages/ViewAll";
// import GyeonggiPage from "./SubPages/Regions/GyeonggiPage";
// import GangwonPage from "./SubPages/Regions/GangwonPage";
import SearchPageComp from "./SubPages/SearchPageComp";
// import NotFound from './NotFound';
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Headers/Header";
import Footer from "./Footers/Footer";

function App() {
  /*
  const apiUrl = "https://ammuse.shop/amusetest";
  const [data, setData] = useState<Response | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        setData(responseData);
        console.log(data);
      } catch (error) {
        console.log("연결 실패");
        console.error(error);
      }
    };

    fetchData();
  });
  */

  /**
   * Current Item API
   */
  const [currentItemIds, setCurrentItemIds] = useState<number[]>([]);
  const [currentItemProductCodes, setCurrentItemProductCodes] = useState<number[]>([]);
  const [currentItemStartPrices, setCurrentItemStartPrices] = useState<number[]>([]);
  const [currentItemLikeNums, setCurrentItemLikeNums] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get("http://43.200.171.174/item/search?page=1")
      .then((response) => {
        const items = response.data.data.items;
        const ids = items.map((item: any) => item.item_db_id);
        const codes = items.map((item: any) => item.product_code);
        const prices = items.map((item: any) => item.startPrice);
        const likeNums = items.map((item: any) => item.likeNum);

        setCurrentItemIds(ids);
        setCurrentItemProductCodes(codes);
        setCurrentItemStartPrices(prices);
        setCurrentItemLikeNums(likeNums);

        //console.log(response.data.data.items[0])
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, []);

  /**
   * Course API
   */
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  useEffect(() => {
    axios
      .get("https://ammuse.store/main/category")
      .then((response) => {
        const categories = response.data.data.categories;
        const ids = categories.map((category: any) => category.categoryId);
        setCategoryIds(ids);
        //console.log(response.data.data.categories);
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Concierge" element={<Concierge />}></Route>
        <Route path="/ChildCare" element={<ChildCare />}></Route>
        <Route path="/SeniorCare" element={<SeniorCare />}></Route> */}
        <Route path="/LogIn" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/MyPage/:category" element={<MyPage />}></Route>
        <Route path="/Review/:id" element={<Review />}></Route>
        {/* <Route path="/OnlineTour" element={<OnlineTour />}></Route> */}
        <Route path="/ViewAll" element={<ViewAll />}></Route>
        <Route path="/Subtest" element={<SubPageComp />}></Route>

        {/**
         * 상세페이지 Route
         */}
        {currentItemIds.map((currentItemId, index) => (
          <Route
            key={currentItemId}
            path={`/detail/${currentItemId}`}
            element={
              <Detail
                itemId={currentItemId}
                productCode={currentItemProductCodes[index]}
                startPrice={currentItemStartPrices[index]}
                likeNum={currentItemLikeNums[index]}
              />
            }
          />
        ))}
        {/**
         * 서브페이지 Route
         */}
        <Route path="/category/:apiKey" element={<SubPageComp />} />
        {/**
         * 검색 시 Route
         */}
        <Route path="/search/:apiKey" element={<SearchPageComp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
