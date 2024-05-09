import React, { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function Register() {
  const [img, setImg] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");

  // FUNCTION HANDLERS
  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };
  const handleImg2 = (e) => {
    setImg2(e.target.files[0]);
  };
  const handleImg3 = (e) => {
    setImg3(e.target.files[0]);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleCategories = (e) => {
    setCategories(e.target.value);
  };

  const autoClose = { autoClose: 800 };

  // DATABASE REF
  const linkCollectionRef = collection(db, "items");

  //UPLOAD FUNCTION
  const uploadImages = async (e) => {
    if (!img || !img2 || !img3) return;

    try {
      const mainImageRef = ref(storage, `items/mainItem/${img.name}`);
      const subImage1Ref = ref(storage, `items/subItem1/${img2.name}`);
      const subImage2Ref = ref(storage, `items/subItem2/${img3.name}`);

      await uploadBytes(mainImageRef, img);
      await uploadBytes(subImage1Ref, img2);
      await uploadBytes(subImage2Ref, img3);
    } catch (err) {
      console.log(err);
    }
  };

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      uploadImages();
      await addDoc(linkCollectionRef, {
        name: name,
        desc: desc,
        price: price,
        categories: categories,
      });
      toast.success("Successfully Added", autoClose);
      setName("");
      setPrice("");
      setDesc("");
      setCategories("");
    } catch (err) {
      toast.error("Error", autoClose);
      console.log(err);
    }
  };

  const forms = [
    {
      title: "Product Name",
      type: "text",
      input: handleName,
      value: name,
    },
    {
      title: "price",
      type: "number",
      input: handlePrice,
      value: price,
    },
    {
      title: "Description",
      type: "text",
      input: handleDesc,
      value: desc,
    },
  ];

  const images = [
    {
      title: "Main Image",
      type: "file",
      input: handleImg,
      value: img,
    },
    {
      title: "Sub Image 1",
      type: "file",
      input: handleImg2,
      value: img2,
    },
    {
      title: "Sub Image 2",
      type: "file",
      input: handleImg3,
      value: img3,
    },
  ];

  const options = [
    {
      value: "top",
    },
    {
      value: "bottom",
    },
    {
      value: "accessories",
    },
  ];

  console.log(img);

  return (
    <div className="py-[1rem] sm:flex sm:flex-col sm:items-center">
      <h1 className="text-center text-[1.2rem] font-medium mb-[1rem] uppercase">
        Add Items
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full sm:w-[70%] xl:w-[50%] flex flex-col items-center justify-center">
        <div>
          <label for="category" className="mr-[.4rem]">
            choose a category:
          </label>

          <select
            id="category"
            name="category"
            onChange={handleCategories}
            value={categories}
            required>
            <option value="" disabled unselected>
              Select
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          {images.map((image) => {
            return (
              <div className="my-[.5rem]">
                <input type={image.type} onChange={image.input} />
              </div>
            );
          })}
        </div>
        <div className="mt-[.6rem] w-full">
          {forms.map((form) => {
            return (
              <div className="flex flex-col mb-[.6rem]">
                <label htmlFor={form.title} className="font-medium">
                  {form.title}{" "}
                  <span className="font-bold text-[#ff0000]">*</span>
                </label>
                <input
                  type={form.type}
                  required
                  onChange={form.input}
                  value={form.value}
                  className="border-[2px] border-solid border-black w-full h-[3rem] px-[1rem]"
                  placeholder={`Enter ${form.title}`}
                />
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="bg-black text-white w-full py-[.6rem] mt-[.6rem] border-none text-[1.2rem]">
          Add
        </button>
      </form>
    </div>
  );
}
