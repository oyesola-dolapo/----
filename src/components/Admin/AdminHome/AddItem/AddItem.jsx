import React, { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../../Config/firebase";
import { useAuth } from "../../../AuthContext";
import { Link } from "react-router-dom";

export default function AddItem() {
  const [img, setImg] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [mainImageURL, setMainImageURL] = useState("");
  const [subImage1URL, setSubImage1URL] = useState("");
  const [subImage2URL, setSubImage2URL] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const { currentUser } = useAuth();

  const types = ["image/png", "image/jpeg", "image/webp"];

  // FUNCTION HANDLERS
  const handleImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImg(selectedFile);
      setError("");
    } else {
      setImg(null);
      setError("Please select a valid file type");
    }
  };
  const handleImg2 = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImg2(selectedFile);
      setError("");
    } else {
      setImg2(null);
      setError("Please select a valid file type");
    }
  };
  const handleImg3 = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImg3(selectedFile);
      setError("");
    } else {
      setImg3(null);
      setError("Please select a valid file type");
    }
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

  const uploadItem = (e) => {
    e.preventDefault();
    const mainUploadTask = storage.ref(`items/${img.name}`).put(img);

    mainUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Uploading item: ${progress}% done`);
        setProgress(`Uploading item: ${progress}% done`);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        storage
          .ref(`items/${img.name}`)
          .getDownloadURL()
          .then((mainUrl) => {
            const promises = [];

            if (img2) {
              const sub1UploadTask = storage
                .ref(`items/${img2.name}`)
                .put(img2);
              promises.push(sub1UploadTask);
            }

            if (img3) {
              const sub2UploadTask = storage
                .ref(`items/${img3.name}`)
                .put(img3);
              promises.push(sub2UploadTask);
            }

            Promise.all(promises)
              .then((results) => {
                const urls = [];
                results.forEach((taskResult) => {
                  urls.push(taskResult.ref.getDownloadURL());
                });

                return Promise.all(urls);
              })
              .then((downloadUrls) => {
                const sub1Url = downloadUrls[0] || null;
                const sub2Url = downloadUrls[1] || null;

                db.collection("items")
                  .add({
                    mainImageURL: mainUrl,
                    subImage1URL: sub1Url,
                    subImage2URL: sub2Url,
                    name: name,
                    desc: desc,
                    price: price,
                    categories: categories,
                  })
                  .then(() => {
                    toast.success("Successfully Added", 300);
                    setName("");
                    setPrice("");
                    setDesc("");
                    setCategories("");
                    document.getElementById("file").value = "";
                    setProgress("");
                  })
                  .catch((err) => {
                    console.log(err.message);
                    toast.error("Error adding item", 300);
                  });
              })
              .catch((err) => console.log(err.message));
          })
          .catch((err) => console.log(err.message));
      }
    );
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

  return (
    <div className="py-[1rem] px-[.8rem] min-h-[80vh]">
      {currentUser ? (
        <div className=" sm:flex sm:flex-col sm:items-center">
          {" "}
          <h1 className="text-center text-[1.2rem] font-medium mb-[1rem] uppercase">
            Add Items
          </h1>
          <form
            action=""
            onSubmit={uploadItem}
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
                  <div className="my-[.5rem]" key={image.type}>
                    <input type={image.type} onChange={image.input} id="file" />
                  </div>
                );
              })}
              <p className="text-red-500">{error}</p>
            </div>

            <div className="mt-[.6rem] w-full">
              {forms.map((form) => {
                return (
                  <div className="flex flex-col mb-[.6rem]" key={form.title}>
                    <label htmlFor={form.title} className="font-medium">
                      {form.title}{" "}
                      <span className="font-bold text-[#ff0000]">*</span>
                    </label>
                    <input
                      type={form.type}
                      onChange={form.input}
                      value={form.value}
                      required
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
            <p>{progress}</p>
          </form>{" "}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-[1.2rem] tracking-wider uppercase">
            Login to add Item
          </p>
          <Link to="/admin" className="tracking-wider text-[1.2rem] underline">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
