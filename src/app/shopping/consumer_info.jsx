import { GetConsumer } from "./axios";
import "./scss/consumer_info.scss";
import { useState } from "react";
import PurchaseLists from "./purchase_list";
import PurchaseDetail from "./purchase_detail";

const ConsumerItem = (prop) => {
  const [more, setMore] = useState(true);
  const data = GetConsumer(() => {});

  return (
    <>
      <div class="consumer-info-main-position">
        <div class="consumer-info-main-more shadow-lg" more={`${more}`}>
          <div class="row align-items-center">
            <div
              class="col consumer-info-title purchase-detail-border-title-boeder-left ms-3 "
              onClick={() => (more ? setMore(false) : setMore(true))}
            >
              Account Information
            </div>
            <a
              class="col-2 text-end text-decoration-none text-black me-2 consumer-info-detail-text"
              onClick={() => (more ? setMore(false) : setMore(true))}
            >
              {more ? "자세히보기 ▼" : "자세히보기 ▲"}
            </a>
          </div>
          <div class="mt-4 row consumer-info-detail-text">
            <div class="col-3 ">아이디 : {data.user_id}</div>
            <div class="col-3 ">이름 : {data.user_name}</div>
            <div class="col-4">휴대폰 번호 : {data.phone_number}</div>

            <div class="mt-2 row consumer-info-detail-text">
              <div class="">
                주소 : {data.address1}, {data.address2}
              </div>
            </div>
          </div>
          <div class="row mt-2 consumer-info-detail-text">
            <div class="col-3 ">남은캐쉬 : {data.cache}</div>
            <div class="col-3">남은 포인트 : {data.point}</div>
            <div class="col-3">사용한 금액 : </div>
            <div class="col-3">포인트 : </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ConsumerInfo = () => {
  const [purchase, setpurchase] = useState(0);

  return (
    <>
      <ConsumerItem />
      {purchase > 0 ? <PurchaseDetail purchase={purchase} /> : null}
      <PurchaseLists setpurchase={setpurchase} />
    </>
  );
};

export default ConsumerInfo;
