"use client";

import { useRef, Suspense, lazy } from "react";

// Dynamically import Spline to avoid SSR issues (it uses WebGL / window APIs)
const Spline = lazy(() => import("@splinetool/react-spline"));

export default function SplineRobot() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const splineRef = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onLoad(splineApp: any) {
    splineRef.current = splineApp;
  }

  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#00b4ff]/30 border-t-[#00b4ff] animate-spin" />
          </div>
        }
      >
        <Spline
          scene="https://prod.spline.design/kZDDjO5HlViTxEfT/scene.splinecode"
          onLoad={onLoad}
        />
      </Suspense>
    </div>
  );
}
