import "./scss/purchase_detail.scss";

import { GetPurchaseDetail } from "./axios.jsx";

const Productdetail = (props) => {
  const data = props.data;
  const product = (data.product ??= data.product);
  const seller = product?.seller;

  return (
    <>
      <div class="row shadow-lg mt-2  mb-2 pt-3 pb-5 ms-0 purchase-detail-main-detail-witdh160">
        <div class="purchase-detail-title ms-3 mb-5 purchase-detail-border-title-boeder-left">Product Information</div>

        <div class="purchase-detail-main-detail-witdh">
          <img
            class="purchase-detail-main-detail-thumnail shadow rounded-2"
            src={`https://picsum.photos/150/1${Math.floor(Math.random() * 100)}/?random`}
          />
        </div>
        <div class="col purchase-detail-border-left">
          <div class=" purchase-detail-border-seller-large pt-1 pb-1">주문번호 : {data.purchase_number} </div>
          <div class=" purchase-detail-border-seller-me pt-3 pb-5">이름 : {product?.item_name}</div>
          <div class=" purchase-detail-border-seller-me pt-1 pb-1">
            가격 : {product?.discount ? product?.discount : product?.cache}
          </div>
        </div>
        <div class="col-3 purchase-detail-border-left">
          <div class="pt-1 pb-0 purchase-detail-border-seller-me">업체명</div>
          <div class="pb-3 purchase-detail-border-seller-sm">{seller?.user_name}</div>
          <div class="pb-0 purchase-detail-border-seller-me">연락처</div>
          <div class="pb-3 purchase-detail-border-seller-sm">{seller?.phone_number}</div>
          <div class="pb-0 purchase-detail-border-seller-me">사업자번호</div>
          <div class="pb-2 purchase-detail-border-seller-sm">{seller?.regist_number}</div>
        </div>
      </div>
    </>
  );
};

const Consumerinfo = (props) => {
  return (
    <>
      <div class="row shadow-lg mt-4 mb-2 pt-3 pb-5 ms-0 purchase-detail-main-detail-witdh160">
        <div class="purchase-detail-title ms-3 mb-5 purchase-detail-border-title-boeder-left">Consumer Information</div>

        <div class="purchase-detail-main-detail-witdh">
          <img
            class="purchase-detail-main-detail-thumnail shadow rounded-2"
            src={`https://picsum.photos/150/1${Math.floor(Math.random() * 100)}/?random`}
          />
        </div>
        <div class="col purchase-detail-border-left">
          <div class=" purchase-detail-border-seller-large pt-1 pb-1">주문번호 : </div>
          <div class=" purchase-detail-border-seller-me pt-3 pb-5">이름 : </div>
          <div class=" purchase-detail-border-seller-me pt-1 pb-1">가격 : </div>
        </div>
        <div class="col-3 purchase-detail-border-left">
          <div class="pt-1 pb-0 purchase-detail-border-seller-me">업체명</div>
          <div class="pb-3 purchase-detail-border-seller-sm">우슈</div>
          <div class="pb-0 purchase-detail-border-seller-me">연락처</div>
          <div class="pb-3 purchase-detail-border-seller-sm">0100011111</div>
          <div class="pb-0 purchase-detail-border-seller-me">사업자번호</div>
          <div class="pb-2 purchase-detail-border-seller-sm">2223223</div>
        </div>
      </div>
    </>
  );
};

const Recipientinfo = (props) => {
  return (
    <>
      <div class="row shadow-lg mt-4 mb-2 pt-3 pb-5 ms-0 purchase-detail-main-detail-witdh160">
        <div class="purchase-detail-title ms-3 mb-5 purchase-detail-border-title-boeder-left">
          Recipient Information
        </div>

        <div class="purchase-detail-main-detail-witdh">
          <img
            class="purchase-detail-main-detail-thumnail shadow rounded-2"
            src={`https://picsum.photos/150/1${Math.floor(Math.random() * 100)}/?random`}
          />
        </div>
        <div class="col purchase-detail-border-left">
          <div class=" purchase-detail-border-seller-large pt-1 pb-1">주문번호 : </div>
          <div class=" purchase-detail-border-seller-me pt-3 pb-5">이름 : </div>
          <div class=" purchase-detail-border-seller-me pt-1 pb-1">가격 : </div>
        </div>
        <div class="col-3 purchase-detail-border-left">
          <div class="pt-1 pb-0 purchase-detail-border-seller-me">업체명</div>
          <div class="pb-3 purchase-detail-border-seller-sm">우슈</div>
          <div class="pb-0 purchase-detail-border-seller-me">연락처</div>
          <div class="pb-3 purchase-detail-border-seller-sm">0100011111</div>
          <div class="pb-0 purchase-detail-border-seller-me">사업자번호</div>
          <div class="pb-2 purchase-detail-border-seller-sm">2223223</div>
        </div>
      </div>
    </>
  );
};

const Patmentinfo = (props) => {
  return (
    <>
      <div class="row shadow-lg mt-4 mb-2 pt-3 pb-5 ms-0 purchase-detail-main-detail-witdh160">
        <div class="purchase-detail-title ms-3 mb-5 purchase-detail-border-title-boeder-left">Payment Information</div>

        <div class="purchase-detail-main-detail-witdh">
          <img
            class="purchase-detail-main-detail-thumnail shadow rounded-2"
            src={`https://picsum.photos/150/1${Math.floor(Math.random() * 100)}/?random`}
          />
        </div>
        <div class="col purchase-detail-border-left">
          <div class=" purchase-detail-border-seller-large pt-1 pb-1">주문번호 : </div>
          <div class=" purchase-detail-border-seller-me pt-3 pb-5">이름 : </div>
          <div class=" purchase-detail-border-seller-me pt-1 pb-1">가격 : </div>
        </div>
        <div class="col-3 purchase-detail-border-left">
          <div class="pt-1 pb-0 purchase-detail-border-seller-me">업체명</div>
          <div class="pb-3 purchase-detail-border-seller-sm">우슈</div>
          <div class="pb-0 purchase-detail-border-seller-me">연락처</div>
          <div class="pb-3 purchase-detail-border-seller-sm">0100011111</div>
          <div class="pb-0 purchase-detail-border-seller-me">사업자번호</div>
          <div class="pb-2 purchase-detail-border-seller-sm">2223223</div>
        </div>
      </div>
    </>
  );
};

const PurchaseDetail = (props) => {
  const purchase_id = props.purchase;

  const data = GetPurchaseDetail(purchase_id);

  return (
    <>
      <div>
        <div class="purchase-detail-main">
          <div class="purchase-detail-main-border shadow">
            <div class="row purchase-detail-center">
              <Productdetail data={data} />
              <Consumerinfo />
              <Recipientinfo />
              <Patmentinfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseDetail;
