import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';
import Card from './Card';
import AddImageForm from './AddImageForm';

function Gallery() {
    const [imageGallery, setImageGallery] = useState([]);
    const [fetchedData,setFetchedData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [suretoDelete,setSureToDelete] = useState(false);
    const [password,setPassword] = useState('');
    let ref = useRef();

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

    const checkPass = ()=>{
        if(password !=='yogesh'){
            alert("Please enter right password");
        }else{
            ref.current.deleteImage()
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
                {imageGallery.length>0 ? (imageGallery.map((item, i) => {
                    return <Card ref={ref} imageName={item.imageName} url={item.url} id={item._id} suretoDelete={suretoDelete} setSureToDelete={setSureToDelete} password={password} key={i}/>
                })):(
                    <div id='loader'>Loading <div id='span1'></div> <div id='span2'></div> <div id='span3'></div> <div id='span4'></div></div>
                )}
            </div>
            {showForm &&
                <AddImageForm setShowForm={setShowForm} />
            }
            {suretoDelete && <div id='passwordInput'>
                <h2>Are you sure?</h2>
                <p>Enter password to Delete the Image</p>
                <p>Password :- yogesh</p>
                <input type="password" value={password} name="password" id="password" onChange={(e)=>setPassword(e.target.value)} placeholder='******'/>
                <div id='passBtn'>
                    <button onClick={()=>setSureToDelete(false)}>Cancle</button>
                    <button onClick={()=>checkPass()}>Delete</button>
                </div>
                </div>}

        </div>
    )
}

export default Gallery