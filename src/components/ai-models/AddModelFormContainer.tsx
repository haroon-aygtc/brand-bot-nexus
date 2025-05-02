
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddModelForm } from '@/components/ai-models/AddModelForm';

export const AddModelFormContainer = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New AI Model</CardTitle>
      </CardHeader>
      <CardContent>
        <AddModelForm />
      </CardContent>
    </Card>
  );
};
