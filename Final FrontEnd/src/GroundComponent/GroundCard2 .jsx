import { Link } from "react-router-dom";

const GroundCard2 = ({ item }) => {
  return (
    <div className="col">
      <div className="card border-color rounded-card card-hover product-card custom-bg h-100">
        <img
          src={"http://localhost:8080/api/ground/" + item.image}
          className="card-img-top rounded mx-auto d-block m-2"
          alt="img"
          style={{
            maxHeight: "270px",
            maxWidth: "100%",
            width: "auto",
          }}
        />
        <div className="card-footer">
          <div className="text-center text-color">
            <p>
              <span>
                <h4>Price : &#8377;{item.price}</h4>
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Link
              to={`/book/ground/${item.id}`}
              className="btn bg-color custom-bg-text"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundCard2;

