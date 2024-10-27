'use client';

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../app/firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddPost = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [additionalImageUrl, setAdditionalImageUrl] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress);
      },
      (error) => {
        console.error("Image upload error: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback(downloadURL);
        });
      }
    );
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    date: Yup.string().required("Date is required"),
    shortDescription: Yup.string().required("Short Description is required"),
    metaDescription: Yup.string(),
    metaKeywords: Yup.string(),
    metaTitle: Yup.string(),
    altTag: Yup.string(),
    content: Yup.string().required("Content is required"),
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
            additional_photo: additionalImageUrl,
            meta_description: values.metaDescription,
            meta_keywords: values.metaKeywords,
            meta_title: values.metaTitle,
            post_type: values.postType,
            short_description: values.shortDescription,
          });
          alert("Post successfully added!");
          resetForm();
          setUploadedImageUrl("");
          setAdditionalImageUrl("");
          setImageUploadProgress(0);
        } catch (error) {
          console.error("Error adding post: ", error);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="p-4 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
          <div className="mb-4">
            <Field type="text" name="title" placeholder="Title" className="input-field" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="mb-4">
            <Field type="date" name="date" className="input-field" />
            <ErrorMessage name="date" component="div" className="error" />
          </div>
          <div className="mb-4">
            <Field type="text" name="shortDescription" placeholder="Short Description" className="input-field" />
            <ErrorMessage name="shortDescription" component="div" className="error" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="flex items-center">
              <Field type="radio" name="postType" value="0" className="mr-2" />
              Type Gear
            </label>
            <label className="flex items-center">
              <Field type="radio" name="postType" value="1" className="mr-2" />
              Type Trip
            </label>
          </div>

          {/* Main Image Upload */}
          <div className="mb-4">
            <input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0], setUploadedImageUrl);
                }
              }}
              className="file-input"
            />
            {imageUploadProgress > 0 && <p>Upload Progress: {imageUploadProgress}%</p>}
            {uploadedImageUrl && <p>Uploaded Image URL: {uploadedImageUrl}</p>}
          </div>

          {/* Additional Image Upload */}
          <div className="mb-4">
            <input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0], setAdditionalImageUrl);
                }
              }}
              className="file-input"
            />
            {additionalImageUrl && <p>Additional Image URL: {additionalImageUrl}</p>}
          </div>

          {/* Alt Tag */}
          <div className="mb-4">
            <Field type="text" name="altTag" placeholder="Alt Tag" className="input-field" />
            <ErrorMessage name="altTag" component="div" className="error" />
          </div>

          {/* Textarea with dangerouslySetInnerHTML */}
          <div className="mb-4">
            <Field
              as="textarea"
              name="content"
              placeholder="Content"
              className="input-field h-32"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue("content", e.target.value)}
            />
            <ErrorMessage name="content" component="div" className="error" />
          </div>
          <div className="border p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: `<p>${values.content}</p>` }} />

          <button type="submit" className="btn-primary mt-5">
            Submit Post
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPost;
