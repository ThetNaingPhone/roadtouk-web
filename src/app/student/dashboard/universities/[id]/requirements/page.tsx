'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getUniversityById, UniversityDetail } from '@/lib/api/university';

const UniversityRequirementsPage = () => {
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
          setError('Failed to fetch university requirements.');
        } finally {
          setLoading(false);
        }
      };
      fetchUniversity();
    }
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading Requirements...</div>;
  if (error) return <div className="text-center text-red-500 p-10">{error}</div>;
  if (!university) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{university.name}</h1>
        <p className="text-xl text-gray-600">Admission Requirements</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-3 border-b pb-2">General University Requirements</h3>
            {university.requirements && university.requirements.length > 0 ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {university.requirements.map(req => <li key={req.id}>{req.name}</li>)}
              </ul>
            ) : ( <p className="text-gray-500">No general requirements listed.</p> )}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 border-b pb-2">Program-Specific Requirements</h3>
            <div className="space-y-5">
              {university.programs?.map(program => (
                <div key={program.id}>
                  <h4 className="font-semibold text-xl text-gray-800">{program.name}</h4>
                  {program.requirements && program.requirements.length > 0 ? (
                    <ul className="list-disc list-inside pl-5 space-y-2 text-gray-700">
                      {program.requirements.map(req => <li key={req.id}>{req.name}</li>)}
                    </ul>
                  ) : ( <p className="pl-5 text-gray-500">No specific requirements for this program.</p> )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Link href={`/student/dashboard/universities/${id}`} className="text-blue-600 hover:underline"> &larr; Back to University Details</Link>
      </div>
    </div>
  );
};

export default UniversityRequirementsPage;