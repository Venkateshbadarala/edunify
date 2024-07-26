import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageSrc, setImageSrc] = useState('https://placehold.co/300x300.png');
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  useEffect(() => {
    // Reset image and form on component mount
    setImageSrc('https://placehold.co/300x300.png');
    setFile(null);
    setUploadedImageUrl('');
    reset();
  }, [reset]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const uploadImage = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Images');
    formData.append('cloud_name', 'dtwqxei1s');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dtwqxei1s/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUploadedImageUrl(data.secure_url);
      console.log('Uploaded Image URL:', data.secure_url); // Log the image URL to the console
      return data.secure_url; // Return the image URL
    } catch (err) {
      console.error('Image upload error:', err);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const imageUrl = await uploadImage();

    if (!imageUrl) {
      toast.error('Image upload failed.');
      return;
    }

    const formData = {
      ...data,
      image: imageUrl // Use the returned image URL
    };

    console.log('Form Data to be sent:', formData); // Log form data before sending

    try {
      const response = await axios.post('/api/data/postSchool', formData);

      if (response.status === 200) {
        toast.success('School data added successfully!');
        reset(); // Reset form on success
      } else {
        toast.error('Failed to add school data.');
      }
    } catch (error) {
      toast.error('An error occurred.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-sky-900 rounded-lg shadow-lg space-y-6">
        {/* School picture upload */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <label htmlFor="profilePic" className="text-white font-bold text-xl">School Image</label>
          <Image
            src={imageSrc}
            alt="School Avatar"
            width={128} // Update with appropriate width
            height={128} // Update with appropriate height
            className="h-32 w-32 rounded-lg border-4 border-gray-200 object-cover"
            onError={() => setImageSrc("https://placehold.co/300x300.png")}
          />
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="profilePic"
            className="cursor-pointer bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:bg-blue-600 transition duration-300 ease-in-out"
          >
            Upload Image
          </label>
        </div>

        {/* Form Fields in 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* School Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white font-semibold">School Name:</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'School Name is required' })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-white font-semibold">Address:</label>
            <input
              id="address"
              type="text"
              {...register('address', { required: 'Address is required' })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="text-white font-semibold">City:</label>
            <input
              id="city"
              type="text"
              {...register('city', { required: 'City is required' })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="text-white font-semibold">State:</label>
            <input
              id="state"
              type="text"
              {...register('state', { required: 'State is required' })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="text-white font-semibold">Contact Number:</label>
            <input
              id="contactNumber"
              type="text"
              {...register('contactNumber', { required: 'Contact Number is required' })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
          </div>

          {/* Email ID */}
          <div className="flex flex-col">
            <label htmlFor="emailId" className="text-white font-semibold">Email ID:</label>
            <input
              id="emailId"
              type="email"
              {...register('emailId', { required: 'Email ID is required' })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId.message}</p>}
          </div>
        </div>

        {/* Descriptive Box Input */}
        <div className="mb-6">
          <label htmlFor="description" className="text-white font-semibold">Description:</label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            placeholder="Enter a brief description about the school..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add School
        </button>
      </form>
    </>
  );
}

export default AddSchool;
