'use client'

import { useState } from "react";

export default function InputURL() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: videoUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to create video');
      }

      const data = await response.json();

      setVideoUrl('');
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-96">
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mt-2">
            <input 
              type="text"
              className="grow"
              placeholder="Insert a video URL" 
              value={videoUrl}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    </div>
  )
}
