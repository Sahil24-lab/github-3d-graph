"use client";

import { useState, useRef } from "react";
import Github3DGraphWrapper from "./components/Github3DGraphWrapper";
import ControlPanel from "./components/ControlPanel";
import html2canvas from "html2canvas";

export default function Home() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("green");

  const handleUsernameSubmit = (u: string) => setUsername(u);
  const handleThemeChange = (t: string) => setTheme(t);

  const handleScreenshot = async () => {
    const container = document.getElementById("graph-container");
    if (container) {
      const canvas = await html2canvas(container);
      const dataUrl = canvas.toDataURL("image/png");
      const newTab = window.open();
      if (newTab)
        newTab.document.body.innerHTML = `<img src="${dataUrl}" alt="Screenshot"/>`;
    }
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

  // For Zoom In/Out or Center, we can store camera positions in state or
  // pass them down. For simplicity, let's do quick DOM queries:
  const handleZoomIn = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    // A quick approach is to dispatch a wheel event
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
    // Reload the page or set state to reset?
    // Simpler: just reload for now
    window.location.reload();
  };

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        background: "#000",
      }}
    >
      <Github3DGraphWrapper username={username} theme={theme} />
      <ControlPanel
        onSubmit={handleUsernameSubmit}
        onThemeChange={handleThemeChange}
        onScreenshot={handleScreenshot}
        onShare={handleShare}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onCenter={handleCenter}
      />
    </main>
  );
}
