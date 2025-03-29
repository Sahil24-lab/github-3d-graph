"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Stack,
  SelectChangeEvent, // <-- Import this from @mui/material
} from "@mui/material";

export type ControlPanelProps = {
  onSubmit: (username: string) => void;
  onThemeChange: (theme: string) => void;
  onScreenshot: () => void;
  onShare: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
};

export default function ControlPanel({
  onSubmit,
  onThemeChange,
  onScreenshot,
  onShare,
  onZoomIn,
  onZoomOut,
  onCenter,
}: ControlPanelProps) {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("green");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username);
  };

  // Use SelectChangeEvent here
  const handleThemeChange = (e: SelectChangeEvent<string>) => {
    setTheme(e.target.value as string);
    onThemeChange(e.target.value as string);
  };

  return (
    <Paper
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        p: 3,
        borderRadius: 3,
        width: 320,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 5,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          label="GitHub Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="theme-label">Color Scheme</InputLabel>
          <Select
            labelId="theme-label"
            value={theme}
            label="Color Scheme"
            onChange={handleThemeChange} // <-- This now expects SelectChangeEvent
          >
            <MenuItem value="green">Green (Default)</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
            <MenuItem value="sunset">Sunset</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Generate
        </Button>
        <Button
          variant="outlined"
          onClick={onScreenshot}
          color="secondary"
          sx={{ textTransform: "none" }}
        >
          Screenshot
        </Button>
        <Button
          variant="outlined"
          onClick={onShare}
          color="secondary"
          sx={{ textTransform: "none" }}
        >
          Share
        </Button>
      </form>
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={onZoomIn}
          sx={{ textTransform: "none" }}
        >
          Zoom In
        </Button>
        <Button
          variant="contained"
          onClick={onZoomOut}
          sx={{ textTransform: "none" }}
        >
          Zoom Out
        </Button>
        <Button
          variant="contained"
          onClick={onCenter}
          sx={{ textTransform: "none" }}
        >
          Center
        </Button>
      </Stack>
    </Paper>
  );
}
