"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ImageUpload } from "./admin-image-upload";
import { dbDoctorAction } from "@/app/admin/doctors/actions";

interface Props {
  mode: "create" | "edit";
  doctor?: {
    id: string;
    slug: string;
    name: string;
    role: string;
    credentials: string;
    specialties: string;
    bio: string;
    fullBio: string;
    education: string;
    treatments: string;
    approach: string;
    image: string | null;
    experience: string;
    published: boolean;
    order: number;
  };
}

export function DoctorForm({ mode, doctor }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    slug: doctor?.slug || "",
    name: doctor?.name || "",
    role: doctor?.role || "",
    credentials: doctor?.credentials || "",
    specialties: doctor?.specialties || "",
    bio: doctor?.bio || "",
    fullBio: doctor?.fullBio || "",
    education: doctor?.education || "",
    treatments: doctor?.treatments || "",
    approach: doctor?.approach || "",
    image: doctor?.image || "",
    experience: doctor?.experience || "",
    published: doctor?.published ?? true,
    order: doctor?.order ?? 0,
  });

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await dbDoctorAction(doctor?.id || "", mode === "create" ? "create" : "update", form);
      if (!res.ok) { toast.error(res.error || "Failed"); return; }
      toast.success(mode === "create" ? "Doctor created" : "Doctor updated");
      router.push("/admin/doctors");
      router.refresh();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Chief Dermatologist" />
          </div>
          <div>
            <Label htmlFor="credentials">Credentials</Label>
            <Input id="credentials" value={form.credentials} onChange={(e) => set("credentials", e.target.value)} placeholder="e.g. MD, FAAD" />
          </div>
          <div>
            <Label htmlFor="experience">Experience</Label>
            <Input id="experience" value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="e.g. 15 years" />
          </div>
          <div>
            <Label htmlFor="specialties">Specialties (JSON array)</Label>
            <Input id="specialties" value={form.specialties} onChange={(e) => set("specialties", e.target.value)} placeholder='["Cosmetic Dermatology","Medical Dermatology"]' />
          </div>
          <div>
            <Label htmlFor="treatments">Treatments (JSON array)</Label>
            <Input id="treatments" value={form.treatments} onChange={(e) => set("treatments", e.target.value)} placeholder='["Botox","Laser Hair Removal"]' />
          </div>
          <div>
            <Label htmlFor="education">Education (JSON array)</Label>
            <Input id="education" value={form.education} onChange={(e) => set("education", e.target.value)} placeholder='["MD - Harvard"]' />
          </div>
          <div>
            <Label htmlFor="approach">Approach</Label>
            <Textarea id="approach" value={form.approach} onChange={(e) => set("approach", e.target.value)} rows={3} />
          </div>
          <div>
            <Label htmlFor="bio">Short Bio</Label>
            <Textarea id="bio" value={form.bio} onChange={(e) => set("bio", e.target.value)} rows={3} />
          </div>
          <div>
            <Label htmlFor="fullBio">Full Bio</Label>
            <Textarea id="fullBio" value={form.fullBio} onChange={(e) => set("fullBio", e.target.value)} rows={6} />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Profile Image</Label>
            <ImageUpload value={form.image} onChange={(url) => set("image", url)} label="Doctor photo" />
          </div>
          <div>
            <Label htmlFor="order">Display Order</Label>
            <Input id="order" type="number" value={form.order} onChange={(e) => set("order", parseInt(e.target.value) || 0)} />
          </div>
          <div className="flex items-center gap-2">
            <Switch id="published" checked={form.published} onCheckedChange={(v) => set("published", v)} />
            <Label htmlFor="published">Published</Label>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}