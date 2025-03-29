"use client";

import React from "react";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HomeIcon from "@mui/icons-material/Home";

export type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
};

export default function ZoomControls({
  onZoomIn,
  onZoomOut,
  onCenter,
}: ZoomControlsProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "rgba(44,44,44,0.8)",
        p: 1,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      }}
    >
      <IconButton
        onClick={onZoomIn}
        sx={{
          color: "#fff",
          backgroundColor: "#424242",
          "&:hover": { backgroundColor: "#616161" },
        }}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        onClick={onZoomOut}
        sx={{
          color: "#fff",
          backgroundColor: "#424242",
          "&:hover": { backgroundColor: "#616161" },
        }}
      >
        <RemoveIcon />
      </IconButton>
      <IconButton
        onClick={onCenter}
        sx={{
          color: "#fff",
          backgroundColor: "#424242",
          "&:hover": { backgroundColor: "#616161" },
        }}
      >
        <HomeIcon />
      </IconButton>
    </Box>
  );
}
