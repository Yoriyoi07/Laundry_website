import { HighFidelityHeader } from "./components/HighFidelityHeader";
import { HighFidelityHero } from "./components/HighFidelityHero";
import { HighFidelityServices } from "./components/HighFidelityServices";
import { HighFidelityFooter } from "./components/HighFidelityFooter";

export default function HighFidelityApp() {
  return (
    <div className="min-h-screen bg-white">
      <HighFidelityHeader />
      <HighFidelityHero />
      <HighFidelityServices />
      <HighFidelityFooter />
    </div>
  );
}