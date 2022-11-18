import "./scss/product.scss";
const Product = (props) => {
  const data = props.data;
  const cache = data.cache.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const discount = data.discount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const shipping_fee = data.shipping_fee
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      <div class="m-3 shadow border-gray-1px rounded-2">
        <div class="mt-3 mb-3 maxheight flex ">
          <div class="paddingtop width130px border-right-1px justify-item-center text-center">
            <img
              class="thumnail rounded-2"
              src="https://picsum.photos/150/150/?random"
            ></img>
          </div>
          <div class="flex-grow-1  border-right-1px ms-3">
            <p class="text-large">제목{data.item_name}</p>
            <p class="h-50 text-medium overflow-hidden width300px">
              {data.item_content.substring(0, 100)}...
            </p>
          </div>
          <div class=" width130px border-right-1px text-large ms-3">
            <div class="text-medium-bold">
              {data.discount !== 0 ? "￦" + discount : "￦" + cache}
            </div>
            <div class="text-small">
              <a class="text-small-cancel">￦{cache}</a>
              <a class="text-small-red">
                할인{((data.cache - data.discount) * 100) / data.cache}%
              </a>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p class="text-small">
                <a>배송비 : </a>
                <a>{data.shipping_fee !== 0 ? "￦" + shipping_fee : "무료"}</a>
              </p>
            </div>
          </div>
          <div class="text-large width150px ms-3">{data.seller.user_name}</div>
        </div>
      </div>
    </>
  );
};

export default Product;
