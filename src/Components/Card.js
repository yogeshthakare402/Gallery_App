import React, { useState } from 'react';
import axios from 'axios';

function Card({ imageName, url, id }) {
    const [showDelete, setShowDelete] = useState(false);
    const deleteImage = (deleteId) => {
        console.log(id)
        let url = `http://localhost:8000/api/gallery/images/:${deleteId}`;

        axios.delete(url)
            .then((res) => {
                alert("Image Deleted succesfully");
                window.location.reload();
                console.log(res)
            })
            .catch((err) => {
                alert("Oops Something went wrong!");
                console.log(err)
            }
            )
    }

    return (
        <div className='card' onMouseEnter={() => { setShowDelete(true) }} onMouseLeave={() => { setShowDelete(false) }}>
            {showDelete && <button className='delete' onClick={() =>deleteImage(id)}>Delete</button>}
            <img src={url} alt={imageName} />
            <div className='imageName'>{imageName}</div>
        </div>
    )
}

export default Card