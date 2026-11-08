import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/useAuth";

export default function WebsiteSettingsPage() {
  const { profile } = useAuth();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Website Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your website details.</p>
      </div>
      <Card className="space-y-4">
        <Input label="Website URL" defaultValue={profile?.websiteUrl || ""} />
        <Input label="Business Name" defaultValue={profile?.businessName || ""} />
        <Button>Save Changes</Button>
      </Card>
    </div>
  );
}