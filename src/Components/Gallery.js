import React, { useEffect, useState } from 'react';
import './Gallery.css';
import Card from './Card';
import AddImageForm from './AddImageForm';

function Gallery() {
    const [imageGallery, setImageGallery] = useState([]);
    const [fetchedData,setFetchedData] = useState([])
    const [showForm, setShowForm] = useState(false)
    const getImages = async () => {
        let fetchurl = "https://gallery-api-rpqq.onrender.com/api/gallery/images";
        // let url = "http://localhost:8000/api/gallery/images";
        let data = await fetch(fetchurl);
        let images = await data.json();
        // console.log(images)
        setFetchedData(images.images);
        setImageGallery(images.images)
    }
    useEffect(() => {
        getImages();
        // console.log(imageGallery)
    }, [showForm]);

    const searchImage = (name)=>{
        let searchedImages = imageGallery.filter((image)=>image.imageName.toLowerCase().includes(name.toLowerCase()));
        console.log(name.length)
        if(name.length>0){
            setImageGallery(searchedImages)
        }else{
            setImageGallery(fetchedData)
        }
    }


    return (
        <div id='gallery'>
            <div className='navbar'>
                <div id='logo'>
                    <img src={window.location + './logo.png'} alt="logo" />
                    <h3>𝓖𝓪𝓵𝓵𝓮𝓻𝔂</h3>
                </div>
                <input id='search' type="text" placeholder='Serach by name' onChange={(e)=>searchImage(e.target.value)}/>
                <button id='addimage' onClick={() => setShowForm(true)}>Add Image</button>
            </div>
            <div id='imageCards'>
                {imageGallery && imageGallery.length>0 && imageGallery.map((item, i) => {
                    return <Card imageName={item.imageName} url={item.url} id={item._id} key={i}/>
                })}
            </div>
            {showForm &&
                <AddImageForm setShowForm={setShowForm} />
            }

        </div>
    )
}

export default Gallery