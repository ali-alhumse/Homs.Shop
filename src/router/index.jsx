import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@layouts/AppLayout';
import { AdminLayout } from '@layouts/AdminLayout';
import { AuthLayout } from '@layouts/AuthLayout';
import { ProtectedRoute } from '@shared/components/ProtectedRoute';
import { PageLoader } from '@shared/components/PageLoader';
import { ROUTES } from '@constants/routes';
import { PERMISSIONS } from '@constants/permissions';

const DashboardPage = lazy(() =>
  import('@features/dashboard/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  }))
);

const publicFeatureRoutes = [
  { path: ROUTES.PRODUCTS, label: 'Products' },
  { path: ROUTES.ORDERS, label: 'Orders' },
  { path: ROUTES.CUSTOMERS, label: 'Customers' },
  { path: ROUTES.PAYMENTS, label: 'Payments' },
  { path: ROUTES.SHIPPING, label: 'Shipping' },
  { path: ROUTES.INVOICES, label: 'Invoices' },
  { path: ROUTES.MARKETING, label: 'Marketing' },
];

const adminRoutes = [
  { path: ROUTES.REPORTS, label: 'Reports' },
  { path: ROUTES.SETTINGS, label: 'Settings' },
];

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader message="Loading page..." />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<AuthLayout><div>Login Page</div></AuthLayout>} />

        {/* كل مستخدم مسجل */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {publicFeatureRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path.slice(1)}
                element={<div>{route.label} Page</div>}
              />
            ))}
          </Route>
        </Route>

        {/* لوحة الإدارة — تتطلب dashboard.access */}
        <Route
          element={
            <ProtectedRoute
              requiredPermission={PERMISSIONS.DASHBOARD_ACCESS}
              fallbackPath={ROUTES.PRODUCTS}
            />
          }
        >
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path.slice(1)}
                element={<div>{route.label} Page</div>}
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  );
}
