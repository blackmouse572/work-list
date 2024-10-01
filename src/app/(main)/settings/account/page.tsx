import { cookies } from "next/headers";
import { DEFAULT_WORKSPACE_ID } from "../../todo/constant";
import FeatureCard from "../components/FeatureCard";
import { Icon } from "@/app/components/Icons";
import { Switch } from "@nextui-org/switch";
import { Divider } from "@nextui-org/divider";

function Account() {
  const cookieStore = cookies();
  const _ = cookieStore.get("workspaceId")?.value || DEFAULT_WORKSPACE_ID;
  return (
    <div className="pt-2 overflow-auto space-y-8 relative container max-w-2xl mx-auto px-4">
      <FeatureCard
        title="Account Information"
        description="Your account is free and secure."
      >
        <span className="aspect-square h-12 flex items-center justify-center bg-content2 rounded-full opacity-70 hover:opacity-100 transition-opacity relative">
          <Icon name="tabler/shield-check-filled" color="secondary" size="lg" />
        </span>
      </FeatureCard>
      <Divider />
      <FeatureCard
        title="Tracking"
        description="Allow us to track your usage for better service."
      >
        <Switch />
      </FeatureCard>
    </div>
  );
}

export default Account;
