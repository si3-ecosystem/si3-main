import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Textarea } from "@/components/atoms/textarea";
import { Slider } from "@/components/atoms/slider";
import { CheckboxField, RadioField, SelectField } from "../FormFields";
import { cn } from "@/lib/utils";

// Define the options arrays
const selfIdentityOptions = [
  "Man",
  "Woman",
  "Non-binary",
  "Prefer to self-describe",
  "Prefer not to say",
];

const ageRangeOptions = [
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+",
  "Prefer not to say",
];

const ethnicityOptions = [
  "Asian",
  "Black/African",
  "Hispanic/Latino",
  "Middle Eastern",
  "Native American",
  "Pacific Islander",
  "White/Caucasian",
  "Mixed/Multiple ethnic groups",
  "Other",
  "Prefer not to say",
];

const disabilityOptions = [
  "Visual impairment",
  "Hearing impairment",
  "Mobility impairment",
  "Cognitive disability",
  "Chronic illness",
  "Other",
  "None",
  "Prefer not to say",
];

const sexualOrientationOptions = [
  "Heterosexual/Straight",
  "Gay/Lesbian",
  "Bisexual",
  "Pansexual",
  "Asexual",
  "Other",
  "Prefer not to say",
];

type FormProps = {
  form: UseFormReturn<any, any, any>;
};

export function PersonalInformationSection({ form }: FormProps) {
  return (
    <div className="space-y-6">
      <RadioField
        form={form}
        badge
        name="selfIdentity"
        label="Which of the following gender categories best describes how you self-identify?"
        options={selfIdentityOptions}
      />
      <RadioField
        form={form}
        name="ageRange"
        label="What is your age range?"
        options={ageRangeOptions}
      />
      <CheckboxField
        form={form}
        name="ethnicity"
        label="Which of the following ethnic or racial categories best describes how you self-identify? (Select all that apply)"
        options={ethnicityOptions}
      />
      <CheckboxField
        form={form}
        name="disability"
        label="Do you have any of the following disabilities or chronic conditions? (Select all that apply)"
        options={disabilityOptions}
      />
      <SelectField
        form={form}
        name="sexualOrientation"
        label="Which of the following best describes your sexual orientation?"
        options={sexualOrientationOptions}
        placeholder="Select orientation"
      />
      <FormField
        control={form.control}
        name="equityScale"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              On a scale from 1 to 10, how inclusive and equitable do you feel
              the Web3 industry is?
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
                <div
                  className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-gray-500"
                  aria-hidden="true"
                >
                  {[...Array(11)].map((_, i) => (
                    <span
                      key={i}
                      className="flex w-0 flex-col items-center justify-center gap-2"
                    >
                      <span className={cn("h-1 w-px bg-gray-500")} />
                      <span className={cn()}>{i}</span>
                    </span>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="improvementSuggestions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              Please share your thoughts on how the Web3 industry can improve on
              the topics of Diversity, Equity, Accessibility, and Inclusion.
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Please share suggestions here"
                className="h-32 resize-none p-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <RadioField
        form={form}
        name="activeGrantsParticipated"
        label="Are you currently participating in any of these active grant rounds?"
        options={["yes", "no"]}
      />
    </div>
  );
}
