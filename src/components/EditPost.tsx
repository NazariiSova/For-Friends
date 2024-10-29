import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../styles/global.scss'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../app/firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'next/router'

interface PostData {
  title: string
  date: string
  short_description: string
  meta_description?: string
  meta_keywords?: string
  meta_title?: string
  alt_tag?: string
  content: string
  post_type: string
  main_photo?: { url: string; alt_tag?: string }
  additional_photo?: string
}

interface EditPostProps {
  postId: string
}

const EditPost: React.FC<EditPostProps> = ({ postId }) => {
  const [initialValues, setInitialValues] = useState<PostData | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [additionalImageUrl, setAdditionalImageUrl] = useState('')
  const [imageUploadProgress, setImageUploadProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRef = doc(db, 'post', postId)
        const postSnap = await getDoc(postRef)
        if (postSnap.exists()) {
          const postData = postSnap.data() as PostData
          setInitialValues(postData)
          setUploadedImageUrl(postData.main_photo?.url || '')
          setAdditionalImageUrl(postData.additional_photo || '')
        }
      } catch (error) {
        console.error('Error fetching post data:', error)
      }
    }
    fetchPostData()
  }, [postId])

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
        console.error('Image upload error:', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback(downloadURL)
        })
      }
    )
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    date: Yup.string().required('Date is required'),
    short_description: Yup.string().required('Short Description is required'),
    meta_description: Yup.string(),
    meta_keywords: Yup.string(),
    meta_title: Yup.string(),
    alt_tag: Yup.string(),
    content: Yup.string().required('Content is required'),
    post_type: Yup.string().required('Post type is required'),
  })

  const handleSubmit = async (values: PostData) => {
    try {
      const postRef = doc(db, 'post', postId)
      
      type UpdateDataType = {
        title: string
        date: string
        short_description: string
        content: string
        post_type: string
        meta_description?: string | null
        meta_keywords?: string | null
        meta_title?: string | null
        main_photo: { url: string; alt_tag?: string | null }
        additional_photo?: string | null
      }

      const updateData: UpdateDataType = {
        title: values.title,
        date: values.date,
        short_description: values.short_description,
        content: values.content,
        post_type: values.post_type,
        meta_description: values.meta_description || null,
        meta_keywords: values.meta_keywords || null,
        meta_title: values.meta_title || null,
        main_photo: {
          url: uploadedImageUrl,
          alt_tag: values.alt_tag || null,
        },
        additional_photo: additionalImageUrl || null,
      }

      if (!updateData.main_photo?.alt_tag) delete updateData.main_photo.alt_tag
      if (!updateData.additional_photo) delete updateData.additional_photo

      await updateDoc(postRef, updateData)
      alert('Post updated successfully!')
      router.push('/admin')
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  if (!initialValues) {
    return <p>Loading post data...</p>
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values }) => (
        <Form className="p-4 max-w-lg mx-auto flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

          <div className="mb-4">
            <Field type="text" name="title" placeholder="Title" className="input-field" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div className="mb-4">
            <Field type="date" name="date" className="input-field" />
            <ErrorMessage name="date" component="div" className="error" />
          </div>

          <div className="mb-4">
            <Field type="text" name="short_description" placeholder="Short Description" className="input-field" />
            <ErrorMessage name="short_description" component="div" className="error" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="flex">
              <Field type="radio" name="post_type" value="0" className="mr-2 w-4" />
              Type Gear
            </label>
            <label className="flex items-center">
              <Field type="radio" name="post_type" value="1" className="mr-2 w-4" />
              Type Trip
            </label>
          </div>

          <div className="mb-4">
            Main Photo
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0], setUploadedImageUrl)
                }
              }}
              className="file-input"
            />
            {imageUploadProgress > 0 && <p>Upload Progress: {imageUploadProgress}%</p>}
            {uploadedImageUrl && <p>Uploaded Image URL: {uploadedImageUrl}</p>}
          </div>

          <div className="mb-4 mt-9">
            Content Photos
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0], setAdditionalImageUrl)
                }
              }}
              className="file-input"
            />
            {additionalImageUrl && <p>Additional Image URL: {additionalImageUrl}</p>}
          </div>

          <div className="mb-4">
            <Field type="text" name="alt_tag" placeholder="Alt Tag" className="input-field" />
            <ErrorMessage name="alt_tag" component="div" className="error" />
          </div>

      
          <div className="mb-4">
            <Field as="textarea" name="content" placeholder="Content" className="input-field h-32 w-full" />
            <ErrorMessage name="content" component="div" className="error" />
          </div>
          <div className="border p-4 rounded-lg overflow-y-auto max-h-screen mb-4">
            <div dangerouslySetInnerHTML={{ __html: `<p>${values.content}</p>` }} />
          </div>

          <div className="mb-4">
            <Field type="text" name="meta_title" placeholder="Meta Title" className="input-field" />
            <ErrorMessage name="meta_title" component="div" className="error" />
          </div>

          <div className="mb-4">
            <Field type="text" name="meta_description" placeholder="Meta Description" className="input-field" />
            <ErrorMessage name="meta_description" component="div" className="error" />
          </div>

          <div className="mb-4">
            <Field type="text" name="meta_keywords" placeholder="Meta Keywords" className="input-field" />
            <ErrorMessage name="meta_keywords" component="div" className="error" />
          </div>

          <button type="submit" className="btn-primary mt-5 self-end">
            Update Post
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default EditPost
