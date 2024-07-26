"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/data/getSchools');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-white">No schools found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Schools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school, index) => (
          <div key={school.id} className="bg-cyan-800 shadow-md rounded-lg overflow-hidden">
            <Image
              src={school.image || 'https://placehold.co/300x300.png'}
              alt={`Image of ${school.name}`}
              width={300}
              height={300}
              className="w-full h-48 object-cover"
              priority={index < 3} // Add priority to the first few images
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{school.name}</h2>
              <p className="text-white mb-2">{school.address}, {school.city}, {school.state}</p>
              <p className="text-white mb-2">Contact: {school.contactNumber}</p>
              <p className="text-white mb-2">Email: {school.emailId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
