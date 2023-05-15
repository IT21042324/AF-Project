import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import "../../styles/hotelList.css";



import { Navigate, useNavigate } from "react-router-dom";

export function EditRoom() {
  const [room, setRoom] = useState([]);
  const [id, setid] = useState("");
  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [maxPeople, setmaxPeople] = useState("");
  const [desc, setdesc] = useState("");
  const [roomNumbers, setroomnumbers] = useState([]);
  
//   


  useEffect(() => {
    function getRoominfo() {
      axios
        .get("http://localhost:8070/api/rooms/")
        .then((res) => {
          //console.log(res.data); // debug

          setRoom(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getRoominfo();
  }, []);

  //function to get one item

  function getOneRoom(did) {
    axios
      .get("http://localhost:8070/api/rooms/get/" + did)
      .then((res) => {
        // console.log(res.data);
        setid(res.data._id);
        settitle(res.data.title);
        setprice(res.data.price);
        setmaxPeople(res.data.maxPeople);
        setdesc(res.data.desc);
        setroomnumbers(res.data.roomNumbers);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const showUpdateBox = () => {
    document.getElementById("backdrop").style.display = "block";
  };

  const handleClose = () => {
    document.getElementById("backdrop").style.display = "none";
  };

  //Update function

  function sendData(e) {
    e.preventDefault();

    const NewRoom = {
      title,
      price,
      maxPeople,
      desc,
    };

    axios
      .put("http://localhost:8070/api/rooms/update/" + id, NewRoom)
      .then(() => {
        alert("Room information Updated");

        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  //delete function

  function deleteRoom(ID) {
    axios
      .delete("http://localhost:8070/api/rooms/delete/" + ID)
      .then((res) => {
        alert("Room Information Deleted");

        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  const navigate = useNavigate();

  function handlenew(){
      navigate('/admin/addRoom')
  }
  


  return (
    <>
      <div className="container shadow rounded">

        <h2>Rooms</h2>
        <button className="btn btn-primary" onClick={handlenew}> Add New Room </button>
        <table
          className="table"
          style={{
            width: "100%",
            border: "1px solid black",
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr>
              <th scope="col">Room ID</th>

              <th scope="col">Title</th>

              <th scope="col">Price</th>

              <th scope="col">Maximum number of people</th>

              <th scope="col">Description</th>

            </tr>
          </thead>

          <tbody>
            {room.map((room) => (
              <tr key={room._id}>
                <td>{room._id}</td>

                <td>{room.title}</td>

                <td>{room.price}</td>

                <td>{room.maxPeople}</td>

                <td>{room.desc}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      getOneRoom(room._id);
                      showUpdateBox();
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteRoom(room._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="backdrop" className="backdrop-black">
        <div id="update-box" className="container form-style3 ">
          <button
            onClick={handleClose}
            className="btn btn-outline-danger"
            style={{ width: "40px", height: "40px", float: "right" }}
          >
            X
          </button>

          <br></br>

          <br></br>

          <form onSubmit={sendData}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Room Title
              </label>

              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price per Night
              </label>

              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="maxPeople" className="form-label">
                Maximum number of people per room
              </label>

              <input
                type="text"
                className="form-control"
                id="maxPeople"
                value={maxPeople}
                onChange={(e) => setmaxPeople(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Description
              </label>

              <input
                type="text"
                className="form-control"
                id="desc"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
              <input type="checkbox" name="terms" required /> <br></br>
              <br></br>
              <button type="submit" className="btn btn-primary">
                Update Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditRoom;