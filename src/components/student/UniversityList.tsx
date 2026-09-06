'use client';

import React, { useEffect, useState } from 'react';
import { getUniversities } from '@/lib/api/university';
import Link from 'next/link';

interface University {
  id: number;
  name: string;
  location: string;
  description: string;
  website: string;
  photoUrl?: string;
}

interface UniversityResponse {
  content: University[];
  totalPages: number;
  currentPage: number;
}

const UniversityList = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  // filters
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1200) setItemsPerPage(16);
    else if (width >= 768) setItemsPerPage(12);
    else setItemsPerPage(6);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const fetchUniversities = async (page: number) => {
    setLoading(true);
    try {
      const res: UniversityResponse = await getUniversities(
        page - 1,
        itemsPerPage,
        nameFilter || undefined,
        locationFilter || undefined,
        countryFilter || undefined
      );
      setUniversities(res.content);
      setTotalPages(res.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch universities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities(1);
  }, [itemsPerPage]); // no name/location/country here



  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const defaultPhoto = 'https://images.unsplash.com/photo-1562774053-701939374585';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Universities</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchUniversities(1)}
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchUniversities(1)}
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          placeholder="Filter by Country"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchUniversities(1)}
          className="border rounded px-3 py-2"
        />

        <button
          onClick={() => fetchUniversities(1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {/* University Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {universities.map((uni) => (

      <Link href={`/student/dashboard/universities/${uni.id}`} key={uni.id}>
          <div
            key={uni.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${uni.photoUrl || defaultPhoto})` }}
            ></div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{uni.name}</h2>
              <p className="text-gray-600 mb-4">{uni.location}</p>
              <p className="text-gray-700 text-sm mb-4">{uni.description}</p>
              <a
                href={uni.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Website
              </a>
            </div>
          </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => fetchUniversities(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => fetchUniversities(i + 1)}
            className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => fetchUniversities(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UniversityList;
