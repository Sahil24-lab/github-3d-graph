"use client";

import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import ZoomControls from "./components/ZoomControls";
import Github3DGraphWrapper from "./components/Github3DGraphWrapper";
import html2canvas from "html2canvas";

export default function Home() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("green");

  const handleUsernameSubmit = (u: string) => {
    setUsername(u);
  };

  const handleThemeChange = (t: string) => {
    setTheme(t);
  };

  const handleScreenshot = async () => {
    const container = document.getElementById("graph-container");
    if (!container) return;
    const canvas = await html2canvas(container);
    const dataUrl = canvas.toDataURL("image/png");
    const newTab = window.open();
    if (newTab)
      newTab.document.body.innerHTML = `<img src="${dataUrl}" alt="Screenshot"/>`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My GitHub 3D Graph",
        text: "Check out my 3D GitHub activity!",
        url: window.location.href,
      });
    } else {
      alert("Share API not supported in this browser.");
    }
  };

  const handleZoomIn = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const evt = new WheelEvent("wheel", { deltaY: -100 });
    canvas.dispatchEvent(evt);
  };

  const handleZoomOut = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const evt = new WheelEvent("wheel", { deltaY: 100 });
    canvas.dispatchEvent(evt);
  };

  const handleCenter = () => {
    window.location.reload();
  };

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#000",
      }}
    >
      <Github3DGraphWrapper username={username} theme={theme} />
      <ControlPanel
        onSubmit={handleUsernameSubmit}
        onThemeChange={handleThemeChange}
        onScreenshot={handleScreenshot}
        onShare={handleShare}
      />
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onCenter={handleCenter}
      />
    </main>
  );
}
