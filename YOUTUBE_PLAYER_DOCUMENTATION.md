# Documentação do YouTube Player Customizado

## Visão Geral
Sistema de player de vídeo customizado que utiliza a YouTube IFrame API com controles personalizados em roxo, substituindo os controles padrão vermelhos do YouTube.

---

## Arquivos Envolvidos

### 1. YouTubePlayer.tsx (Componente Principal)
**Localização:** `src/components/YouTubePlayer.tsx`

```typescript
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
```

---

### 2. Integração na Página Course.tsx
**Localização:** `src/pages/Course.tsx`

#### Imports Necessários
```typescript
import { YouTubePlayer } from "@/components/YouTubePlayer";
```

#### Uso do Componente
```typescript
{/* Video Player */}
<YouTubePlayer videoId="qUPF1akyqlw" />
```

**Exemplo Completo do Trecho:**
```typescript
<div className="mx-6 space-y-6">
  {/* Video Player */}
  <YouTubePlayer videoId="qUPF1akyqlw" />

  {/* Lesson Actions */}
  <div className="flex items-center justify-between">
    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
      <CheckCircle className="w-4 h-4" />
      Marcar como vista
    </Button>
  </div>
</div>
```

---

### 3. Design System (Cores e Estilos)
**Localização:** `src/index.css`

#### Variáveis CSS Customizadas
```css
:root {
  --primary: 258 90% 66%;  /* Roxo vibrante */
  --primary-foreground: 0 0% 98%;
  --background: 0 0% 4%;
  --foreground: 0 0% 96%;
}
```

#### Scrollbar Customizada (Roxa)
```css
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--background));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--primary));
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.8);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--primary)) hsl(var(--background));
}
```

---

## Como Funciona

### 1. Carregamento da YouTube IFrame API
```javascript
// Carrega o script da API do YouTube dinamicamente
if (!window.YT) {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
}
```

### 2. Inicialização do Player
```javascript
window.onYouTubeIframeAPIReady = () => {
  playerRef.current = new window.YT.Player("youtube-player", {
    height: "100%",
    width: "100%",
    videoId: videoId,
    playerVars: {
      controls: 0,        // Remove controles padrão
      modestbranding: 1,  // Remove branding do YouTube
      rel: 0,             // Não mostra vídeos relacionados
      autoplay: 0,        // Não inicia automaticamente
      fs: 1,              // Permite fullscreen
    },
    events: {
      onReady: (event) => {
        setDuration(event.target.getDuration());
      },
      onStateChange: (event) => {
        setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
      },
    },
  });
};
```

### 3. Atualização de Progresso
```javascript
// Intervalo que atualiza o tempo atual a cada 100ms
const interval = setInterval(() => {
  if (playerRef.current && playerRef.current.getCurrentTime) {
    setCurrentTime(playerRef.current.getCurrentTime());
  }
}, 100);
```

### 4. Controles Personalizados

#### Play/Pause
```javascript
const togglePlay = () => {
  if (!playerRef.current) return;
  if (isPlaying) {
    playerRef.current.pauseVideo();
  } else {
    playerRef.current.playVideo();
  }
};
```

#### Volume
```javascript
const handleVolumeChange = (e) => {
  const newVolume = parseInt(e.target.value);
  setVolume(newVolume);
  if (playerRef.current) {
    playerRef.current.setVolume(newVolume);
  }
};
```

#### Seek (Barra de Progresso)
```javascript
const handleProgressClick = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  const newTime = duration * percentage;
  playerRef.current.seekTo(newTime);
};
```

#### Fullscreen
```javascript
const handleFullscreen = () => {
  if (containerRef.current) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  }
};
```

---

## Estados do Componente

| Estado | Tipo | Descrição |
|--------|------|-----------|
| `isPlaying` | boolean | Indica se o vídeo está reproduzindo |
| `isMuted` | boolean | Indica se o áudio está mutado |
| `currentTime` | number | Tempo atual do vídeo em segundos |
| `duration` | number | Duração total do vídeo em segundos |
| `volume` | number | Volume atual (0-100) |
| `showControls` | boolean | Controla visibilidade dos controles |

---

## Estilos TailwindCSS Aplicados

### Container Principal
```jsx
className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
```

### Botão Play Central
```jsx
className="w-20 h-20 rounded-full bg-primary/80 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
```

### Barra de Progresso
```jsx
// Track (fundo)
className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden hover:h-1.5 transition-all"

// Fill (progresso)
className="h-full bg-primary transition-all"
style={{ width: `${progress}%` }}
```

### Controles
```jsx
className="h-9 w-9 text-white hover:bg-primary/20 hover:text-primary"
```

---

## API YouTube IFrame - Métodos Utilizados

| Método | Descrição |
|--------|-----------|
| `playVideo()` | Inicia a reprodução do vídeo |
| `pauseVideo()` | Pausa o vídeo |
| `getCurrentTime()` | Retorna o tempo atual em segundos |
| `getDuration()` | Retorna a duração total do vídeo |
| `seekTo(seconds)` | Avança/retrocede para um ponto específico |
| `setVolume(volume)` | Define o volume (0-100) |
| `mute()` | Muta o áudio |
| `unMute()` | Desmuta o áudio |

---

## Personalização

### Trocar o Vídeo
```jsx
<YouTubePlayer videoId="NOVO_VIDEO_ID" />
```

### Alterar Cor do Player
Modifique a variável CSS em `src/index.css`:
```css
--primary: 258 90% 66%; /* Roxo atual */
```

### Desabilitar Controles Específicos
Remova os botões correspondentes no JSX do `YouTubePlayer.tsx`

---

## Troubleshooting

### Vídeo não carrega
1. Verifique se o `videoId` está correto
2. Confirme que o vídeo permite incorporação
3. Verifique o console para erros da API

### Controles não aparecem
1. Verifique se o estado `showControls` está funcionando
2. Confirme que o `onMouseEnter` e `onMouseLeave` estão ativos
3. Verifique o z-index dos elementos

### Player não ocupa tela completa
1. Confirme que `aspect-video` está aplicado no container
2. Verifique se o iframe tem `width: 100%` e `height: 100%`
3. Confirme que `playerVars.fs: 1` está configurado

---

## Recursos Externos

- [YouTube IFrame Player API Reference](https://developers.google.com/youtube/iframe_api_reference)
- [Lucide React Icons](https://lucide.dev/guide/packages/lucide-react)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

## Changelog

### v1.0 - Implementação Inicial
- Player customizado com controles roxos
- Integração com YouTube IFrame API
- Barra de progresso interativa
- Controles de volume, play/pause, fullscreen

### v1.1 - Correções
- Ajuste do iframe para ocupar 100% da área
- Correção do pointer-events para permitir cliques
- Melhorias na responsividade
