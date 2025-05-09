
import { ApiTester } from "@/components/api-tester/ApiTester";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const ApiTesterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="font-bold text-xl">Brand Bot Nexus</Link>
          </div>
          <div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-1">
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
      </div>

      {/* Simple footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">&copy; 2025 Brand Bot Nexus</p>
            </div>
            <div>
              <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm">Back to Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ApiTesterPage;
