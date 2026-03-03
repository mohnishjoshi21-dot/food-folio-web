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
import { Separator } from "@/components/ui/separator";

import { Loader2, Settings } from "lucide-react";

export default function Setting() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword:"",
    newPassword:"",
    confirmPassword:""
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  const updatePassword = async () => {

    if(form.newPassword !== form.confirmPassword){
      alert("Passwords do not match");
      return;
    }

    try{

      setLoading(true);

      await axios.patch("/api/admin/change-password",form);

      alert("Password updated successfully");

      setForm({
        currentPassword:"",
        newPassword:"",
        confirmPassword:""
      });

    }
    catch(error){

      console.log(error);
      alert("Failed to update password");

    }
    finally{

      setLoading(false);

    }

  };


  return (

    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">

      {/* Header */}

      <div className="flex items-center gap-2">

        <Settings className="h-6 w-6"/>

        <h1 className="text-2xl font-bold">
          Settings
        </h1>

      </div>

      <Separator/>

      {/* Change Password */}

      <Card>

        <CardHeader>

          <CardTitle>
            Change Password
          </CardTitle>

          <CardDescription>
            Update your admin account password
          </CardDescription>

        </CardHeader>


        <CardContent className="space-y-4">

          {/* Current Password */}

          <div className="space-y-2">

            <Label>
              Current Password
            </Label>

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

            <Label>
              New Password
            </Label>

            <Input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />

          </div>


          {/* Confirm Password */}

          <div className="space-y-2">

            <Label>
              Confirm Password
            </Label>

            <Input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />

          </div>


          {/* Button */}

          <Button
            onClick={updatePassword}
            disabled={loading}
            className="w-full gap-2"
          >

            {loading && (
              <Loader2 className="h-4 w-4 animate-spin"/>
            )}

            Update Password

          </Button>


        </CardContent>

      </Card>

    </div>

  );
}