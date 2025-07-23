import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Navigate, useParams } from 'react-router-dom';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

export function RecordRoomAudio() {
  const { roomId } = useParams();

  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const uploadAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    const res = await fetch(`http://localhost:3001/rooms/${roomId}/audio`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data;
  };

  const createRecorder = (audio: MediaStream) => {
    recorderRef.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorderRef.current.start();
  };

  const handleRecordAudio = async () => {
    if (!isRecordingSupported) {
      alert('Recording is not supported in this browser.');
      return;
    }
    setIsRecording(true);
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorderRef.current?.stop();

      createRecorder(audio);
    }, 5000);
  };

  if (!roomId) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 mx-auto max-w-4xl px-4 py-4">
      {isRecording ? (
        <Button onClick={handleStopRecording}>Stop Recording</Button>
      ) : (
        <Button onClick={handleRecordAudio}>Record Audio</Button>
      )}
      <p>Recording: {isRecording ? 'On' : 'Off'}</p>
    </div>
  );
}
