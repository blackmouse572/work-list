import TrashMainSection from "@/app/components/TrashMainSection";
import { cookies } from "next/headers";
import { DEFAULT_WORKSPACE_ID } from "../todo/constant";

function TrashPage() {
  const workspaceId =
    cookies().get("workspaceId")?.value || DEFAULT_WORKSPACE_ID;
  return <TrashMainSection workspaceId={workspaceId} />;
}

export default TrashPage;
