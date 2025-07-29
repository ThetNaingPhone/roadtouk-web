'use client';

import { useUsers } from '@/lib/hooks/useUsers'; // Import the new hook

export default function UserList() {
  // The hook now returns more descriptive state names.
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">User List</h2>
      {users && users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="p-2 border rounded-md bg-white shadow-sm">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
