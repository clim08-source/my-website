import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Experience — Coming soon" };

export default function Page() {
  return <ComingSoon section="Experience" />;
}
