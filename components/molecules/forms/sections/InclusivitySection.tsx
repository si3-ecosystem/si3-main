import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { FormValues } from "@/validations/diversityTracker/schema";

type FormProps = {
  form: UseFormReturn<any, any, any>;
};

export function InclusivitySection({ form }: FormProps) {
  return (
    <div className="space-y-6 rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold">Inclusivity</h3>

      <FormField
        control={form.control}
        name="diversityInitiatives"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              Does this organization have any diversity initiatives (gender,
              global language, etc)?
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

      <FormField
        control={form.control}
        name="diverseTeam"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              Does this organization have a diverse team?
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

      <FormField
        control={form.control}
        name="underrepresentedLeadership"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              Are there people from underrepresented groups in the leadership
              team?
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

      <FormField
        control={form.control}
        name="highlightsUnderrepresented"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              Does this organization highlight people from underrepresented
              groups on their public social channels?
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
