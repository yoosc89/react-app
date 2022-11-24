import "./scss/purchase_list.scss";
import { AxoisOrderList } from "./axios";

const PurchaseItem = (props) => {
  const data = props.data;

  return (
    <>
      <div class="new_purchase-list-main">
        <div class="m-3 shadow-lg purchase-list-main-border">
          <div class="row purchase-list-height150px m-3 ">
            <div class="col-1 purchase-list-width150px new_purchase-list-thumnail">
              <img
                class="rounded-1 new_purchase-list-thumnail "
                src={`https://picsum.photos/150/1${Math.floor(Math.random() * 100)}/?random`}
              />
            </div>
            <div class="col row ms-0 ">
              <div class="purchase-list-purchase-number purchase-list-button-border-left">
                주문번호 : {data.purchase_number}
              </div>
              <div class="purchase-list-purchase-title purchase-list-button-border-left">
                제목 : {data.product.item_name}
              </div>
              <div class="purchase-list-purchase-body purchase-list-button-border-left">수량 : {data.count} 개 </div>
              <div class="purchase-list-purchase-body purchase-list-button-border-left">
                가격 : {data.cache.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;&nbsp;&nbsp; /
                &nbsp;&nbsp;&nbsp;배송비 :
                {data.shipping_fee !== 0 ? data.shipping_fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "무료"}
              </div>
            </div>
            <div class="col-3 row ms-0 purchase-list-width150px text-center align-items-center purchase-list-button-border-left">
              <div>
                <button
                  class="purchase-list-button w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setpurchase(data.id);
                    window.scrollTo(1, 1);
                  }}
                >
                  상세정보
                </button>
              </div>
              <div>
                <button class="purchase-list-button w-100">택배조회</button>
              </div>
              <div>
                <button class="purchase-list-button w-100">기타</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PurchaseLists = (props) => {
  const data = AxoisOrderList(props.page, props.size, (callback) => {});
  const purchase_list = data.purchase_list;

  return (
    <>
      <div>
        {purchase_list && purchase_list.map((item) => <PurchaseItem data={item} setpurchase={props.setpurchase} />)}
      </div>
    </>
  );
};

export default PurchaseLists;
