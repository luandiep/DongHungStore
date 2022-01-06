import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header(params) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <header className="row justify-content-between align-items-center">
      <div className="col-10">
        <Link className="brand" to={"/"}>
          amazoa
        </Link>
      </div>
      <div className="col">
        <Link to="/cart">
          Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
        </Link>
        <Link to="/signin">Sign in</Link>
      </div>
    </header>
  );
}
