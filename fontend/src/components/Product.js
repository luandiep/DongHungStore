import Rating from "./Rating";
import { Link } from "react-router-dom";
export default function Product(props) {
  return (
    <div className="col-6 col-md-3 col-sm-6">
      <div className="card ">
        <Link to={`product/${props.item._id}`}>
          <img
            className="card-img-top"
            src={props.item.image}
            alt={props.item.name}
          />
        </Link>
        <div className="card-body">
          <Link to={`product/${props.item._id}`}>
            <h5 className="card-title">{props.item.name}</h5>
          </Link>
          <Rating
            rating={props.item.rating}
            numReviews={props.item.numReviews}
          />
          <div className="price">${props.item.price}</div>
        </div>
      </div>
    </div>
  );
}
