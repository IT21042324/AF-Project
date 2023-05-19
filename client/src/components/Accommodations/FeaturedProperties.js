import useFetch from "../../hooks/useFetch";
import "../../styles/featuredProperties.css";

export const FeaturedProperties = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const { data, loading, error } = useFetch(
    `${backendUrl}/api/hotels?featured=true`
  );

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <br></br>
              <span className="fpCity">{item.city}</span>
              <br></br>
              <span className="fpPrice">
                Starting from <br></br> ${item.cheapestPrice} <br></br>per night
              </span>
              <br></br>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
