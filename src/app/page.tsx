import React from 'react';
import InputURL from '@/components/InputURL';
import VideoTable from '@/components/videoTable';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl mb-8">VIDEO TRANSLATOR</h1>
      <InputURL></InputURL>
      <VideoTable></VideoTable>
    </main>
  );
}
