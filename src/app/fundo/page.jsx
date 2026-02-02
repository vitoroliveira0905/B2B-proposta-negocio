import "./backgroundVideo.css";

export default function BackgroundVideo() {
  return (
    <div className="video-container">
      <video
        className="background-video"
        src="/imagens/fundo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay"></div>
    </div>
  );
}