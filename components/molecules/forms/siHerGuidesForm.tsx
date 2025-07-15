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
} from "@/components/atoms/animate-dialog";
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
import { ArrowRight, CircleArrowRight, LoaderCircleIcon } from "lucide-react";
import { SuccessDialog } from "../dialogs/SuccessDialog";
import Image from "next/image";
import { usePlausible } from "next-plausible";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    daoInterests: z
      .string()
      .min(1, "Please share your interests in joining our DAO"),
    interests: z.array(z.string()).min(1, "Select at least one interest"),
    customPronoun: z.string().optional(),
    personalValues: z.string().min(1, "Personal values are required"),
    digitalLink: z
      .string()
      .url("Please enter a valid URL")
      .min(1, "Digital link is required"),
  })
  .refine(
    (data) => {
      if (data.interests.includes("Other")) {
        return data.customPronoun && data.customPronoun.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify your pronouns when selecting 'Other'",
      path: ["customPronoun"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

export function SiHerGuidesForm({
  title,
  fill = false,
}: {
  title?: string;
  showGradient?: boolean;
  className?: string;
  fill?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      daoInterests: "",
      interests: [],
      customPronoun: "",
      personalValues: "",
      digitalLink: "",
    },
  });

  const plausible = usePlausible();

  useEffect(() => {
    if (open) {
      plausible("Form Opened", { props: { form: "Guides" } });
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      plausible("Form Closed", { props: { form: "Guides" } });
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open, plausible]);

  const interestOptions = ["She/Her/Hers", "They/Them/Theirs", "Other"];

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/email/guides`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: {
              name: data.name,
              email: data.email,
              daoInterests: data.daoInterests,
              interests: Array.isArray(data.interests)
                ? data.interests
                : [data.interests],
              customPronoun: data.customPronoun || "",
              personalValues: data.personalValues,
              digitalLink: data.digitalLink,
            },
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();

        toast.error(errorData.error?.message || "Something went wrong");

        throw new Error(errorData.error?.message || "Failed to submit inquiry");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Inquiry submitted successfully!");
      form.reset();
      setOpen(false);
      setShowSuccess(true);
    },
  });

  const onSubmitHandler = (data: FormValues) => {
    plausible("Form Submitted", { props: { form: "Guides" } });
    mutation.mutate(data);
  };

  return (
    <div className="overflow-hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          asChild
          className="w-full"
          onClick={() =>
            plausible("Form Trigger Click", { props: { form: "Guides" } })
          }
        >
          {fill ? (
            <Button
              asChild
              size={"md"}
              className="mb-3 flex !h-[34px] w-fit items-center gap-4 border border-black bg-black !px-[0ox] !py-[6px] !pr-[5px] !pl-[24px] text-sm font-normal text-black max-lg:mx-auto"
            >
              <div className="flex items-center gap-4 text-white">
                <span>{title}</span>{" "}
                <div className="flex shrink-0 items-center justify-center">
                  <CircleArrowRight className="h-6 w-6 !shrink-0" />
                </div>
              </div>
            </Button>
          ) : (
            <Button
              asChild
              size={"md"}
              className="mb-3 flex h-[39px] w-fit items-center gap-4 border border-black bg-transparent !px-[18px] !py-[13px] text-sm font-normal text-black"
            >
              <div className="flex items-center gap-2">
                <span>{title}</span> <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="mx-auto w-full overflow-y-scroll px-4 py-14 max-sm:fixed max-sm:top-[45%] max-sm:bottom-0 sm:max-w-[924px] sm:px-20">
          <DialogHeader className="mb-4 flex w-full gap-4">
            <div className="flex flex-row items-center gap-4 max-[400px]:flex-col">
              <Image
                src={"/onboard/siherguides.svg"}
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
                  name="daoInterests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Please share your interests in joining our DAO
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Web3 development, community building, content creation"
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
                {form.watch("interests").includes("Other") && (
                  <FormField
                    control={form.control}
                    name="customPronoun"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Please specify your pronouns{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Ze/Zir/Zirs, Xe/Xem/Xyr, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
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
                      {mutation.isPending
                        ? "Submitting..."
                        : "Submit Application"}
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
          title="Thank you for your application."
          description="A member of our team will be in touch soon!"
          ctaLink="/"
          ctaTitle="Get Back to Home Page"
        />
      )}
    </div>
  );
}
