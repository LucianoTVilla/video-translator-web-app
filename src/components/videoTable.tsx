'use client'
import { useEffect, useState } from "react";
import { FiPlay, FiDownload } from 'react-icons/fi';

import { useAppContext } from "@/context";

interface Video {
  _id: string;
  url: string;
  duration: number;
  height: number;
  translation: string;
  firstFrameUrl: string;
  ocrResult: string;
}

export default function VideoTable() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [firstFrameUrl, setFirstFrameUrl] = useState<string>("");

  const { loading }  = useAppContext();

  useEffect(() => {
    fetchVideos();
  }, [loading]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data.responseObject);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const playAudio = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/audio/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
      if (audioElement) {
        audioElement.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  

  const playTranslatedAudio = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/translated-audio/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
      if (audioElement) {
        audioElement.play();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleDownloadClick = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/audio/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }
      const audioBlob = await response.blob();

      const url = videos.find(video => video._id === id)?.url;
      if (url) {
        const fileName = `${url.split('/').pop()}.mp3`;
        const urlObject = URL.createObjectURL(audioBlob);
        const anchor = document.createElement('a');
        anchor.href = urlObject;
        anchor.download = fileName;
        anchor.click();
      }
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };

  const fetchFirstFrame = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/first-frame/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch first frame');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setFirstFrameUrl(url);
    } catch (error) {
      console.error('Error fetching first frame:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-center pt-4">
        <audio id="audio-player" controls src={audioUrl} />      
      </div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>OCR</th>
            <th>URL</th>
            <th>Duration (s)</th>
            <th>Height (px)</th>
            <th>Actions</th>
            <th>Translated Text</th>
            <th>Play Translated Audio</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => (
            <tr key={video._id}>
               <td>
               <button onClick={() => fetchFirstFrame(video._id)}>
                  Show First Frame
                </button>
                {firstFrameUrl && (
                  <a href={firstFrameUrl} download={`first-frame-${video._id}.png`}>
                    <img src={firstFrameUrl} alt="First Frame" />
                  </a>
                )}
              </td>
              <td>{video.ocrResult}</td>
              <td>{video.url}</td>
              <td>{video.duration.toFixed(2)}</td>
              <td>{video.height}</td>              
              <td>
                <button onClick={() => playAudio(video._id)} className="play-button">
                  <FiPlay /> 
                </button>
                <button onClick={() => handleDownloadClick(video._id)} className="download-button">
                  <FiDownload />
                </button>
              </td>
              <td>{video.translation}</td>
                <td>
                  <button onClick={() => playTranslatedAudio(video._id)} className="play-button">
                    <FiPlay /> 
                  </button>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
