import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../styles/place.css'

export function DisplayPlaces() {

    const [places, setPlaces] = useState([]);
    const [url, setUrl] = useState('');
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([]);
    const [placeName, setPlaceName] = useState("");
    const [placeDescription, setPlaceDescription] = useState("");

    //function to display all the items
    useEffect(() => {
        function getPlaces() {
            axios.get("http://localhost:8070/api/place/").then((res) => {
                setPlaces(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getPlaces();
    }, [])

    //Search items
    const searchPlaces = async (e) => {

        e.preventDefault()

        axios.get(`http://localhost:8070/api/place/search/${searchTerm}`).then((res) => {
            setSearchResults(res.data)
        }).catch((err) => {
            console.log(err)
        })
    };

    const showUpdateBox = () => {
        document.getElementById("backdrop").style.display = "block";
    };

    const handleClose = () => {
        document.getElementById("backdrop").style.display = "none";
        setNewImageUrl("");
    };

    //image
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    //function to get one place
    function getOnePlace(pid) {
        axios
            .get("http://localhost:8070/api/place/" + pid)
            .then((res) => {
                setPlaceName(res.data.placeName);
                setPlaceDescription(res.data.placeDescription);
                setImageUrl(res.data.imageUrl);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    function sendData(e) {
        e.preventDefault();

        let updateUrl;

        if (newImageUrl === "") {
            updateUrl = imageUrl;
        } else {
            updateUrl = newImageUrl;
        }

        const newPlace = {
            placeName,
            placeDescription,
            imageUrl: updateUrl,
        };

        setNewImageUrl("");
    }

    return (
        <>
            <form style={{ backgroundColor: "transparent", border: "0", marginLeft: "20px", margintop: "0", padding: "0" }} role="search" onSubmit={searchPlaces}>
                <input className="form-control me-2" type="search" placeholder="Search Places" aria-label="Search" style={{ width: "20%" }}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }} />
            </form>

            {/* Displaying search items */}

            < div class="container text-center" >

                <div class="row">

                    {searchResults.map((place) => (

                        <div class="card" style={{ width: "19rem", height: "35rem", marginBottom: "50px", marginLeft: "40px" }}>
                            <div class="card-image-area">
                                <img src={place.imageUrl} style={{ width: "80%", height: "10rem", margin: '0px auto' }} class="card-img-top" alt="..."></img>
                                <div class="card-body">
                                    {/* <h5 class="card-title">Item ID: {item._id}</h5> */}
                                    <h5 class="card-text">{place.placeName}</h5>
                                    <div className='scroll-description-user'>
                                        <p style={{ textAlign: "left" }} class="card-text">{place.placeDescription}</p>
                                    </div>
                                    {/* <button type="button" class="btn btn-success">Button</button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Display all items */}
            < div class="container text-center" >
                <h3 style={{ fontFamily: "cursive", color: "green", backgroundColor: "#C1E1C1", padding: "20px" }}>TOURIST PLACES</h3>
                <br></br>
                <div class="row">
                    {places.map(place => (
                        <div class="col-12 col-md-6 col-lg-3" >
                            <div class="card" style={{ width: "18rem", height: "39rem", marginBottom: "40px" }}>
                                <div class="card-image-area">
                                    <img src={place.imageUrl} style={{ width: "80%", height: "10rem", margin: '0px auto' }} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        {/* <h5 class="card-title">Item ID: {item._id}</h5> */}
                                        <h5 class="card-text"> {place.placeName}</h5>
                                        <div className='scroll-description-user'>
                                            <p style={{ textAlign: "left" }} class="card-text">{place.placeDescription}</p>
                                        </div>
                                        <br/>
                                        <button type="button" class="btn btn-outline-dark" style={{padding: "10px 24px"}} onClick={() => {
                                            getOnePlace(place._id);
                                            showUpdateBox();
                                        }}>View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >

            {/* View */}
            <div id="backdrop" className="backdrop-black">
                <div
                    id="update-box"
                    className="container, form-style"
                    style={{ position: "relative", marginLeft: "10%" }}
                >
                    <br></br>
                    <button
                        onClick={handleClose}
                        className="btn btn-outline-danger"
                        style={{
                            width: "40px",
                            height: "40px",
                            position: "absolute",
                            right: "320px",
                            top: "40px",
                        }}
                    >
                        X
                    </button>
                    <form
                        onSubmit={sendData}
                        style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
                    >
                        {/* <h3 style={{fontFamily: "cursive"}}>Update Place</h3> */}
                        <table>
                            <tr>
                                <td>
                                    <div className="mb-3">
                                        <h3>{placeName}</h3>
                                        <p style={{textAlign:"left"}}>{placeDescription}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <img
                                            src={newImageUrl || imageUrl}
                                            alt=""
                                            style={{ width: 320, height: 400 }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>

        </>
    )
}