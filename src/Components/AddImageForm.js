import React from 'react';
import axios from 'axios';


function AddImageForm({ setShowForm }) {

    const addImages = async (e) => {
        e.preventDefault();
        const form = document.getElementById("addImageForm");
        const formData = new FormData(form);
        const values = [...formData.entries()];
        console.log(values);
        // console.log(formData);
        // let url = "http://localhost:8000/api/gallery/images";
        let url = "https://gallery-api-rpqq.onrender.com/api/gallery/images";

        axios.post(url,{values})
            .then((res) => {
                alert("Image Added succesfully");
                setShowForm(false)
                console.log(res)
            })
            .catch((err) => {
                alert("Oops Something went wrong!");
                console.log(err)
            }
            )
    }

    return (
        <div id='form'>
            <form onSubmit={(e) => addImages(e)} id='addImageForm'>
                <div className='input'>
                    <label htmlFor="imageName">Label</label>
                    <input name='imageName' type="text" placeholder='Name of Image' required />
                </div>
                <div className='input'>
                    <label htmlFor="url">Photo URL</label>
                    <input type="url" name="url" id="url" placeholder='https://5.imimg.com/data5/WA/NV/LI/SELLER-52971039/apple-indian-500x500.jpg ' required />
                </div>
                <div className='btnInput'>
                    <button type='cancle' id='cancle' onClick={() => setShowForm(false)}>Cancle</button>
                    <button type='submit' id='submit' onClick={(e) => addImages(e)}>Submit</button>

                </div>
            </form>
        </div>
    )
}

export default AddImageForm