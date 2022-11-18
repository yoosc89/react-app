import Product from "./product";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductDetail from "./product_datail";
import { AxiosProductList } from "./axios";

const LinkProduct = (props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={async () => {
        navigate(`detail${props.data.id}`);
        await window.scrollTo({ top: 0, behavior: "instant" });
      }}
    >
      <Product data={props.data} />
    </div>
  );
};

const ProductList = (props) => {
  const data = AxiosProductList();
  const { detail } = useParams();

  return (
    <>
      {console.log(localStorage.getItem("mode"))}
      {detail ? <ProductDetail /> : null}
      {localStorage.getItem("mode") === "Seller" ? (
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
      ) : null}

      {data?.product_list?.map((item) => (
        <LinkProduct data={item} />
      ))}
    </>
  );
};

export default ProductList;
