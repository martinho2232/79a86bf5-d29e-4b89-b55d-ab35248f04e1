import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, PictureInPicture } from "lucide-react";
import { Button } from "@/components/ui/button";

interface YouTubePlayerProps {
  videoId: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          autoplay: 0,
          fs: 1,
        },
        events: {
          onReady: (event: any) => {
            setDuration(event.target.getDuration());
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    // Update progress
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = duration * percentage;
    playerRef.current.seekTo(newTime);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div id="youtube-player" className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'auto' }} />
      
      {/* Center Play Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-primary/80 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 pointer-events-auto"
          >
            <Play className="w-10 h-10 text-white fill-white ml-1" />
          </button>
        </div>
      )}

      {/* Custom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="space-y-3">
          {/* Progress Bar */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleProgressClick}
          >
            <span className="text-xs text-white font-medium min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden hover:h-1.5 transition-all">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-white font-medium min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={togglePlay}
                className="h-9 w-9 text-white hover:bg-primary/20 hover:text-primary"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current" />
                )}
              </Button>

              <div className="flex items-center gap-2 group/volume">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={toggleMute}
                  className="h-9 w-9 text-white hover:bg-primary/20 hover:text-primary"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-0 group-hover/volume:w-20 transition-all opacity-0 group-hover/volume:opacity-100 accent-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 text-white hover:bg-primary/20 hover:text-primary"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 text-white hover:bg-primary/20 hover:text-primary"
              >
                <PictureInPicture className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleFullscreen}
                className="h-9 w-9 text-white hover:bg-primary/20 hover:text-primary"
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
