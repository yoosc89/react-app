import Product from "./product";
import { Link, useParams } from "react-router-dom";
import ProductDetail from "./product_datail";
import { useState } from "react";
import { AxiosProductList } from "./axios";

const LinkProduct = (props) => {
  return (
    <div>
      <Link
        to={`detail${props.data.id}`}
        class="text-decoration-none"
        onClick={() => props.setproductdetailview(true)}
      >
        <Product data={props.data} />
      </Link>
    </div>
  );
};

const ProductList = (props) => {
  const [productdetailview, setproductdetailview] = useState(false);
  const data = AxiosProductList();

  return (
    <>
      {productdetailview ? (
        <ProductDetail setproductdetailview={setproductdetailview} />
      ) : null}
      <div class="text-start m-3">
        <button class="btn btn-primary ">
          <Link
            to="/shopping/new_product"
            class="text-white text-decoration-none"
          >
            새로 만들기
          </Link>
        </button>
      </div>

      {data?.product_list?.map((item) => (
        <LinkProduct data={item} setproductdetailview={setproductdetailview} />
      ))}
    </>
  );
};

export default ProductList;
