import { Metadata } from "next";
import { Divider } from "@nextui-org/divider";
import FeatureCard from "./components/FeatureCard";
import Feedback from "./components/Feedback";
import ExportButton from "./components/ExportButton";
import ImportButton from "./components/ImportButton";
import { DEFAULT_WORKSPACE_ID } from "../todo/constant";
import { cookies } from "next/headers";
import DeleteButton from "./components/DeleteButton";

export const metadata: Metadata = {
  title: "Setting",
  description: "Setting page to manage your account and preferences.",
};
function SettingPage() {
  const cookieStore = cookies();
  const workspaceId =
    cookieStore.get("workspaceId")?.value || DEFAULT_WORKSPACE_ID;
  return (
    <div className="pt-2 overflow-auto space-y-2 relative container max-w-2xl mx-auto px-4">
      <FeatureCard
        title="Exports data"
        description="Export and store your data in a secure place."
      >
        <ExportButton workspaceId={workspaceId} />
      </FeatureCard>

      <Divider />

      <FeatureCard
        title="Import data"
        description="Restore your data from a backup. All your data will be replaced."
      >
        <ImportButton workspaceId={workspaceId} />
      </FeatureCard>

      <Divider />

      <FeatureCard
        title="Feedback"
        description="Your feedback is important to us. Please let us know if you have any"
        containerClassName="max-w-[300px] flex-col gap-2 items-end"
      >
        <Feedback />
      </FeatureCard>

      <Divider />
      <div className="space-y-3 pt-5">
        <h3 className="text-lg font-semibold text-danger-500">Danger Zone</h3>
        <FeatureCard
          title="Delete all data"
          description="Wipe all your data of this current workspace."
          variants="danger"
        >
          <DeleteButton workspaceId={workspaceId} />
        </FeatureCard>
      </div>
    </div>
  );
}

export default SettingPage;
