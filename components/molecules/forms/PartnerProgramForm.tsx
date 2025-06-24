// components/PartnerProgramForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { ArrowRight, LoaderCircleIcon } from "lucide-react";
import { SuccessDialog } from "../dialogs/SuccessDialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  companyName: z.string().min(1, "Company name is required"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  details: z.string().optional(),
  newsletter: z.enum(["yes", "no"]),
});

type FormValues = z.infer<typeof formSchema>;

export function PartnerProgramForm({
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
      companyName: "",
      interests: [],
      details: "",
      newsletter: "yes",
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
    "Grow3dge Education and Growth 3.0 accelerator program (August-October 2025) ",
    "Community growth and education partnership ",
    "Diversity, Equity, Accessibility, and Inclusion training",
  ];

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mail/partners-program`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: {
              name: data.name,
              email: data.email,
              companyName: data.companyName,
              interests: Array.isArray(data.interests)
                ? data.interests.join(", ")
                : data.interests,
              details: data.details || "",
              newsletter: !!data.newsletter,
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
        <DialogTrigger asChild>
          <Button
            asChild
            size={"md"}
            className="mb-3 flex h-[39px] w-fit items-center gap-4 border border-black bg-transparent !px-[18px] !py-[13px] text-sm font-normal text-black"
          >
            <div className="flex items-center gap-2">
              <span>{title}</span> <ArrowRight className="h-4 w-4" />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="mx-auto w-full overflow-y-scroll px-4 py-14 max-sm:fixed max-sm:top-[45%] max-sm:bottom-0 sm:max-w-[924px] sm:px-20">
          <DialogHeader className="mb-4 flex w-full gap-4">
            <div className="flex flex-row items-center gap-4 max-[400px]:flex-col">
              <Image
                src={"/onboard/partneropportunity.svg"}
                alt="partneropportunity"
                width={64}
                height={64}
                className="h-28 w-28"
              />
              <div className="flex flex-col gap-0.5">
                <DialogTitle className="">
                  <Title
                    variant="sm"
                    as="span"
                    className="text-2xl leading-none font-normal text-black"
                  >
                    Partner Inquiry
                  </Title>
                </DialogTitle>
                <DialogDescription className="mx-auto w-full max-w-[517.453px] text-base leading-5 text-[#3D3D3D] sm:text-left">
                  Please share your interest(s) in ways to partner with{" "}
                  {"SI<3>"}, and a member of our team will reach out soon.
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
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your company email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Company Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
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
                        What are you interested in exploring?{" "}
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
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal">
                        What do you want us to know about your interest as a
                        partner?
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
                  name="newsletter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal">
                        Would you like to be added to our partner newsletter?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-x-5"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" />
                            <label htmlFor="yes">Yes</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <label htmlFor="no">No</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="mt-12 !flex w-full !items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {mutation.isPending && (
                        <LoaderCircleIcon
                          className="mr-2 animate-spin"
                          size={16}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span>
                      {mutation.isPending ? "Submitting..." : "Submit Inquiry"}
                    </span>
                  </div>
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
          title="Inquiry Submitted Successfully"
          description="Thank you for your partnership inquiry. A member of our team will be in touch soon!"
          ctaLink="/"
          ctaTitle="Get Back to Home Page"
        />
      )}
    </div>
  );
}
