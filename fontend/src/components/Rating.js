export default function Rating(props) {
  const { rating, numReviews } = props;
  console.log(rating)
  return (
    <div className="ratting">
      <span>
        <i
          className={
            rating >= 1
              ? "fa fa-star"
              : rating >= 0.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          }
          aria-hidden="true"
        />
      </span>
      <span>
        <i  className={
            rating >= 2
              ? "fa fa-star"
              : rating >= 1.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          } aria-hidden="true" />
      </span>
      <span>
        <i  className={
            rating >= 3
              ? "fa fa-star"
              : rating >= 2.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          } aria-hidden="true" />
      </span>
      <span>
        <i  className={
            rating >= 4
              ? "fa fa-star"
              : rating >= 3.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          } aria-hidden="true" />
      </span>
      <span>
        <i  className={
            rating >= 5
              ? "fa fa-star"
              : rating >= 4.5
              ? "fa fa-star-half-o"
              : "fa fa-star-o"
          } aria-hidden="true" />
      </span>
      <span>{numReviews+" reviews"}</span>
    </div>
  );
}
