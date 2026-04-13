import type { Metadata } from "next";
import WorkIndex from "./work-index";

export const metadata: Metadata = {
  title: "Work",
  description:
    "All projects — a full catalogue of selected work across design systems, SaaS platforms, brand identities, and AI products.",
};

export default function WorkPage() {
  return <WorkIndex />;
}
