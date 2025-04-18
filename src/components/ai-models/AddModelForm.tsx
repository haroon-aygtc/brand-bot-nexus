
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "lucide-react";

interface AddModelFormValues {
  name: string;
  apiKey: string;
  description: string;
  baseUrl: string;
  modelId: string;
}

export const AddModelForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddModelFormValues>({
    defaultValues: {
      name: "",
      apiKey: "",
      description: "",
      baseUrl: "",
      modelId: "",
    },
  });

  const onSubmit = async (data: AddModelFormValues) => {
    setIsSubmitting(true);
    // Here you would typically make an API call to save the model
    console.log("Submitting model:", data);
    setTimeout(() => setIsSubmitting(false), 1000); // Simulate API call
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., GPT-4 Custom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter API key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="modelId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., gpt-4-turbo-preview" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="baseUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., https://api.openai.com/v1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the model's capabilities" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding...
            </span>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Model
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
