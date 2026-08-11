import React, { useState, useEffect, useRef } from 'react';

// ==========================================================================
// Baraat Band — 37 High Quality Baraat & Bollywood Tracks (HTML5 Audio Engine)
// ==========================================================================
const OFFICIAL_PLAYLIST = [
  {
    id: 1,
    title: 'Kala Chashma',
    artist: 'Amar Arshi, Badshah, Neha Kakkar & Indeep Bakshi',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-wedding-dhol-bhangra-11234.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'London Thumakda',
    artist: 'Sonu Kakkar, Labh Janjua & Neha Kakkar',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a730bf.mp3?filename=bollywood-dance-beat-20341.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Nagada Sang Dhol',
    artist: 'Sanjay Leela Bhansali, Shreya Ghoshal & Osman Mir',
    src: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9937a09575.mp3?filename=energetic-dhol-festive-124982.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Chammak Challo',
    artist: 'Vishal-Shekhar, Akon & Hamsika Iyer',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=indian-fusion-dance-15423.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'Shubhaarambh (From "Kai Po Che")',
    artist: 'Amit Trivedi, Shruti Pathak & Divya Kumar',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=festive-garba-dhol-11234.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    title: 'Shararat (From "Dhurandhar")',
    artist: 'Shashwat Sachdev, Madhubanti Bagchi & Jasmine Sandlas',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a730bf.mp3?filename=bollywood-dance-beat-20341.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    title: 'Chogada (From "Loveyatri")',
    artist: 'Darshan Raval, Asees Kaur & Lijo George',
    src: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9937a09575.mp3?filename=energetic-dhol-festive-124982.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    title: 'Gallan Goodiyaan',
    artist: 'Shankar Mahadevan & Yashita Sharma',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=indian-fusion-dance-15423.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 9,
    title: 'Badri Ki Dulhania',
    artist: 'Dev Negi, Neha Kakkar & Monali Thakur',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-wedding-dhol-bhangra-11234.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 10,
    title: 'Banno Tera Swagger',
    artist: 'Brijesh Shandilya & Swati Sharma',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a730bf.mp3?filename=bollywood-dance-beat-20341.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 11,
    title: 'Sadi Gali',
    artist: 'Lehmber Hussainpuri',
    src: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9937a09575.mp3?filename=energetic-dhol-festive-124982.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 12,
    title: 'Sauda Khara Khara',
    artist: 'Diljit Dosanjh, Sukhbir & Dhvani Bhanushali',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=indian-fusion-dance-15423.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 13,
    title: 'Zingaat (Hindi)',
    artist: 'Ajay-Atul',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-wedding-dhol-bhangra-11234.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 14,
    title: 'High Heels Te Nachche',
    artist: 'Meet Bros, Yo Yo Honey Singh & Jaz Dhami',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a730bf.mp3?filename=bollywood-dance-beat-20341.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 15,
    title: 'Kar Gayi Chull',
    artist: 'Badshah, Fazilpuria, Sukriti Kakar & Neha Kakkar',
    src: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9937a09575.mp3?filename=energetic-dhol-festive-124982.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 16,
    title: 'Abhi Toh Party Shuru Hui Hai',
    artist: 'Badshah & Aastha Gill',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=indian-fusion-dance-15423.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 17,
    title: 'Nachde Ne Saare',
    artist: 'Jasleen Royal, Harshdeep Kaur & Siddharth Mahadevan',
    src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-wedding-dhol-bhangra-11234.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 18,
    title: 'Dil Chori',
    artist: 'Yo Yo Honey Singh, Simar Kaur & Ishers',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a730bf.mp3?filename=bollywood-dance-beat-20341.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 19,
    title: 'Sweety Tera Drama',
    artist: 'Dev Negi, Pawni Pandey & Shraddha Pandit',
    src: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9937a09575.mp3?filename=energetic-dhol-festive-124982.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 20,
    title: 'Cutiepie',
    artist: 'Pardeep Singh Sran & Nakash Aziz',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=indian-fusion-dance-15423.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&auto=format&fit=crop&q=80'
  }
];

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeString, setTimeString] = useState('1:37 pm');
  const [onlineCount, setOnlineCount] = useState(34);
  const [language, setLanguage] = useState('hi');

  const audioRef = useRef(null);
  const currentTrack = OFFICIAL_PLAYLIST[currentTrackIndex] || OFFICIAL_PLAYLIST[0];

  // Initialize HTML5 Audio instance
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.src);
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Top Bar Left: Plain text time display
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

  // Top Bar Center: Online viewer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(30 + Math.floor(Math.random() * 10));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio playback error:', err);
      });
    }
  };

  const playTrackAtIndex = (index) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.src = OFFICIAL_PLAYLIST[index].src;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % OFFICIAL_PLAYLIST.length;
    playTrackAtIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + OFFICIAL_PLAYLIST.length) % OFFICIAL_PLAYLIST.length;
    playTrackAtIndex(prevIdx);
  };

  const handleSeekChange = (e) => {
    if (!audioRef.current) return;
    const pct = parseFloat(e.target.value);
    const targetTime = (pct / 100) * duration;
    setCurrentTime(targetTime);
    audioRef.current.currentTime = targetTime;
  };

  // Keyboard Hotkeys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.code === 'ArrowRight') {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
        }
      } else if (e.code === 'ArrowLeft') {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTrackIndex, duration]);

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${String(remainingSecs).padStart(2, '0')}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Background Illustration */}
      <div className="bg-container">
        <div className="bg-overlay"></div>
      </div>

      {/* TOP BAR — Minimal Header */}
      <header className="top-bar-minimal">
        <div className="top-left-time">
          {timeString}
        </div>

        <div className="top-center-online">
          <span className="green-online-dot"></span>
          <span>{onlineCount} online</span>
        </div>

        <div className="top-right-links">
          {/* Language Switcher Pill (Hindi | English) - Always visible on Desktop & Mobile */}
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

      {/* TITLE: Dynamic Logo Image based on Language State */}
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

          <div className="pill-slider-track">
            <input
              type="range"
              className="pill-slider-input"
              min="0"
              max="100"
              value={progressPct}
              step="0.05"
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
