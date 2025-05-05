
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Loader2, UserCheck } from 'lucide-react';
import { api } from '@/lib/api';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoggingIn, setIsDemoLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate('/'); // Redirect to dashboard after successful login
    } catch (error) {
      // Error is handled in the AuthContext
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setIsDemoLoggingIn(true);
    
    try {
      // Use demo admin credentials
      await login('admin@example.com', 'admin123');
      navigate('/'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      setIsDemoLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </form>

        {/* Demo Admin Login Button */}
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full border-dashed" 
            onClick={handleDemoAdminLogin}
            disabled={isDemoLoggingIn}
          >
            {isDemoLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Accessing Admin...
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Demo Admin Login
              </>
            )}
          </Button>
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Click to instantly access the dashboard as an admin user for testing
          </p>
        </div>

        <div className="mt-6 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/sign-up" className="font-medium text-primary hover:underline">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
