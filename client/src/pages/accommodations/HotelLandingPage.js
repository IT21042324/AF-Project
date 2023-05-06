import {Featured} from "../../components/Accommodations/Featured";
import {FeaturedProperties} from "../../components/Accommodations/FeaturedProperties";
import {PropertyList} from "../../components/Accommodations/PropertyList";
import {Header} from "../../components/Accommodations/AccHeader";

import "../../styles/accLandPage.css";

export const AccLandingPage= () => {
  return (
    <div>
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle2">FEATURED: Customer Picked Best Stays</h1>
        <FeaturedProperties/>
        <Featured/>
        <h1 className="homeTitle">Browse The Accommodation Types We Offer</h1>
        <PropertyList/>
        
        
        
        
      </div>
    </div>
  );
};

