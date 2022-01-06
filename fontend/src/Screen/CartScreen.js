import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  cartAddProducts,
  cartDeleteProduct,
} from "../action/cartProductActions";
import MessageBox from "../components/MessageBox";
export default function CartScreen(props) {
  const productId = useParams().id;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  let dispatch = useDispatch();

  const cartProduct = useSelector((state) => state.cart);
  const { cartItems } = cartProduct;
  useEffect(() => {
    if (productId) {
      dispatch(cartAddProducts(productId, qty));
    }
  }, []);
  function cartRemove(id) {
    dispatch(cartDeleteProduct(id));
  }
  return (
    <div>
      <h1>Cart screen </h1>
      {cartItems.length == 0 ? (
        <MessageBox>không có sản phẩm trong giỏ hàng</MessageBox>
      ) : (
        <div className="row">
          <div className="col">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((x, k) => {
                  return (
                    <tr>
                      <th scope="row">{k + 1}</th>
                      <td>
                        <img class="img-small" src={x.image} alt={x.name}></img>
                      </td>
                      <td>{x.name}</td>
                      <td>
                        <select
                          className="form-control"
                          value={x.countInStock}
                          onChange={(e) =>
                            dispatch(cartAddProducts(x.product, e.target.value))
                          }
                        >
                          {[...Array(10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {" "}
                              {x + 1}{" "}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{x.price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => cartRemove(x.product)}
                        >
                          {" "}
                          <i class="fa fa-trash" aria-hidden="true"></i> Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className=" col-3">
            <div class="card text-white bg-primary">
              <div class="card-body">
                <h4 class="card-title">
                  Tổng:(
                  {cartItems.reduce((a, c) => a + Number(c.countInStock), 0)}) $
                  {cartItems.reduce(
                    (a, c) => a + c.price * Number(c.countInStock),
                    0
                  )}
                </h4>
                <p class="card-text">
                  <span className="btn btn-block btn-warning ">Thanh toán</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
