import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PageLoader } from '@shared/components/PageLoader';
import { useAuthContext } from '@modules/auth/providers/AuthProvider';
import { usePermissionContext } from '@modules/permission/providers/PermissionProvider';
import { ROUTES } from '@constants/routes';

export function ProtectedRoute({
  allowedRoles,
  requiredPermission,
  fallbackPath = ROUTES.DASHBOARD,
}) {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useAuthContext();
  const { can, loading: permissionsLoading } = usePermissionContext();

  if (loading) {
    return <PageLoader message="Checking your session..." />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  }

  const role = user?.app_metadata?.role || user?.user_metadata?.role || null;

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (requiredPermission) {
    if (permissionsLoading) {
      return <PageLoader message="Checking your permissions..." />;
    }
    if (!can(requiredPermission)) {
      return <Navigate to={fallbackPath} replace />;
    }
  }

  return <Outlet />;
}
