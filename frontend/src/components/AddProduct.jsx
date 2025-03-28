import React from 'react'
import { useState } from 'react'
import axios from "axios";
import styles from "./AddProduct.module.css";
const AddProduct = () => {
    const[noOfImages,setNoOfImages] = useState(new Array(1).fill(1));
    const[productDetails,setProductDatils] = useState({
        title:"",
        description:"",
        price:""
    });
    const[productImages,setProductImages] = useState([]);

    async function handleSubmet(e){
        e.preventDefault();
        try {
            const {title,description,price} = productDetails;
            console.log(productDetails,productImages.length);
            if(!title || !description || !price || productImages.length==0){
                alert("please add all fields");
                return;
            }

            const token = JSON.parse(localStorage.getItem("follow-along-auth-token-user-name-id"));
            if(!token){
                alert("please login first");
                return;
            }
            const formData = new FormData();
            formData.append("title",title);
            formData.append("description",description);
            formData.append("price",price);
            for(let i=0;i<productImages.length;i++){
                formData.append("image",productImages[i]);
            }

            await axios.post("http://localhost:8080/product/addproduct",formData,{
                headers:{
                    "authorization":token.token
                }
            });
        } catch (error) {
            console.log(error)
            alert("Something went wrong while sending data");
        }
    }

  return (
    <div>
      <form action="" className={styles.formbox} onSubmit={handleSubmet}>
        <input type="text" name={"title"} placeholder="Enter title..." onChange={(event)=>{
            console.log(productDetails)
            setProductDatils({...productDetails,title:event.target.value})
        }} />
        <input type="text" name={"description"} placeholder="Enter description..." onChange={(event)=>{
            setProductDatils({...productDetails,description:event.target.value})
        }} />

        <input type="number" name="price" placeholder='Enter price...' onChange={(e)=>{
            setProductDatils({...productDetails,price:e.target.value})
        }} />
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
                    setProductImages([...productImages,event.target.files[0]]);
                }}/>
            ))
        }
        <input type="submit" value={"Upload product"} />
      </form>
    </div>
  )
}

export default AddProduct