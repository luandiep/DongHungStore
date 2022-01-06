import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { detailsProducts } from "../action/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
  let dispatch = useDispatch();
  let history = useNavigate();
  const id = useParams();
  const [qty, setQty] = useState(1);
  console.log(props.children);
  const products = useSelector((state) => state.productDetail);
  const { loading, error, product } = products;
  useEffect(() => {
    dispatch(detailsProducts(id.id));
  }, [dispatch, id.id]);

  const addCart = () => {
    history({ pathname: `/cart/${id.id}?qty=${qty}` });
    
  };
  if (!product) {
    return <div>not fould </div>;
  }
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>

          <div className="row">
            <div className="col-6">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-3">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <div className="card ">
                <div className="card-body">
                  <ul>
                    <li className="row justify-content-between m-0">
                      <div>price</div>
                      <div>${product.price}</div>
                    </li>
                    <li className="row justify-content-between m-0">
                      <div>status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </li>
                    {product.countInStock > 0 && (
                      <li className="row justify-content-between m-0">
                        <div>status</div>
                        <div>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {" "}
                                  {x + 1}{" "}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </li>
                    )}
                  </ul>
                  <button
                    onClick={addCart}
                    className="btn btn-primary btn-block"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
