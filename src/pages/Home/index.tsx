import { useState } from 'react';

function Home() {
  return (
    <div className="flex bg-white p-6 rounded-lg shadow-lg w-16">
      <div className="flex flex-row">
        <div>
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="label-text input input-bordered input-lg input-accent w-full max-w-xs bg-white"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="label-text input input-bordered input-lg input-accent w-full max-w-xs bg-white"
          />
        </div>
      </div>
      <button className="btn w-64 rounded-full">Button</button>
    </div>
  );
}

export default Home;
