"use client";

import { useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errorHandler";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassword = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/admin/auth/changePassword", form);

      toast.success("Password updated successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-emerald-600" />
          <CardTitle>Change Password</CardTitle>
        </div>

        <CardDescription>
          Update your account password to keep your account secure
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Current Password */}
        <div className="space-y-2">
          <Label>Current Password</Label>
          <Input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
          />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label>New Password</Label>
          <Input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          {/* Hint */}
          <p className="text-xs text-gray-400">
            Minimum 6 characters required
          </p>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
          />
        </div>

        {/* Button */}
        <Button
          onClick={updatePassword}
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Update Password
        </Button>

      </CardContent>
    </Card>
  );
};

export default ChangePassword;