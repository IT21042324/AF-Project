import useFetch from "../../hooks/useFetch";
import "../../styles/propertyList.css";

export const PropertyList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const { data, loading, error } = useFetch(
    `${backendUrl}/api/hotels/countByType`
  );

  const images = [
    "https://media-cdn.tripadvisor.com/media/photo-s/16/4e/ab/cb/mount-blue-hotel.jpg",
    "https://www.fletcherliving.co.nz/assets/Uploads/AO-2022-06-15-FLETCHER-LIVING-0005-Edit-v3__FillWzEyMDAsNjMwXQ.jpg",
    "https://assets.traveltriangle.com/blog/wp-content/uploads/2018/12/Amanwella.jpg",
    "https://www.ministryofvillas.com/wp-content/uploads/2019/03/sri-lanka-villarepublicbentota-47.jpg",
    "https://www.resort98acres.com/wp-content/uploads/2013/04/slider-5.jpg",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
