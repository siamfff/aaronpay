import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Image as ImageIcon, Loader2 } from "lucide-react";

export default function BrandingPage() {
  const { profile, user, refreshProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(profile?.logoUrl || "");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // সরাসরি আপনার প্রিসেটের নাম

      // আপনার স্ক্রিনশটের Cloud Name ব্যবহার করা হচ্ছে
      const res = await fetch(`https://api.cloudinary.com/v1_1/dkimntlkh/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Cloudinary Response:", data);

      if (data.secure_url) {
        const docId = profile?.merchantId || user?.uid;
        if (docId) {
          await updateDoc(doc(db, "merchants", docId), {
            logoUrl: data.secure_url
          });
          setLogoUrl(data.secure_url);
          await refreshProfile();
          alert("Logo uploaded successfully!");
        }
      } else {
        alert(`Upload failed: ${data.error?.message || "Unknown error"}`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Error uploading image. Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Branding</h1>
        <p className="text-sm text-gray-500 mt-1">Customize your checkout page logo.</p>
      </div>
      
      <Card className="text-center py-12">
        <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden relative">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={40} className="text-gray-300" />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Loader2 className="animate-spin text-gray-800" size={28} />
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800">
          {logoUrl ? "Update Your Logo" : "Upload Your Logo"}
        </h3>
        <p className="text-sm text-gray-500 mb-6">PNG, JPG up to 2MB.</p>
        
        <div>
          <input 
            type="file" 
            id="logo-upload" 
            accept="image/png, image/jpeg" 
            className="hidden" 
            onChange={handleUpload} 
            disabled={uploading}
          />
          <label htmlFor="logo-upload">
            <Button variant="secondary" disabled={uploading} className="cursor-pointer pointer-events-none">
              {uploading ? "Uploading..." : "Choose File"}
            </Button>
          </label>
        </div>
      </Card>
    </div>
  );
}