import "./scss/new_purchase.scss";

const ItemRow = (props) => {
  return (
    <>
      <div class="row ">
        <div class="col-1 -right new_purchase-height-50px new_purchase-pt-12px text-end">{props.label}</div>
        <div class="col-11 new_purchase-pt-12px">{props.text}</div>
      </div>
    </>
  );
};

const Purchase = () => {
  return (
    <>
      <div class="shadow m-4 rounded-2 bg-white">
        <div class="p-4 new_purchase-text-30px new_purchase-text-bold new_purchase-text-spacing">주문 / 결제</div>
      </div>
    </>
  );
};

const BuyerInfo = () => {
  return (
    <>
      <div class="shadow m-4 rounded-2 bg-white ">
        <div class="row p-4">
          <div class="new_purchase-text-bold new_purchase-text-23px">구매자</div>
          <div class="ps-4 pt-3 ">
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
          </div>
        </div>
      </div>
    </>
  );
};

const RecipientInfo = () => {
  return (
    <>
      <div class="shadow m-4 rounded-2 bg-white ">
        <div class="row p-4">
          <div class="new_purchase-text-bold new_purchase-text-23px">받는사람</div>
          <div class="ps-4 pt-3 ">
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
          </div>
        </div>
      </div>
    </>
  );
};

const OrderInfo = (props) => {
  return (
    <>
      <div class="shadow m-4 rounded-2 bg-white ">
        <div class="row p-4">
          <div class="new_purchase-text-bold new_purchase-text-23px">주문정보</div>
          <div class="ps-4 pt-3 ">
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
            <ItemRow label="label" text="text" />
          </div>
        </div>
      </div>
    </>
  );
};

const NewPurchase = (props) => {
  return (
    <>
      <div class="shadow m-3 rounded-2 bg-white">주문상품</div>
      <form type="submit">
        <Purchase />
        <BuyerInfo />
        <RecipientInfo />
        <OrderInfo />
        <div class="text-center mt-5 mb-5">
          <button class="btn btn-outline-success w-50">주문하기</button>
        </div>
      </form>
    </>
  );
};

export default NewPurchase;
