import { useState } from 'react';

function Home() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {' '}
      <h1 className="text-2xl font-bold text-gray-800">Centered Container</h1>
      <p className="text-gray-600">This container is centered on the page.</p>
      <button className="bg-indigo-500 ...">Save changes</button>
    </div>
  );
}

export default Home;
