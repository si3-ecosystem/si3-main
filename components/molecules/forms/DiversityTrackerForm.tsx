// components/DiversityTrackerForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/button";
import { Form } from "@/components/atoms/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { SuccessDialog } from "../dialogs/SuccessDialog";

import { AccessibilitySection } from "./sections/AccessibilitySection";
import { TransparencySection } from "./sections/TransparencySection";
import { InclusivitySection } from "./sections/InclusivitySection";
import { ImpactSection } from "./sections/ImpactSection";
import { PersonalInformationSection } from "./sections/PersonalInformationSection";

import {
  formSchema,
  type FormValues,
} from "@/validations/diversityTracker/schema";
import { transformFormData } from "@/utils/diversityTracker/formater";

export function DiversityTrackerForm({ onSuccess }: { onSuccess: () => void }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Personal Information
      selfIdentity: "",
      selfIdentityCustom: "",
      ageRange: "",
      ethnicity: "",
      disability: "",
      sexualOrientation: "",
      equityScale: 5,

      // Optional fields
      improvementSuggestions: "",
      grantProvider: "",
      grantRound: "",
      suggestions: "",
      activeGrantsParticipated: "no",

      // Accessibility
      offeringClear: "",
      claritySuggestions: "",
      engagementChannels: [],

      // Transparency
      decentralizedDecisionMaking: "",
      hasRoadmap: "",
      reportsFinancials: "",
      runsGrantPrograms: "",
      grantRoundParticipation: "",
      grantExperience: "",

      // Inclusivity
      diversityInitiatives: "",
      diverseTeam: "",
      underrepresentedLeadership: "",
      highlightsUnderrepresented: "",

      // Impact
      uniqueValue: "",
      marketImpact: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const transformedData = transformFormData(data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mail/diversity-tracker`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 5000);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit form");
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="space-y-6 rounded-lg p-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <PersonalInformationSection form={form} />
        </div>

        <div className="space-y-6 rounded-lg p-6">
          <AccessibilitySection form={form} />
        </div>

        <div className="space-y-6 rounded-lg p-6">
          <TransparencySection form={form} />
        </div>

        <div className="space-y-6 rounded-lg p-6">
          <InclusivitySection form={form} />
        </div>

        <div className="space-y-6 rounded-lg p-6">
          <ImpactSection form={form} />
        </div>

        <div className="w-full">
          <Button
            type="submit"
            loading={mutation.isPending}
            className="w-full"
            showGradient
          >
            {mutation.isPending && (
              <LoaderCircleIcon
                className="mr-2 animate-spin"
                size={16}
                aria-hidden="true"
              />
            )}
            {mutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      <SuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title="Thank you for your submission!"
        description="Your feedback has been recorded and will help us improve our diversity and inclusion efforts."
        imageSrc="/icons/jpg/success.jpg"
        ctaLink="/"
        ctaTitle="Go to Home"
      />
    </Form>
  );
}
