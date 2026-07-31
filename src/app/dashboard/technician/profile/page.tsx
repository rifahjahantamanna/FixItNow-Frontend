"use client";

import { useForm } from "react-hook-form";
import { useMyTechnicianProfile, useUpdateProfile } from "@/lib/hooks/use-technician";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useEffect } from "react";

interface ProfileFormData {
  bio: string;
  skills: string;
  experience: number;
  hourlyRate: number;
}

export default function TechnicianProfilePage() {
  const { data: profile, isLoading } = useMyTechnicianProfile();
  const { mutate, isPending } = useUpdateProfile();

  const { register, handleSubmit, reset } = useForm<ProfileFormData>();

  useEffect(() => {
    if (profile) {
      reset({
        bio: profile.bio || "",
        skills: profile.skills.join(", "),
        experience: profile.experience,
        hourlyRate: Number(profile.hourlyRate),
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFormData) => {
    mutate(
      {
        bio: data.bio,
        skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
        experience: Number(data.experience),
        hourlyRate: Number(data.hourlyRate),
      },
      {
        onSuccess: () => toast.success("Profile updated!"),
        onError: (err: any) => toast.error(err.response?.data?.message || "Failed to update profile"),
      }
    );
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-lg px-4 py-12">
        <Skeleton className="h-64 w-full rounded-lg" />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Bio</label>
              <Textarea {...register("bio")} placeholder="Tell customers about yourself" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Skills (comma-separated)</label>
              <Input {...register("skills")} placeholder="plumbing, pipe fitting" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Years of Experience</label>
              <Input type="number" {...register("experience")} />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Hourly Rate (৳)</label>
              <Input type="number" {...register("hourlyRate")} />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}