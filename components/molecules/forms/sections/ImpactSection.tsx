import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Textarea } from "@/components/atoms/textarea";
import { FormValues } from "@/validations/diversityTracker/schema";

type FormProps = {
  form: UseFormReturn<any, any, any>;
};
export function ImpactSection({ form }: FormProps) {
  return (
    <div className="space-y-6 rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold">Impact</h3>

      <FormField
        control={form.control}
        name="uniqueValue"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              What unique value does this organization offer compared to other
              similar organizations in the market?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Share your thoughts..."
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
        name="marketImpact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">
              What impact do you believe this organization is creating in the
              market?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Share your thoughts..."
                className="h-32 resize-none p-4"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
