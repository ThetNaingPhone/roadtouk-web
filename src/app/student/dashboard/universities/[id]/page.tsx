'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getUniversityById, UniversityDetail } from '@/lib/api/university';
import { ROUTES } from '@/lib/constants/routes';

const UniversityDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [university, setUniversity] = useState<UniversityDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchUniversity = async () => {
        setLoading(true);
        try {
          const data = await getUniversityById(id);
          setUniversity(data);
        } catch (err) {
          setError('Failed to fetch university details.');
        } finally {
          setLoading(false);
        }
      };
      fetchUniversity();
    }
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-10">{error}</div>;
  if (!university) return null;

  const defaultPhoto = 'https://images.unsplash.com/photo-1562774053-701939374585';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-96 rounded-lg bg-cover bg-center flex items-end p-8 mb-8" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url(${university.photoUrl || defaultPhoto})` }}>
        <div className="text-white">
          <h1 className="text-5xl font-bold">{university.name}</h1>
          <p className="text-xl mt-2">{university.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{university.description}</p>
          <h2 className="text-3xl font-semibold mt-10 mb-4">Programs Offered</h2>
          <div className="space-y-4">
            {university.programs?.map((program) => (
              <div key={program.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold">{program.name}</h3>
                <p><strong>Duration:</strong> {program.duration}</p>
                <p><strong>Tuition:</strong> {program.tuitionFees}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md self-start">
          <a href={university.website} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">Visit Website</a>
          <Link href={`/student/dashboard/universities/${university.id}/requirements`} className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4">View Requirements</Link>
          <Link href={ROUTES.student.dashboard.home} className="block w-full text-center bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"> &larr; Back to List</Link>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;