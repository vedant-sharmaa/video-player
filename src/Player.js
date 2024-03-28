import React, { useRef, useState, useEffect } from 'react';
import './Player.css';
import file from "./media/IMG_0525.mp4";

const Player = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video.muted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const handleChangeVolume = (e) => {
    const video = videoRef.current;
    const value = parseFloat(e.target.value);
    setVolume(value);
    video.volume = value;
    setIsMuted(value === 0);
  };

  const handleTimeChange = (e) => {
    const video = videoRef.current;
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
    video.currentTime = value;
  };

  return (
    <div className="video-container">
      <video ref={videoRef} src={file}></video>
      <div className="video-controls-container">
        <div className="timeline-container">
          <div className="timeline">
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
          <button className="play-pause-btn" onClick={togglePlay}>
            <svg className={`play-icon ${isPlaying ? 'hidden' : ''}`} viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className={`pause-icon ${isPlaying ? '' : 'hidden'}`} viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          <div className="volume-container">
            <button className="mute-btn" onClick={toggleMute}>
              <svg className={`volume-high-icon ${isMuted ? 'hidden' : ''}`} viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>
              <svg className={`volume-low-icon ${isMuted ? '' : 'hidden'}`} viewBox="0 0 24 24">
                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9H5Z" />
              </svg>
              <svg className={`volume-muted-icon ${isMuted ? '' : 'hidden'}`} viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
              </svg>
            </button>
            <input className="volume-slider" type="range" min="0" max="1" step="any" value={volume} onChange={handleChangeVolume} />
          </div>
          <div className="duration-container">
            <div className="current-time">{formatTime(currentTime)}</div>
            / 
            <div className="total-time">{formatTime(duration)}</div>
          </div>
          <button className="captions-btn">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M6,18H18V20H6V18Z" />
            </svg>
          </button>
          <button className="settings-btn">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,6C10.9,6 10,6.9 10,8C10,9.1 10.9,10 12,10C13.1,10 14,9.1 14,8C14,6.9 13.1,6 12,6M12,12C10.9,12 10,12.9 10,14C10,15.1 10.9,16 12,16C13.1,16 14,15.1 14,14C14,12.9 13.1,12 12,12M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12Z" />
            </svg>
          </button>
          <button className="full-screen-btn">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M21,9H19V5A1,1 0 0,0 18,4H14V2H10V4H6A1,1 0 0,0 5,5V9H3A1,1 0 0,0 2,10V14A1,1 0 0,0 3,15H5V19A1,1 0 0,0 6,20H10V22H14V20H18A1,1 0 0,0 19,19V15H21A1,1 0 0,0 22,14V10A1,1 0 0,0 21,9M18,14H6V10H18V14Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  const hours = seconds / 3600;
  const mins = (seconds % 3600) / 60;
  const secs = seconds % 60;
  return [hours, mins, secs].map(format).join(':');
};

export default Player;
