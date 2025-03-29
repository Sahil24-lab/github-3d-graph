"use client";

import React, { useRef, useState, useEffect, useCallback, JSX } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { fetchContributions } from "../../lib/github";

export type Github3DGraphProps = {
  username: string;
  theme: string;
};

type DayData = {
  date: string;
  contributionCount: number;
  weekday: number; // 0=Sun, 6=Sat
};

type Week = {
  contributionDays: DayData[];
};

const getBaseHue = (theme: string) => {
  switch (theme) {
    case "blue":
      return 240;
    case "purple":
      return 280;
    case "sunset":
      return 20;
    case "green":
    default:
      return 120;
  }
};

function GraphScene({ username, theme }: Github3DGraphProps) {
  const orbitRef = useRef<any>(null);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [hovered, setHovered] = useState<DayData | null>(null);
  const [hoverPos, setHoverPos] = useState<[number, number, number]>([0, 0, 0]);
  const baseHue = getBaseHue(theme);

  // Fetch data from your API route
  const loadData = useCallback(async () => {
    if (!username) return;
    try {
      const data = await fetchContributions(username);
      if (data?.weeks) {
        setWeeks(data.weeks);
      }
    } catch (err) {
      console.error("Error loading GitHub data:", err);
      setWeeks([]);
    }
  }, [username]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Use finalWeeks to avoid errors if no data exists.
  const finalWeeks = weeks.length ? weeks : [];

  // Handle pointer move to display hover data
  const { raycaster, mouse, camera, scene } = useThree();
  const handlePointerMove = (e: MouseEvent) => {
    const canvas = e.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const first = intersects[0];
      const dayData = first.object.userData?.dayData as DayData | undefined;
      if (dayData) {
        setHovered(dayData);
        const point = first.point;
        setHoverPos([point.x, point.y + 1, point.z]);
      } else {
        setHovered(null);
      }
    } else {
      setHovered(null);
    }
  };

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    canvas.addEventListener("pointermove", handlePointerMove);
    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerMove]);

  // Render cubes for each day based on contribution count
  const cubes: JSX.Element[] = [];
  finalWeeks.forEach((week, x) => {
    week.contributionDays.forEach((day, y) => {
      const value = day.contributionCount;
      const height = value * 0.1;
      const color = new THREE.Color(`hsl(${baseHue - value * 5}, 100%, 40%)`);
      cubes.push(
        <mesh
          key={`${x}-${y}`}
          position={[x, height / 2, day.weekday]}
          userData={{ dayData: day }}
        >
          <boxGeometry args={[0.9, height, 0.9]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    });
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls ref={orbitRef} />
      {cubes}
      {hovered && (
        <Html position={hoverPos} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: "5px",
              whiteSpace: "nowrap",
            }}
          >
            <div>{hovered.date}</div>
            <div>{hovered.contributionCount} commits</div>
          </div>
        </Html>
      )}
    </>
  );
}

export default function Github3DGraph({ username, theme }: Github3DGraphProps) {
  return (
    <div id="graph-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [40, 20, 40], fov: 50 }}>
        <GraphScene username={username} theme={theme} />
      </Canvas>
    </div>
  );
}
