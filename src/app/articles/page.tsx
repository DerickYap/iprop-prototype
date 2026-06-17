import type { Metadata } from "next";
import { Journal } from "@/components/editorial/Journal";

export const metadata: Metadata = {
  title: "The Journal — iProp",
  description:
    "Homeowner stories, new launch reviews and property trends from Singapore — read the story, then step inside the project.",
};

export default function ArticlesPage() {
  return <Journal />;
}
