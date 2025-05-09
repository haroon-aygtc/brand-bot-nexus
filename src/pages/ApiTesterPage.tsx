
import { useState } from "react";
import { ApiTester } from "@/components/api-tester/ApiTester";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ApiTesterPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Tester</CardTitle>
          <CardDescription>
            Test all available API endpoints with a Postman-like interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApiTester />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiTesterPage;
