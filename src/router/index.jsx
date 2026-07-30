import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@layouts/AppLayout';
import { AuthLayout } from '@layouts/AuthLayout';
import { DashboardPage } from '@features/dashboard/pages/DashboardPage';
import { ROUTES } from '@constants/routes';

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<AuthLayout><div>Login Page</div></AuthLayout>} />
      <Route path={ROUTES.DASHBOARD} element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path={ROUTES.PRODUCTS.replace('/', '')} element={<div>Products Page</div>} />
        <Route path={ROUTES.ORDERS.replace('/', '')} element={<div>Orders Page</div>} />
        <Route path={ROUTES.CUSTOMERS.replace('/', '')} element={<div>Customers Page</div>} />
        <Route path={ROUTES.PAYMENTS.replace('/', '')} element={<div>Payments Page</div>} />
        <Route path={ROUTES.SHIPPING.replace('/', '')} element={<div>Shipping Page</div>} />
        <Route path={ROUTES.INVOICES.replace('/', '')} element={<div>Invoices Page</div>} />
        <Route path={ROUTES.REPORTS.replace('/', '')} element={<div>Reports Page</div>} />
        <Route path={ROUTES.MARKETING.replace('/', '')} element={<div>Marketing Page</div>} />
        <Route path={ROUTES.SETTINGS.replace('/', '')} element={<div>Settings Page</div>} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}
