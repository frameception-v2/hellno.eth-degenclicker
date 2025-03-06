"use client";

import React from "react";
import { PurpleButton } from "./ui/PurpleButton";

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-red-400 p-4 border border-red-800/50 bg-red-950/30 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Game Engine Crash</h2>
          <p className="monospace text-sm mb-4">{this.state.error?.message}</p>
          <PurpleButton onClick={this.handleReset}>
            Reload Experience
          </PurpleButton>
        </div>
      );
    }

    return this.props.children;
  }
}
