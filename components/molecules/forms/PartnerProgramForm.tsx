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
import { LoaderCircleIcon } from "lucide-react";
import { SuccessDialog } from "../dialogs/SuccessDialog";
import { cn } from "@/lib/utils";

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
      newsletter: "no",
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
    "Educational workshops",
    "Community growth campaign",
    "DEI & Inclusion training",
    "Grants & Financial Inclusion",
    "Custom Partnership",
  ];

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch("/api/partnerProgram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
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
            variant={"outline"}
            className={cn(
              "w-full",
              className,
              showGradient && "border border-none",
            )}
            showGradient={showGradient}
          >
            {title || "Inquire Now"}
          </Button>
        </DialogTrigger>
        <DialogContent className="mx-auto w-full overflow-y-scroll px-4 py-14 sm:max-w-[924px] sm:px-20">
          <DialogHeader className="flex w-full flex-col items-center justify-center gap-4">
            <DialogTitle className="">
              <Title
                variant="sm"
                as="span"
                className="text-2xl leading-none font-normal text-black"
              >
                Partner Programs
              </Title>
            </DialogTitle>
            <DialogDescription className="mx-auto w-full max-w-[517.453px] text-center text-base leading-5 text-[#3D3D3D]">
              Share your interest below and a team member will respond soon.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="space-y-10"
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
                        <Input placeholder="John Doe" {...field} />
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
                        <Input placeholder="johndoe@gmail.com" {...field} />
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
                        <Input placeholder="Enter company name" {...field} />
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
                        What are you interested in exploring? (select all that
                        apply) <span className="text-red-500">*</span>
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
                        Would you like to be added to our partner newsletter? *
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
          title="Inquiry Submitted Successfully"
          description="Thank you for your partnership inquiry. A member of our team will be in touch soon!"
          ctaLink="/"
          ctaTitle="Get Back to Home Page"
        />
      )}
    </div>
  );
}
