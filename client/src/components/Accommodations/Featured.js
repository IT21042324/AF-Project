import useFetch from "../../hooks/useFetch";
import "../../styles/featured.css";

export const Featured = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const { data, loading, error } = useFetch(
    `${backendUrl}/api/hotels/countByCity?cities=Kandy,Galle,Colombo,Anuradhapura,Jaffna`
  );

  return (
    <>
      <div className="subTitle">
        Browse our most popular travel Destinations
      </div>
      <div className="featured">
        {loading ? (
          "Loading please wait"
        ) : (
          <>
            <div className="featuredItem">
              <img
                src="https://static.wixstatic.com/media/65f045_e4c0db99c4294f6194d270687add03f6~mv2.jpg/v1/crop/x_0,y_51,w_1105,h_469/fill/w_560,h_260,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/kandy_polwaththa_srilanka_jpeg.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Kandy</h1>
                <h2>{data[0]} Accommodation Providers</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img
                src="https://img.traveltriangle.com/blog/wp-content/uploads/2019/08/shutterstock_599364767.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Galle</h1>
                <h2>{data[1]} Accommodation Providers</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img
                src="https://www.andbeyond.com/wp-content/uploads/sites/5/colombo-sri-lanka.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Colombo</h1>
                <h2>{data[2]} Accommodation Providers</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img
                src="https://explore.vacations/wp-content/uploads/2020/06/Night-view-of-Anuradhapura-Sri-Lanka.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Anuradhapura</h1>
                <h2>{data[3]} Accommodation Providers</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img
                src="https://lp-cms-production.imgix.net/2021-05/Jaffna_Fort_Sri_Lanka.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Jaffna</h1>
                <h2>{data[4]} Accommodation Providers</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Featured;
