// src/lib/github.ts
export async function fetchContributions(username: string) {
    const res = await fetch(`/api/github?username=${username}`);
    if (!res.ok) {
      throw new Error("Failed to fetch GitHub data");
    }
    return res.json();
  }
  