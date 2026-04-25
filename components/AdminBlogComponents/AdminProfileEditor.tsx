"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function AdminProfileEditor() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    about: "",
    location: "",
    profileImage: "",
    socials: [] as { platform: string; url: string }[],
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const router = useRouter()

  // 🔥 FETCH REAL DATA
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/admin/auth/admin-details", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.data) {
          setForm(data.data);
        }
      } catch (err) {
        console.log("Failed to load profile");
      } finally {
        setLoadingData(false);
      }
    };

    fetchUser();
  }, []);

  // 🔥 URL GENERATOR
  const generateUrl = (platform: string, value: string) => {
    if (!value) return "";

    switch (platform) {
      case "email":
        return `mailto:${value}`;
      case "phone":
        return `tel:${value}`;
      case "whatsapp":
        return `https://wa.me/${value}`;
      default:
        return value;
    }
  };

  // 🔥 INPUT CHANGE
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SOCIAL CHANGE
  const handleSocialChange = (index: number, field: string, value: string) => {
    const updated = [...form.socials];

    if (field === "platform") {
      updated[index].platform = value;
    } else {
      updated[index].url = generateUrl(updated[index].platform, value);
    }

    setForm({ ...form, socials: updated });
  };

  // 🔥 ADD SOCIAL
  const addSocial = () => {
    setForm({
      ...form,
      socials: [...form.socials, { platform: "", url: "" }],
    });
  };

  // 🔥 REMOVE SOCIAL
  const removeSocial = (index: number) => {
    const updated = form.socials.filter((_, i) => i !== index);
    setForm({ ...form, socials: updated });
  };



  const handleImageUpload = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error("Upload failed");
    }

    setForm((prev) => ({
      ...prev,
      profileImage: data.url,
    }));

    toast.success("Image uploaded");

  } catch (err) {
    toast.error("Upload failed");
  } finally {
    setLoading(false);
  }
};

  // 🔥 SUBMIT (UPDATED API)
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/auth/admin-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update");
      }

      toast.success("Profile updated successfully");
      router.push("/admin")
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 LOADING STATE
  if (loadingData) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your portfolio details
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* BASIC INFO */}
        <div className="grid gap-4">

          <div className="space-y-3">

  <label className="text-sm font-medium text-slate-700">
    Profile Image
  </label>

  <div className="flex items-center gap-4">

    {/* IMAGE PREVIEW */}
    <div className="relative w-20 h-20">

      {form.profileImage ? (
        <img
          src={form.profileImage}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
          No Image
        </div>
      )}

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
          <Loader2 className="h-5 w-5 text-white animate-spin" />
        </div>
      )}
    </div>

    {/* BUTTON */}
    <div>
      <input
        type="file"
        accept="image/*"
        id="upload"
        onChange={handleImageUpload}
        className="hidden"
      />

      <label
        htmlFor="upload"
        className="
          cursor-pointer px-4 py-2 
          bg-emerald-600 text-white 
          rounded-lg text-sm font-medium
          hover:bg-emerald-700 
          transition
        "
      >
        {loading ? "Uploading..." : "Change Image"}
      </label>

      <p className="text-xs text-gray-400 mt-1">
        JPG, PNG, WEBP (max 5MB)
      </p>
    </div>

  </div>
</div>

          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">About</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500"
              rows={4}
            />
          </div>

        </div>

        {/* SOCIALS */}
        <div>
          <h3 className="font-semibold mb-4">Social Links</h3>

          <div className="space-y-4">
            {form.socials?.map((social, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-gray-50 space-y-3"
              >
                <select
                  value={social.platform}
                  onChange={(e) =>
                    handleSocialChange(index, "platform", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select platform</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>

                <input
                  value={social.url.replace(/^(mailto:|tel:|https:\/\/wa\.me\/)/, "")}
                  onChange={(e) =>
                    handleSocialChange(index, "url", e.target.value)
                  }
                  placeholder="Enter value"
                  className="w-full p-2 border rounded-lg"
                />

                <p className="text-xs text-gray-400">{social.url}</p>

                <button
                  onClick={() => removeSocial(index)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <Button onClick={addSocial} className="mt-4">
            + Add Social
          </Button>
        </div>

        {/* SUBMIT */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          Save Changes
        </Button>

      </CardContent>
    </Card>
  );
}