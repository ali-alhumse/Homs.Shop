import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@modules/auth/hooks/useAuth';
import { authValidator } from '@features/auth/validators/authValidator';
import { AppButton } from '@shared/components/AppButton';
import { AppInput } from '@shared/components/AppInput';
import { PageLoader } from '@shared/components/PageLoader';
import { showToast } from '@shared/components/AppToast';
import { ROUTES } from '@constants/routes';
import { cn } from '@shared/utils/cn';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
};

export function RegisterPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { register, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, location]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    return strength;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { valid, errors: validationErrors } = authValidator.validateRegister(formData);
    setErrors(validationErrors);
    if (!valid) return;

    setIsSubmitting(true);

    const result = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });

    if (result.success) {
      const needsEmailConfirmation = !result.data?.session;
      if (needsEmailConfirmation) {
        showToast('success', 'Account created! Please check your email to verify your account.');
        navigate(ROUTES.LOGIN, { replace: true });
      } else {
        showToast('success', 'Account created successfully!');
        navigate(ROUTES.DASHBOARD, { replace: true });
      }
    } else {
      showToast('error', result.error?.message || 'Registration failed. Please try again.');
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return <PageLoader message="Setting up account..." />;
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-yellow-500';
    if (passwordStrength < 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                <span className="text-xl font-bold text-white">HS</span>
              </div>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-sm text-gray-600">Join Homs Shop and start managing your business</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <AppInput
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={handleChange('firstName')}
                error={errors.firstName}
                placeholder="John"
                required
              />

              <AppInput
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={handleChange('lastName')}
                error={errors.lastName}
                placeholder="Doe"
                required
              />
            </div>

            <AppInput
              label="Email address"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
              placeholder="you@example.com"
              required
            />

            <div className="space-y-2">
              <AppInput
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                placeholder="Create a password"
                required
              />
              <div className="rounded-full bg-gray-100 px-3 py-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-gray-600">Password Strength:</span>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      passwordStrength < 25
                        ? 'text-red-600'
                        : passwordStrength < 50
                          ? 'text-yellow-600'
                          : passwordStrength < 75
                            ? 'text-blue-600'
                            : 'text-green-600'
                    )}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={cn('h-2 rounded-full transition-all', getPasswordStrengthColor())}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Use at least 8 characters, a mix of letters and numbers
                </div>
              </div>
            </div>

            <AppInput
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              required
            />

            <div className="flex items-start">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange('agreeTerms')}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}

            <AppButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </AppButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
