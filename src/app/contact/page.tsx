"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactInput = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    // No backend endpoint for contact messages currently — simulate submission client-side.
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Message sent! We'll get back to you soon.");
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-semibold">
        Contact Us
      </h1>
      <p className="mb-12 max-w-xl text-lg text-muted-foreground">
        Have a question or need help with a booking? Reach out and we&apos;ll get back to you.
      </p>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can we help?" rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">support@fixitnow.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">+880 1700-000000</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-sm text-muted-foreground">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}