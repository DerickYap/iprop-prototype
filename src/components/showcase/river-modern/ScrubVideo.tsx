"use client";

import { useEffect, useRef, useState } from "react";
import type { RiverVideo } from "@/data/projects";

/* eslint-disable @next/next/no-img-element */
/**
 * Full-screen film whose playhead is driven by scroll progress. We "prime" the
 * video with a muted play→pause (so browsers will actually repaint frames on
 * seek — paused-never-played videos often won't), then set `currentTime` from
 * the damped scroll progress. Falls back to the poster if the video can't load.
 */
export default function ScrubVideo({
  video,
  subscribe,
}: {
  video: RiverVideo;
  subscribe: (fn: (p: number) => void) => () => void;
}) {
  const vRef = useRef<HTMLVideoElement>(null);
  const duration = useRef(0);
  const lastSeek = useRef(-1);
  const primed = useRef(false);
  const pending = useRef(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = vRef.current;
    if (!v) return;

    const readDuration = () => {
      if (Number.isFinite(v.duration) && v.duration > 0) duration.current = v.duration;
    };

    // Prime once so seeking repaints frames; then jump to the current target.
    const prime = () => {
      if (primed.current) return;
      primed.current = true;
      readDuration();
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          v.pause();
          seek(true);
        }).catch(() => {
          // autoplay blocked — paused seeking still works on most desktop browsers
          seek(true);
        });
      } else {
        v.pause();
        seek(true);
      }
    };

    // Self-paced seeking: never issue a new seek while one is in flight (that's
    // what backs up and lags on sparse-keyframe files). Each time a seek lands,
    // chase the latest scroll target.
    const seek = (force = false) => {
      const d = duration.current;
      if (!d || (v.seeking && !force)) return;
      const t = pending.current * d;
      if (force || Math.abs(t - lastSeek.current) > 1 / 24) {
        lastSeek.current = t;
        try {
          v.currentTime = t;
        } catch {
          /* not seekable yet */
        }
      }
    };

    const onSeeked = () => seek();
    const onError = () => setFailed(true);

    v.addEventListener("loadedmetadata", readDuration);
    v.addEventListener("durationchange", readDuration);
    v.addEventListener("loadeddata", prime);
    v.addEventListener("canplay", prime);
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("error", onError);
    // in case it was already ready before listeners attached
    if (v.readyState >= 2) prime();
    else readDuration();

    const unsub = subscribe((p) => {
      pending.current = p;
      seek();
    });

    return () => {
      v.removeEventListener("loadedmetadata", readDuration);
      v.removeEventListener("durationchange", readDuration);
      v.removeEventListener("loadeddata", prime);
      v.removeEventListener("canplay", prime);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("error", onError);
      unsub();
    };
  }, [subscribe]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!failed ? (
        <video
          ref={vRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          poster={video.poster}
        >
          <source src={video.src} type="video/mp4" />
          {video.webm && <source src={video.webm} type="video/webm" />}
        </video>
      ) : (
        <img
          src={video.poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* legibility wash for the overlaid typography */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,11,18,0.30) 0%, rgba(7,11,18,0.04) 35%, rgba(7,11,18,0.55) 100%)",
        }}
      />
    </div>
  );
}
