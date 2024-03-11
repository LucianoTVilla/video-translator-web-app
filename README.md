# Video Translator App

## Overview
This project aims to provide a convenient solution for extracting audio from videos, translating it to Spanish, and generating a synthesized speech audio file. The application allows users to paste the URL of their MP4-formatted video, and the API takes care of the rest. It leverages various technologies such as FFMPEG for audio extraction, OpenAI Speech To Text for audio-to-text conversion, DeepL for translation from English to Spanish, and OpenAI Text to Speech for synthesizing speech. Additionally, Optical Character Recognition (OCR) is applied to the first frame of the video to detect words. The application also includes audio playback, image, and original audio download.

## Architecture
The application architecture is built around a web application developed using Next.js and TypeScript. It is supported by a REST API developed using Node.js, TypeScript, Express, Docker, and MongoDB for data storage. Currently, the files are saved locally, but for scalability and long-term storage, it is recommended to store them in a service like AWS S3.


## Features
- **Audio Extraction**: Extracts audio from videos using FFMPEG.
- **Speech-to-Text**: Converts audio to text using OpenAI Speech To Text.
- **Translation**: Translates text from English to Spanish using DeepL.
- **Text-to-Speech**: Generates Spanish audio using OpenAI Text to Speech.
- **Optical Character Recognition (OCR)**: Detects words from the first frame of the video.
- **Audio Playback**: Allows users to play the translated audio.
- **Download**: Provides options to download images and the original audio.

## Usage
1. Access the web application.
2. Paste the URL of the MP4 video.
3. Submit the request.
4. Receive the translated audio and detected words.

## Technologies Used
- Next.js
- TypeScript
- Node.js
- Express
- Docker
- MongoDB
- FFMPEG
- DeepL
- OpenAI Speech To Text
- OpenAI Text to Speech


## License
This project is licensed under the [MIT License](LICENSE).

[MIT](https://choosealicense.com/licenses/mit/)
