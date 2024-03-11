'use client'

import { SetStateAction, useState } from "react";

import { useAppContext } from "@/context";

export default function InputURL() {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const { loading, setLoading } = useAppContext();

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!videoUrl.match(urlRegex)) {
      setError('Invalid URL. Please enter a valid URL.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: videoUrl })
      });

      if (!response.ok) {
        setLoading(false)
        throw new Error('Failed to create video');
      }

      setLoading(false)

      setVideoUrl('');
      setError('');
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
          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
          {loading && 
          <div>
            <span className="loading loading-spinner loading-lg"></span>
            <h2>Processing Video...</h2>
          </div>
            }
        </form>
      </div>
    </div>
  )
}

