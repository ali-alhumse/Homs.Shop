import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@modules/auth/hooks/useAuth';
import { authValidator } from '@features/auth/validators/authValidator';
import { AppButton } from '@shared/components/AppButton';
import { AppInput } from '@shared/components/AppInput';
import { PageLoader } from '@shared/components/PageLoader';
import { showToast } from '@shared/components/AppToast';
import { ROUTES } from '@constants/routes';

const initialForm = { email: '', password: '' };

export function LoginPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading, error } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, location]);

  useEffect(() => {
    if (error) {
      showToast('error', error.message || 'Authentication failed');
    }
  }, [error]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { valid, errors: validationErrors } = authValidator.validateLogin(formData);
    setErrors(validationErrors);
    if (!valid) return;

    setIsSubmitting(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      showToast('success', 'Login successful');
    } else {
      showToast('error', result.error?.message || 'Login failed');
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return <PageLoader message="Checking authentication..." />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-xl font-bold text-white">HS</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to Homs Shop
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AppInput
              label="Email address"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
              placeholder="you@example.com"
              required
            />

            <AppInput
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              error={errors.password}
              placeholder="Enter your password"
              required
            />
          </div>

          <AppButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </AppButton>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                to={ROUTES.REGISTER}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
