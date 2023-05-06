import picture1 from "../../assets/placeStatic1.jpg";
import picture2 from "../../assets/placeStatic2.jpeg";
import picture3 from "../../assets/placeStatic3.jpeg";
import picture4 from "../../assets/placeStatic4.jpeg";
import picture5 from "../../assets/placeStatic5.jpeg";
import "../../styles/placeAdmin.css"
import { useNavigate } from "react-router-dom";

export function AdminMainPage() {
    
    const navigate = useNavigate("")

    return (
        <>
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: '20px', top: '30px' }}>
                    <button class="btn" style={{ marginRight: "5px" }} type="submit" onClick={() => {
                        navigate('/PlaceRoutesAdmin/addPlace')
                    }}>Add New Places</button>
                    <button class="btn"type="submit" onClick={() => {
                        navigate('/PlaceRoutesAdmin/allPlaces')
                    }}>View Places</button>
                </div>
                <div class="container text-center">
                    <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                        <div class="col">
                            <div class="p-3">
                                <img src={picture1} style={{ width: "220px", height: "250px", marginLeft: "90%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1)", borderRadius: "10%" }} />
                            </div>
                        </div>
                        <div class="col">
                            <div class="p-3">
                                <img src={picture2} style={{ width: "220px", height: "250px", marginLeft: "78%", marginTop: "40%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1)", borderRadius: "10%" }} />
                            </div>
                        </div>
                        <div class="col">
                            <div class="p-3">
                                <img src={picture3} style={{ width: "220px", height: "250px", marginLeft: "67%", marginTop: "90%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1)", borderRadius: "10%" }} />
                            </div>
                        </div>
                        <div class="col">
                            <div class="p-3">
                                <img src={picture4} style={{ width: "220px", height: "250px", marginLeft: "55%", marginTop: "140%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1)", borderRadius: "10%" }} />
                            </div>
                        </div>
                        <div class="col">
                            <div class="p-3">
                                <img src={picture5} style={{ width: "220px", height: "250px", marginLeft: "44%", marginTop: "190%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1)", borderRadius: "10%" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}