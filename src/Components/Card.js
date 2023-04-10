import React, { forwardRef, useImperativeHandle, useState } from 'react';
import axios from 'axios';

const Card = forwardRef(({ imageName,url,id,suretoDelete,setSureToDelete, password},ref) => {
    const [showDelete, setShowDelete] = useState(false);
    // const [deleteId,setDeleteId] = useState('')

    useImperativeHandle(ref,()=>({
         deleteImage() {
            console.log(id)
            // console.log(deleteId)
            // let url = `http://localhost:8000/api/gallery/images/:${deleteId}`;
            let url = `https://gallery-api-rpqq.onrender.com/api/gallery/images/:${id}`;
            console.log(password)
            if(suretoDelete && password ==='yogesh'){
                axios.delete(url)
                .then((res) => {
                    alert("Image Deleted succesfully");
                    window.location.reload();
                    console.log(res)
                    setSureToDelete(false)
                })
                .catch((err) => {
                    alert("Oops Something went wrong!");
                    console.log(err)
                }
                )
            }
        }
    }))
    
    

    return (
        <div className='card' onMouseEnter={() => { setShowDelete(true) }} onMouseLeave={() => { setShowDelete(false) }}>
            {showDelete && <button className='delete' onClick={() =>{
                setSureToDelete(true)
                }}>Delete</button>}
            <img src={url} alt={imageName} />
            <div className='imageName'>{imageName}</div>
        </div>
    )
})

export default Card