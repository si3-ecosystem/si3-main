"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/atoms/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Checkbox } from "@/components/atoms/checkbox";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Title } from "@/components/atoms/title";
import { Textarea } from "@/components/atoms/textarea";
import { LoaderCircleIcon } from "lucide-react";
import { SuccessDialog } from "../dialogs/SuccessDialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  pronouns: z.string().min(1, "Pronouns are required"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  personalValues: z.string().min(1, "Personal values are required"),
  digitalLink: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Digital link is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function SiHerGuidesForm({
  title,
  showGradient = false,
  className,
}: {
  title?: string;
  showGradient?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      pronouns: "",
      interests: [],
      personalValues: "",
      digitalLink: "",
    },
  });

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  const interestOptions = [
    "She/Her/Hers",
    "He/Him/His",
    "They/Them/Theirs",
    "Ze/Hir/Hirs",
    "Other (please specify in personal values)",
  ];

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mail/guides`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: {
              name: data.name,
              email: data.email,
              pronouns: data.pronouns,
              interests: Array.isArray(data.interests)
                ? data.interests
                : [data.interests],
              personalValues: data.personalValues,
              digitalLink: data.digitalLink,
            },
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Inquiry submitted successfully!");
      form.reset();
      setOpen(false);
      setShowSuccess(true);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmitHandler = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="overflow-hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="w-full">
          <Button
            variant={"outline"}
            className={cn(
              "w-full max-w-[240px] text-white",
              showGradient && "border border-none",
              className,
            )}
            showGradient={showGradient}
          >
            {title}
          </Button>
        </DialogTrigger>
        <DialogContent className="mx-auto w-full overflow-y-scroll px-4 py-14 max-sm:fixed max-sm:top-[45%] max-sm:bottom-0 sm:max-w-[924px] sm:px-20">
          <DialogHeader className="mb-4 flex w-full gap-4">
            <div className="flex flex-row items-center gap-4 max-[400px]:flex-col">
              <Image
                src={"/onboard/siherguides.svg"}
                alt="partneropportunity"
                width={64}
                height={64}
                className="h-12 w-12"
              />
              <div className="flex flex-col gap-0.5">
                <DialogTitle className="">
                  <Title
                    variant="sm"
                    as="span"
                    className="text-2xl leading-none font-normal text-black"
                  >
                    Si Her Guides
                  </Title>
                </DialogTitle>
                <DialogDescription className="mx-auto w-full max-w-[517.453px] text-base leading-5 text-[#3D3D3D] sm:text-left">
                  Please complete our application form to join us a Si Her
                  Guide. Our team will review your application and respond via
                  email with any questions or next steps.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="space-y-4 md:space-y-10"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
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
                      <FormLabel className="text-base font-medium">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pronouns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Please share your pronouns{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., she/her/hers, they/them/theirs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-8">
                      <FormLabel htmlFor="" className="text-base font-medium">
                        How do you identify? (select all that apply){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <ul className="flex flex-col gap-2.5">
                        {interestOptions.map((option) => (
                          <FormControl key={option}>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value.includes(option)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, option])
                                    : field.onChange(
                                        field.value.filter(
                                          (value) => value !== option,
                                        ),
                                      );
                                }}
                              />
                              <label className="text-base" htmlFor={option}>
                                {option}
                              </label>
                            </div>
                          </FormControl>
                        ))}
                      </ul>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalValues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Please share your personal values{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write details here"
                          className="h-32 resize-none p-4 lg:h-56"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="digitalLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Please share a digital link that identifies you
                        (LinkedIn, X, website, etc.)
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://" type="url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  showGradient
                  className="mt-12 w-full"
                >
                  {mutation.isPending && (
                    <LoaderCircleIcon
                      className="mr-2 animate-spin"
                      size={16}
                      aria-hidden="true"
                    />
                  )}
                  {mutation.isPending ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      {showSuccess && (
        <SuccessDialog
          open={showSuccess}
          onOpenChange={setShowSuccess}
          imageSrc="/icons/jpg/successGreen.jpg"
          title="Thank you for your application."
          description="A member of our team will be in touch soon!"
          ctaLink="/"
          ctaTitle="Get Back to Home Page"
        />
      )}
    </div>
  );
}
