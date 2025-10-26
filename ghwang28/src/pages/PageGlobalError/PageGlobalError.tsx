import React from "react";
import { Fallback } from "./components";

export class PageGlobalError extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  // componentDidCatch(error: Error) {
    // if (/Failed to fetch dynamically imported module/.test(error.message)) {
    //   console.warn("Chunk load failed — refreshing page...");
    //   window.location.reload();
    // }
  // }

  render() {
    if (this.state.error) {
      return <Fallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
