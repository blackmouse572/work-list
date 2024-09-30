import SettingLayoutClient from "./layout.client";

function SettingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-2 h-screen min-w-[300px] overflow-auto space-y-4 relative">
      <SettingLayoutClient>{children}</SettingLayoutClient>
    </div>
  );
}

export default SettingLayout;
