import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../styles/place.css'
import picture from "../../assets/placeMain.png";

export function AllPlaces() {

    const [places, setPlaces] = useState([]);
    const [placeID, setPlaceID] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
    // const [imageUrl, setUrl] = useState('')

    //function to display all the places
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

    //function to get one place
    function getOnePlace(pid) {
        axios.get("http://localhost:8070/api/place/" + pid).then((res) => {
            setPlaceID(res.data._id);
            setPlaceName(res.data.placeName);
            setPlaceDescription(res.data.placeDescription);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const showUpdateBox = () => {
        document.getElementById('backdrop').style.display = "block"
    }

    const handleClose = () => {
        document.getElementById('backdrop').style.display = "none"
    }

    //Update place function
    function sendData(e) {
        e.preventDefault();

        const newPlace = {
            placeName,
            placeDescription,
            imageUrl
        }

        const id = placeID;

        axios.patch("http://localhost:8070/api/protectedPlace/update/" + id, newPlace).then(() => {
            alert("Place Details Updated");
            window.location.reload();
        }).catch((err) => {
            alert(err)
        })

    }

    //delete place function
    function deletePlace(id) {
        axios.delete("http://localhost:8070/api/protectedPlace/delete/" + id).then((res) => {
            alert('Place Deleted');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
        })
    }

    //image
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

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
    //uploading the image
    const uploadImage = async (event) => {

        event.preventDefault()

        const file = event.target.files[0];
        const base64 = await convertBase64(file)
        setLoading(true);
        console.log(base64)
        axios.post("http://localhost:8070/uploadImage", { image: base64 }).then((res) => {
            console.log(res.data)
            setImageUrl(res.data);

            //res.data
            alert("Image uploaded Succesfully");
        }).then(() => setLoading(false))
            .catch(console.log);
    }

    return (
        <>
            < div class="container text-center" >
                <div class="row">
                    <h3>UPDATE / DELETE PLACES</h3>
                    <br></br>
                    <br></br>
                    {places.map(place => (

                        // <div class="col-12 col-md-6 col-lg-4" >

                        <div class="card" style={{ width: "22rem", height: "40rem", marginBottom: "40px", marginLeft: "40px" }}>
                            <img src={place.imageUrl} style={{ width: "80%", height: "14rem", margin: '0px auto' }} class="card-img-top" alt="..."></img>
                            <div class="card-body">
                                <h6 class="card-title">Place ID: {place._id}</h6>
                                <h5 class="card-text">{place.placeName}</h5>
                                <div className='scroll-description'>
                                    <p class="card-text">{place.placeDescription}</p>
                                </div>
                                <br></br>
                                <button type="button" class="btn btn-dark m-3 mt-0 mb-0" onClick={() => {
                                    getOnePlace(place._id);
                                    showUpdateBox();
                                }}>Update</button>
                                <button type="button" class="btn btn-outline-dark" onClick={() => {
                                    deletePlace(place._id);
                                }}>Delete</button>
                            </div>
                        </div>
                        // </div>

                    ))}
                </div>
            </div >


            <div id="backdrop" className='backdrop-black'>

                <div id="update-box" className="container, form-style">
                    <br></br>
                    <form onSubmit={sendData} style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}>
                        <button onClick={handleClose} className='btn btn-outline-danger' style={{ width: '40px', height: '40px', float: 'right' }}>X</button>
                        <h4>Update Place</h4>
                        <table>
                            <tr>
                                <td>
                                    <div className="mb-3">
                                        <label for="placeID">Place ID</label>
                                        <input type="text" class="form-control" id="placeID" value={placeID}
                                            disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label for="placeName">Place Name</label>
                                        <input type="text" class="form-control" id="placeName" placeholder="Enter Place Name" value={placeName}
                                            onChange={(e) => {
                                                setPlaceName(e.target.value);
                                            }} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="placeDescription">Place Description</label>
                                        {/* <input type="text" class="form-control" id="placeDescription" placeholder="Enter Place Description" value={placeDescription}
                                            onChange={(e) => {
                                                setPlaceDescription(e.target.value);
                                            }} /> */}
                                        <textarea style={{ height: 150 }} class="form-control" id="placeDescription" placeholder="Enter Place Description"
                                            onChange={(e) => {
                                                setPlaceDescription(e.target.value);
                                            }} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="placeImage">Place Image</label>
                                        <input type="file" class="form-control" id="placeImage"
                                            onChange={uploadImage} />
                                    </div>
                                    <button type="submit" class="btn btn-dark">Update Place</button>


                                </td>
                                <td>
                                    <div>
                                        <img src={picture} alt="" style={{ width: 400, height: 470 }} />
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