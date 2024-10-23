'use client';
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../app/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CKEditorComponent = dynamic(() => import('./CKEditorComponent'), { ssr: false });

const AddPost = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const handleImageUpload = (file: File) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageUploadProgress(progress);
    }, (error) => {
      console.error("Image upload error: ", error);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUploadedImageUrl(downloadURL);
      });
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    date: Yup.string().required("Date is required"),
    content: Yup.string().required("Content is required"),
    shortDescription: Yup.string().required("Short Description is required"),
    metaDescription: Yup.string(),
    metaKeywords: Yup.string(),
    metaTitle: Yup.string(),
    altTag: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        title: "",
        date: "",
        content: "",
        shortDescription: "",
        metaDescription: "",
        metaKeywords: "",
        metaTitle: "",
        postType: 0,
        altTag: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addDoc(collection(db, "post"), {
            title: values.title,
            date: values.date,
            content: values.content,
            main_photo: {
              alt_tag: values.altTag,
              url: uploadedImageUrl,
            },
            meta_description: values.metaDescription,
            meta_keywords: values.metaKeywords,
            meta_title: values.metaTitle,
            post_type: values.postType,
            short_description: values.shortDescription,
          });
          alert("Post successfully added!");
          resetForm();
          setUploadedImageUrl("");
          setImageUploadProgress(0);
        } catch (error) {
          console.error("Error adding post: ", error);
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <h2>Add New Post</h2>         
          <div>
            <Field type="text" name="title" placeholder="Title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div>
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="div" className="error" />
          </div>          
          <div>
            <Field type="text" name="shortDescription" placeholder="Short Description" />
            <ErrorMessage name="shortDescription" component="div" className="error" />
          </div>
          <div className="flex flex-col gap-2">
            <label>
              <Field type="radio" name="postType" value="0" />
              Type Gear
            </label>
            <label>
              <Field type="radio" name="postType" value="1" />
              Type Trip
            </label>
          </div>

          <div>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />
            {imageUploadProgress > 0 && <p>Upload Progress: {imageUploadProgress}%</p>}
            {uploadedImageUrl && <p>Uploaded Image URL: {uploadedImageUrl}</p>}
          </div>
          <div>
            <Field type="text" name="altTag" placeholder="Alt Tag" />
            <ErrorMessage name="altTag" component="div" className="error" />
          </div>
          <div className="mt-5">
            <CKEditorComponent
              onChange={(data) => setFieldValue("content", data)}
            />
            <ErrorMessage name="content" component="div" className="error" />
          </div>
          <div className="mt-5">
            <Field type="text" name="metaDescription" placeholder="Meta Description" />
            <ErrorMessage name="metaDescription" component="div" className="error" />
          </div>
          <div>
            <Field type="text" name="metaKeywords" placeholder="Meta Keywords" />
            <ErrorMessage name="metaKeywords" component="div" className="error" />
          </div>
          <div>
            <Field type="text" name="metaTitle" placeholder="Meta Title" />
            <ErrorMessage name="metaTitle" component="div" className="error" />
          </div>
          <button className="mt-5" type="submit">Submit Post</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPost;
