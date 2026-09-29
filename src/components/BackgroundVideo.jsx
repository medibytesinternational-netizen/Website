import { useEffect, useRef, useState } from 'react';

/**
 * Decorative looping background video.
 *
 * Picks the 960px encode on small/low-data screens and the 1600px one
 * elsewhere, so phones never pull the desktop file. The poster paints
 * immediately and the video fades in over it once it can play, which also
 * means the section looks right when autoplay is refused or motion is paused.
 */
export default function BackgroundVideo({ className, base, poster }) {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const small =
      window.matchMedia('(max-width: 820px)').matches || navigator.connection?.saveData === true;
    setSrc(`${base}-${small ? 960 : 1600}.mp4`);
  }, [base]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    // Motion may already be paused when this mounts (toggle or OS preference).
    if (document.documentElement.classList.contains('motion-paused')) video.pause();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src ?? undefined}
      poster={poster}
      autoPlay
      muted
      defaultMuted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={(e) => {
        e.currentTarget.muted = true;
        e.currentTarget.classList.add('ready');
        if (!document.documentElement.classList.contains('motion-paused')) {
          e.currentTarget.play().catch(() => {});
        }
      }}
    />
  );
}
