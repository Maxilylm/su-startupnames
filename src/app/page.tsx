"use client";

import { useState } from "react";

interface NameResult {
  name: string;
  tagline: string;
  domain: string;
  explanation: string;
}

const INDUSTRIES = [
  "Tech",
  "Health",
  "Finance",
  "Education",
  "Food",
  "Travel",
  "Social",
  "Gaming",
  "Other",
];

const VIBES = ["Professional", "Playful", "Bold", "Minimal", "Techy"];

export default function Home() {
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [vibe, setVibe] = useState("");
  const [results, setResults] = useState<NameResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function handleGenerate() {
    if (!description.trim()) {
      setError("Please enter a startup description.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, industry, vibe }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate names");
      }

      const data = await res.json();
      setResults(data.names || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function copyName(name: string, index: number) {
    await navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[#2a2a2a] px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-indigo-400">Name</span>Forge
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              AI-powered startup name generator
            </p>
          </div>
          <a
            href="https://github.com/maxilylm/su-startupnames"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Input Form */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 mb-8">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Describe your startup idea
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., An app that connects freelance designers with small businesses needing quick branding work..."
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Industry
                  </label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                  >
                    <option value="">Select industry...</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="vibe"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Vibe
                  </label>
                  <select
                    id="vibe"
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                  >
                    <option value="">Select vibe...</option>
                    {VIBES.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {loading ? "Generating..." : "Generate Names"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-800/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-40" />
              ))}
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((result, index) => {
                const hue = (index * 36) % 360;
                return (
                  <div
                    key={index}
                    className="animate-fade-in bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 relative overflow-hidden"
                    style={{
                      animationDelay: `${index * 60}ms`,
                      opacity: 0,
                      borderLeftWidth: "3px",
                      borderLeftColor: `hsl(${hue}, 70%, 55%)`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {result.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {result.tagline}
                        </p>
                      </div>
                      <button
                        onClick={() => copyName(result.name, index)}
                        className="shrink-0 px-3 py-1.5 text-xs bg-[#1a1a1a] border border-[#2a2a2a] rounded-md hover:bg-[#222] transition-colors text-gray-300"
                      >
                        {copiedIndex === index ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    <div className="mt-3">
                      <span
                        className="inline-block px-2.5 py-1 text-xs font-mono rounded-md"
                        style={{
                          backgroundColor: `hsl(${hue}, 70%, 55%, 0.12)`,
                          color: `hsl(${hue}, 70%, 70%)`,
                        }}
                      >
                        {result.domain}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] px-6 py-4">
        <div className="max-w-5xl mx-auto text-center text-xs text-gray-600">
          Powered by{" "}
          <a
            href="https://groq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-400 transition-colors"
          >
            Groq
          </a>{" "}
          &middot; Built with Next.js
        </div>
      </footer>
    </div>
  );
}
