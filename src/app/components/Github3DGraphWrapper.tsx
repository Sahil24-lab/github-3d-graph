"use client";

import dynamic from "next/dynamic";
import { Github3DGraphProps } from "./Github3DGraph";

const Github3DGraph = dynamic<Github3DGraphProps>(
  () => import("./Github3DGraph"),
  {
    ssr: false,
  }
);

export default function Github3DGraphWrapper(props: Github3DGraphProps) {
  return <Github3DGraph {...props} />;
}
