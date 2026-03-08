"use client";

type Video = {
  title: string;
  youtubeId: string;
};

const videos: Video[] = [
  { title: "AI Scheduling Tool Walkthrough V1.4", youtubeId: "PhBA-qaGos0" },
  { title: "AI Scheduling Tool Walkthrough", youtubeId: "LVza9tBL4iA" },
  { title: "Forecasting Engine Walkthrough", youtubeId: "zNRVCKql2J8" },
  { title: "AI Scheduling Live Session", youtubeId: "SBvCwdZz96U" },
];

export default function DemoVideosPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0b1c2d] text-center mb-3">Demo Videos</h1>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Watch step-by-step walkthroughs of the AI Scheduling and Forecasting tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-5 border border-gray-100"
            >
              <div className="video-wrapper mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?mute=1&autoplay=0&rel=0`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <h3 className="text-center font-semibold text-[#0b1c2d] text-base">{video.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@wfmclubs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-[#0b1c2d] text-white font-semibold rounded-lg hover:bg-[#123b63] transition-colors"
          >
            ▶️ View All Videos on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
