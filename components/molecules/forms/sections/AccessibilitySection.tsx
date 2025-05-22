import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Textarea } from "@/components/atoms/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { FormValues } from "@/validations/diversityTracker/schema";

type FormProps = {
  form: UseFormReturn<FormValues, object, undefined | FormValues>;
};

export function AccessibilitySection({ form }: FormProps) {
  return (
    <div className="space-y-6 rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold">Accessibility</h3>

      <FormField
        control={form.control}
        name="offeringClear"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              Do you find the organization&apos;s offering to be clear and
              understandable?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="claritySuggestions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              What suggestions do you have to make this more clear?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Your suggestions..."
                className="h-32 resize-none p-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="engagementChannels"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              Are there open and secure channels to engage with the organization
              with questions?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={
                  typeof field.value === "string"
                    ? field.value
                    : Array.isArray(field.value)
                      ? field.value[0]
                      : undefined
                }
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-y-0 space-x-3">
                  <FormControl>
                    <RadioGroupItem value="unsure" />
                  </FormControl>
                  <FormLabel className="font-normal">Not sure</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
