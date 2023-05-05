import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../styles/place.css'

export function DisplayPlaces() {

    const [places, setPlaces] = useState([]);
    const [url, setUrl] = useState('');
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([]);

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

    return (
        <>
            <form style={{backgroundColor:"transparent", border:"0", marginLeft:"20px", margintop:"0", padding:"0"}}role="search" onSubmit={searchPlaces}>
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
                                        <p style={{textAlign:"left"}}class="card-text">{place.placeDescription}</p>
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
                <h3 style={{fontFamily: "cursive", color:"green", backgroundColor:"#C1E1C1", padding:"20px"}}>TOURIST PLACES</h3>
                <br></br>
                <div class="row">
                    {places.map(place => (
                        <div class="col-12 col-md-6 col-lg-3" >
                            <div class="card" style={{ width: "17rem", height: "35rem", marginBottom: "40px" }}>
                                <div class="card-image-area">
                                    <img src={place.imageUrl} style={{ width: "80%", height: "10rem", margin: '0px auto' }} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        {/* <h5 class="card-title">Item ID: {item._id}</h5> */}
                                        <h5 class="card-text"> {place.placeName}</h5>
                                        <div className='scroll-description-user'>
                                            <p style={{textAlign:"left"}} class="card-text">{place.placeDescription}</p>
                                        </div>
                                        {/* <button type="button" class="btn btn-success">View Description</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >

        </>
    )
}