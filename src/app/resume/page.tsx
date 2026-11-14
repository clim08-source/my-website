import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Resume — Coming soon" };

export default function Page() {
  return <ComingSoon section="Resume" />;
}
