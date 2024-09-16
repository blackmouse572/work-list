import { DEFAULT_WORKSPACE_ID } from "@/app/(main)/todo/constant";
import AsideNav from "@/app/components/AsideNav";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import { cookies } from "next/headers";

function MainLayout({ children }: { children: React.ReactNode }) {
  const workspaceId =
    cookies().get("workspaceId")?.value ?? DEFAULT_WORKSPACE_ID;
  return (
    <div className="min-h-screen flex flex-col pl-2">
      <main className="flex flex-1 gap-3 divide-x-2 divide-divider">
        <div className="flex flex-col py-3.5">
          <AsideNav className="flex-1" workspaceId={workspaceId} />
          <ThemeSwitcher />
        </div>
        <div className="flex-1 bg-content1">{children}</div>
      </main>
      <footer></footer>
    </div>
  );
}

export default MainLayout;
