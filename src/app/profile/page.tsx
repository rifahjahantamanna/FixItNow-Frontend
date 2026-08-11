"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface ProfileFormData {
  name: string;
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<ProfileFormData>();

  useEffect(() => {
    if (user) reset({ name: user.name });
  }, [user, reset]);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      await api.put("/api/auth/me", data);
      await refreshUser();
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <main className="mx-auto max-w-lg px-4 py-16">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">My Profile</CardTitle>
              <Badge variant="secondary" className="mt-1">{user.role}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name</label>
              <Input {...register("name", { required: true, minLength: 2 })} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input value={user.email} disabled />
              <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed.</p>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}