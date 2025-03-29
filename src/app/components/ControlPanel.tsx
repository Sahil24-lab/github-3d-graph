"use client";

import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

export type ControlPanelProps = {
  onSubmit: (username: string) => void;
  onThemeChange: (theme: string) => void;
  onScreenshot: () => void;
  onShare: () => void;
};

export default function ControlPanel({
  onSubmit,
  onThemeChange,
  onScreenshot,
  onShare,
}: ControlPanelProps) {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("green");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username);
  };

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
        borderRadius: 2,
        width: 300,
        zIndex: 1000,
        background: "#2c2c2c",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff", fontWeight: 500 }}>
        GitHub 3D Graph
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          label="GitHub Username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          InputProps={{
            style: { backgroundColor: "#424242", color: "#fff" },
          }}
          InputLabelProps={{
            style: { color: "#ccc" },
          }}
        />
        <FormControl variant="filled" fullWidth>
          <InputLabel sx={{ color: "#ccc" }}>Color Scheme</InputLabel>
          <Select
            value={theme}
            onChange={handleThemeChange}
            sx={{
              backgroundColor: "#424242",
              color: "#fff",
            }}
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
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Generate
        </Button>
        <Button
          variant="contained"
          onClick={onScreenshot}
          sx={{
            backgroundColor: "#424242",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#616161",
            },
          }}
        >
          Screenshot
        </Button>
        <Button
          variant="contained"
          onClick={onShare}
          sx={{
            backgroundColor: "#424242",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#616161",
            },
          }}
        >
          Share
        </Button>
      </form>
    </Paper>
  );
}
