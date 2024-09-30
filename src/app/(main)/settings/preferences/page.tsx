import FeatureCard from "../components/FeatureCard";
import ThemeSwitcher from "../components/ThemeSwitch";

function Preferences() {
  return (
    <div className="pt-2 overflow-auto space-y-8 relative container max-w-2xl mx-auto px-4">
      <FeatureCard title="Theme" description="Choose your favorite theme.">
        <ThemeSwitcher />
      </FeatureCard>
    </div>
  );
}

export default Preferences;
