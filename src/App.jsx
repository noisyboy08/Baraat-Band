import React, { useState, useEffect, useRef } from 'react';

// ==========================================================================
// Baraat Band — Initial Track Metadata (Synced Live with YouTube Playlist)
// ==========================================================================
const OFFICIAL_PLAYLIST = [
  { id: 'k4yXQkzyLNI', title: 'Kala Chashma', artist: 'Amar Arshi, Badshah, Neha Kakkar & Indeep Bakshi', thumbnail: 'https://i.ytimg.com/vi/k4yXQkzyLNI/mqdefault.jpg' },
  { id: '5mqhI2pActU', title: 'London Thumakda', artist: 'Sonu Kakkar, Labh Janjua & Neha Kakkar', thumbnail: 'https://i.ytimg.com/vi/5mqhI2pActU/mqdefault.jpg' },
  { id: 'bIGsymf70n0', title: 'Nagada Sang Dhol', artist: 'Sanjay Leela Bhansali, Shreya Ghoshal & Osman Mir', thumbnail: 'https://i.ytimg.com/vi/bIGsymf70n0/mqdefault.jpg' },
  { id: '_KhQT-LGb6o', title: 'Chammak Challo', artist: 'Vishal-Shekhar, Akon & Hamsika Iyer', thumbnail: 'https://i.ytimg.com/vi/_KhQT-LGb6o/mqdefault.jpg' },
  { id: 'H15147z6a7M', title: 'Shubhaarambh (From "Kai Po Che")', artist: 'Amit Trivedi, Shruti Pathak & Divya Kumar', thumbnail: 'https://i.ytimg.com/vi/H15147z6a7M/mqdefault.jpg' },
  { id: 'CgJkHNlBfHQ', title: 'Shararat (From "Dhurandhar")', artist: 'Shashwat Sachdev, Madhubanti Bagchi & Jasmine Sandlas', thumbnail: 'https://i.ytimg.com/vi/CgJkHNlBfHQ/mqdefault.jpg' },
  { id: 'JLEnlb8TrIo', title: 'Chogada (From "Loveyatri")', artist: 'Darshan Raval, Asees Kaur & Lijo George', thumbnail: 'https://i.ytimg.com/vi/JLEnlb8TrIo/mqdefault.jpg' },
  { id: 'N993-9q-h1w', title: 'Gallan Goodiyaan', artist: 'Shankar Mahadevan & Yashita Sharma', thumbnail: 'https://i.ytimg.com/vi/N993-9q-h1w/mqdefault.jpg' },
  { id: 'ZVFk5_Y1vGg', title: 'Badri Ki Dulhania', artist: 'Dev Negi, Neha Kakkar & Monali Thakur', thumbnail: 'https://i.ytimg.com/vi/ZVFk5_Y1vGg/mqdefault.jpg' },
  { id: 'xG-e5o8Wv4A', title: 'Banno Tera Swagger', artist: 'Brijesh Shandilya & Swati Sharma', thumbnail: 'https://i.ytimg.com/vi/xG-e5o8Wv4A/mqdefault.jpg' }
];

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeString, setTimeString] = useState('1:37 pm');
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [onlineCount, setOnlineCount] = useState(34);
  const [language, setLanguage] = useState('hi');
  const [liveMetaData, setLiveMetaData] = useState(null);

  const playerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const dragSeekingRef = useRef(false);

  const currentTrack = liveMetaData || OFFICIAL_PLAYLIST[currentTrackIndex] || OFFICIAL_PLAYLIST[0];

  // Clock Display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      setTimeString(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 10000);
    return () => clearInterval(clockInterval);
  }, []);

  // Online viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(30 + Math.floor(Math.random() * 10));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Initialize YouTube Player with full Playlist PLIB_nTfiAgYk
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = initializeYTPlayer;
    if (window.YT && window.YT.Player) {
      initializeYTPlayer();
    }

    return () => stopProgressLoop();
  }, []);

  const initializeYTPlayer = () => {
    if (playerRef.current) return;

    playerRef.current = new window.YT.Player('yt-player-iframe', {
      height: '1px',
      width: '1px',
      playerVars: {
        listType: 'playlist',
        list: 'PLIB_nTfiAgYk', // User's official 37-track playlist
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3
      },
      events: {
        onReady: (e) => {
          setIsPlayerReady(true);
          e.target.setVolume(90);
        },
        onStateChange: handlePlayerStateChange,
        onError: () => {
          handleNext();
        }
      }
    });
  };

  const handlePlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
        const d = playerRef.current.getDuration();
        if (d > 0) setDuration(d);
      }

      // Sync metadata live from YouTube's playlist engine as songs transition
      if (playerRef.current && typeof playerRef.current.getVideoData === 'function') {
        const data = playerRef.current.getVideoData();
        if (data && data.title) {
          const validId = (data.video_id && typeof data.video_id === 'string' && data.video_id.length === 11) ? data.video_id : null;
          setLiveMetaData({
            title: data.title,
            artist: data.author || 'Baraat Band',
            thumbnail: validId ? `https://i.ytimg.com/vi/${validId}/mqdefault.jpg` : currentTrack.thumbnail
          });
        }
      }
      startProgressLoop();
    } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.CUED) {
      setIsPlaying(false);
      stopProgressLoop();
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      stopProgressLoop();
      // Seamlessly advance to next song in playlist when current finishes
      if (playerRef.current && typeof playerRef.current.nextVideo === 'function') {
        playerRef.current.nextVideo();
      }
    }
  };

  const startProgressLoop = () => {
    stopProgressLoop();
    progressTimerRef.current = setInterval(() => {
      if (playerRef.current && !dragSeekingRef.current) {
        if (typeof playerRef.current.getCurrentTime === 'function') {
          const time = playerRef.current.getCurrentTime() || 0;
          setCurrentTime(time);
        }
        if (typeof playerRef.current.getDuration === 'function') {
          const dur = playerRef.current.getDuration() || 0;
          if (dur > 0) setDuration(dur);
        }
      }
    }, 250);
  };

  const stopProgressLoop = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (!isPlayerReady || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    setLiveMetaData(null);
    if (playerRef.current && typeof playerRef.current.nextVideo === 'function') {
      playerRef.current.nextVideo();
      setIsPlaying(true);
    } else {
      const nextIdx = (currentTrackIndex + 1) % OFFICIAL_PLAYLIST.length;
      setCurrentTrackIndex(nextIdx);
    }
  };

  const handlePrev = () => {
    setLiveMetaData(null);
    if (playerRef.current && typeof playerRef.current.previousVideo === 'function') {
      playerRef.current.previousVideo();
      setIsPlaying(true);
    } else {
      const prevIdx = (currentTrackIndex - 1 + OFFICIAL_PLAYLIST.length) % OFFICIAL_PLAYLIST.length;
      setCurrentTrackIndex(prevIdx);
    }
  };

  // Interactive Slider Seeking
  const handleSeekInput = (e) => {
    dragSeekingRef.current = true;
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
  };

  const handleSeekChange = (e) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(targetTime, true);
    }
    dragSeekingRef.current = false;
  };

  // Keyboard Hotkeys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.code === 'ArrowRight') {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const cur = playerRef.current.getCurrentTime();
          playerRef.current.seekTo(cur + 10, true);
        }
      } else if (e.code === 'ArrowLeft') {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
          const cur = playerRef.current.getCurrentTime();
          playerRef.current.seekTo(Math.max(0, cur - 10), true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTrackIndex, isPlayerReady]);

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${String(remainingSecs).padStart(2, '0')}`;
  };

  const maxVal = duration > 0 ? duration : 100;
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Background Illustration */}
      <div className="bg-container">
        <div className="bg-overlay"></div>
      </div>

      {/* TOP BAR */}
      <header className="top-bar-minimal">
        <div className="top-left-time">
          {timeString}
        </div>

        <div className="top-center-online">
          <span className="green-online-dot"></span>
          <span>{onlineCount} online</span>
        </div>

        <div className="top-right-links">
          {/* Language Switcher Pill */}
          <div className="lang-switcher">
            <button
              className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
              onClick={() => setLanguage('hi')}
            >
              Hindi
            </button>
            <span className="lang-sep">|</span>
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>

          <a
            href="https://open.spotify.com/playlist/37i9dQZF1DXa2Pv1u3vPj0"
            target="_blank"
            rel="noopener noreferrer"
            className="top-text-link platform-link"
          >
            <svg className="platform-icon spotify-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.841c.36.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.02-.36-.18-.6.36-1.21.96-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72.96.42 1.5-.3.48-.96.66-1.5.36z"/>
            </svg>
            <span className="platform-name">Spotify</span>
            <span className="arrow-icon">↗</span>
          </a>

          <a
            href="https://music.youtube.com/playlist?list=PLIB_nTfiAgYk"
            target="_blank"
            rel="noopener noreferrer"
            className="top-text-link platform-link"
          >
            <svg className="platform-icon ytmusic-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.2c-3.972 0-7.2-3.228-7.2-7.2s3.228-7.2 7.2-7.2 7.2 3.228 7.2 7.2-3.228 7.2-7.2 7.2zm-2.4-10.8v7.2l6-3.6-6-3.6z"/>
            </svg>
            <span className="platform-name">YT Music</span>
            <span className="arrow-icon">↗</span>
          </a>
        </div>
      </header>

      {/* Hidden YT Player Target */}
      <div id="yt-player-container">
        <div id="yt-player-iframe"></div>
      </div>

      {/* TITLE: Dynamic Logo Image */}
      <div className="hero-title-container">
        {language === 'hi' ? (
          <img
            src="/marathi logo text.png"
            alt="बारात बैंड"
            className="hero-logo-img"
          />
        ) : (
          <img
            src="/English logo text .png"
            alt="BARAAT BAND"
            className="hero-logo-img english-logo"
          />
        )}
        <p className="hero-subtitle-text">
          {language === 'hi' ? 'सबसे ज़ोरदार बारात' : 'The most powerful wedding procession'}
        </p>
      </div>

      {/* FLOATING PILL PLAYER CARD */}
      <div className="pill-player-card">
        
        <div className="clean-album-art-container">
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className={`clean-album-art ${isPlaying ? 'spinning' : ''}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/background.jpeg';
            }}
          />
        </div>

        <div className="pill-player-main">
          <h2 className="pill-song-title">{currentTrack.title}</h2>
          <p className="pill-song-artist">{currentTrack.artist}</p>

          {/* Interactive Slider Track */}
          <div className="pill-slider-track">
            <input
              type="range"
              className="pill-slider-input"
              min="0"
              max={maxVal}
              value={currentTime}
              step="0.1"
              onInput={handleSeekInput}
              onChange={handleSeekChange}
            />
            <div className="pill-slider-fill" style={{ width: `${progressPct}%` }}></div>
          </div>
          
          <div className="pill-time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="pill-controls">
          <button className="minimal-control-btn" onClick={handlePrev} title="Previous Track">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2.5v12H6zm3.5 6L18 6v12z" /></svg>
          </button>

          <button className="minimal-play-btn" onClick={handlePlayPause} title="Play / Pause">
            {!isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4.5V5H6v14zm7.5-14v14H18V5h-4.5z" /></svg>
            )}
          </button>

          <button className="minimal-control-btn" onClick={handleNext} title="Next Track">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18V6l8.5 6zm9-12h2.5v12h-2.5z" /></svg>
          </button>
        </div>

      </div>
    </>
  );
}
