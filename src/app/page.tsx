import { Act1Paper } from "@/components/sections/Act1Paper";
import { Act2Challenge } from "@/components/sections/Act2Challenge";
import { Gather } from "@/components/sections/Gather";
import { Diverge } from "@/components/sections/Diverge";
import { Cluster } from "@/components/sections/Cluster";
import { HorizonScan } from "@/components/sections/HorizonScan";
import { Converge } from "@/components/sections/Converge";
import { ProofOfPattern } from "@/components/sections/ProofOfPattern";

export default function Home() {
  return (
    <main>
      <Act1Paper />
      <Act2Challenge />
      <Gather />
      <Diverge />
      <Cluster />
      <Converge />
      <HorizonScan />
      <ProofOfPattern />
    </main>
  );
}
