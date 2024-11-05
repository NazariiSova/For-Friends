import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../styles/global.scss'
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const AddPost = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [additionalImageUrl, setAdditionalImageUrl] = useState('')
  const [imageUploadProgress, setImageUploadProgress] = useState(0)

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageUploadProgress(progress)
      },
      (error) => {
        console.error('Image upload error: ', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback(downloadURL)
        })
      },
    )
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    date: Yup.string().required('Date is required'),
    shortDescription: Yup.string().required('Short Description is required'),
    metaDescription: Yup.string(),
    metaKeywords: Yup.string(),
    metaTitle: Yup.string(),
    altTag: Yup.string(),
    content: Yup.string().required('Content is required'),
  })

  const handleCopyLink = () => {
    if (additionalImageUrl) {
      navigator.clipboard.writeText(additionalImageUrl).then(() => {
        alert('Link copied to clipboard!')
      })
    }
  }

  return (
    <Formik
      initialValues={{
        title: '',
        date: '',
        content: '',
        shortDescription: '',
        metaDescription: '',
        metaKeywords: '',
        metaTitle: '',
        postType: 0,
        altTag: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addDoc(collection(db, 'post'), {
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
          })
          alert('Post successfully added!')
          resetForm()
          setUploadedImageUrl('')
          setAdditionalImageUrl('')
          setImageUploadProgress(0)
        } catch (error) {
          console.error('Error adding post: ', error)
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="p-4 max-w-screen mx-[5%] flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
          <div className="mb-4">
            <Field
              type="text"
              name="title"
              placeholder="Title"
              className="input-field"
            />
            <ErrorMessage name="title" component="div" className="error" />
          </div>
          <div className="mb-4">
            <Field type="date" name="date" className="input-field" />
            <ErrorMessage name="date" component="div" className="error" />
          </div>
          <div className="mb-4">
            <Field
              type="text"
              name="shortDescription"
              placeholder="Short Description"
              className="input-field"
            />
            <ErrorMessage
              name="shortDescription"
              component="div"
              className="error"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="flex">
              <Field
                type="radio"
                name="postType"
                value="0"
                className="mr-2 w-4"
              />
              Type Gear
            </label>
            <label className="flex items-center">
              <Field
                type="radio"
                name="postType"
                value="1"
                className="mr-2 w-4"
              />
              Type Trip
            </label>
          </div>
          <div className="mb-4">
            main photo
            <input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0], setUploadedImageUrl)
                }
              }}
              className="file-input"
            />
            {imageUploadProgress > 0 && (
              <p>Upload Progress: {imageUploadProgress}%</p>
            )}
            {uploadedImageUrl && <p>Uploaded Image URL: {uploadedImageUrl}</p>}
          </div>
          <div className="mb-4">
            <Field
              type="text"
              name="altTag"
              placeholder="Alt Tag"
              className="input-field"
            />
            <ErrorMessage name="altTag" component="div" className="error" />
          </div>
          <div className="mb-4 mt-9">
            content photos
            <input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0], setAdditionalImageUrl)
                }
              }}
              className="file-input"
            />
            {additionalImageUrl && (
              <div>
                <p>Additional Image URL: {additionalImageUrl}</p>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <Field
              as="textarea"
              name="content"
              placeholder="Content"
              className="input-field h-[500px] w-full"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFieldValue('content', e.target.value)
              }
            />
            <ErrorMessage name="content" component="div" className="error" />
          </div>
          <div className="mb-4">
            <Field
              type="text"
              name="metaTitle"
              placeholder="Meta Title"
              className="input-field"
            />
            <ErrorMessage name="metaTitle" component="div" className="error" />
          </div>
          <div className="mb-4">
            <Field
              type="text"
              name="metaDescription"
              placeholder="Meta Description"
              className="input-field"
            />
            <ErrorMessage
              name="metaDescription"
              component="div"
              className="error"
            />
          </div>
          <div className="mb-4">
            <Field
              type="text"
              name="metaKeywords"
              placeholder="Meta Keywords"
              className="input-field"
            />
            <ErrorMessage
              name="metaKeywords"
              component="div"
              className="error"
            />
          </div>
          <div className="border p-4 rounded-lg overflow-y-auto max-h-screen mb-4">
            <div
              dangerouslySetInnerHTML={{ __html: `<p>${values.content}</p>` }}
            />
          </div>
          <button type="submit" className="btn-primary mt-5 self-end">
            Submit Post
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AddPost
