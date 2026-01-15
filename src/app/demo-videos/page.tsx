"use client";

type Video = {
  title: string;
  youtubeId: string;
};

const videos: Video[] = [
  {
    title: "AI Scheduling tool walkthrough",
    youtubeId: "LVza9tBL4iA",
  },
  {
    title: "Forecasting Engine Walkthrough",
    youtubeId: "zNRVCKql2J8",
  },
  {
    title: "AI Scheduling Live session",
    youtubeId: "SBvCwdZz96U",
  },
];

export default function DemoVideosPage() {
  return (
    <div style={{ padding: "60px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Demo Videos
      </h1>

      <div className="video-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-card">
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?mute=1&autoplay=0&controls=0&rel=0`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <h3>{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
