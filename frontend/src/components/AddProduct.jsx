import React from 'react'
import { useState } from 'react'

const AddProduct = () => {
    const[noOfImages,setNoOfImages] = useState(new Array(1).fill(1));
    const[productDetails,setProductDetails] = useState({
      name:"",
      email:"",
      password:""
    });
    const[productImages,setProductImages] = useState([]);

  return (
    <div>
      <form action="">
        <input type="text" name={"title"} placeholder="Enter title..." onChange={(event)=>{
          setProductDetails({...productDetails,[event.target.name]:event.target.value})
        }}/>
        <input type="text" name={"description"} placeholder="Enter description..." onChange={(event)=>{
          setProductDetails({...productDetails,[event.target.name]:event.target.value})
        }}/>
        <select name="" id="" onChange={(event)=>{
            console.log(event.target.value,noOfImages)
            setNoOfImages(new Array(parseInt(event.target.value)).fill(1));
        }}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <label htmlFor="">Add Images</label>
        {
            noOfImages.map((ele)=>(
                <input type="file" accept='image/*' onChange={(event)=>{
                  console.log(event.target.files[0]);
                  setProductImages([...productDetails,event.target.files[0]]);
                }} />
            ))
        }
      </form>
    </div>
  )
}

export default AddProduct