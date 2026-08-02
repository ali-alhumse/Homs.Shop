import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Receipt,
  Settings,
  BarChart3,
  CreditCard,
  Truck,
  Tags,
} from 'lucide-react';
import { cn } from '@shared/utils/cn';
import { ROUTES, ROUTE_LABELS } from '@constants/routes';
import { PERMISSIONS } from '@constants/permissions';
import { usePermissionContext } from '@modules/permission/providers/PermissionProvider';

const navItems = [
  { to: ROUTES.DASHBOARD, icon: LayoutDashboard, permission: PERMISSIONS.DASHBOARD_ACCESS },
  { to: ROUTES.PRODUCTS, icon: Package },
  { to: ROUTES.ORDERS, icon: ShoppingCart },
  { to: ROUTES.CUSTOMERS, icon: Users },
  { to: ROUTES.PAYMENTS, icon: CreditCard },
  { to: ROUTES.SHIPPING, icon: Truck },
  { to: ROUTES.INVOICES, icon: Receipt },
  { to: ROUTES.REPORTS, icon: BarChart3, permission: PERMISSIONS.DASHBOARD_ACCESS },
  { to: ROUTES.MARKETING, icon: Tags },
  { to: ROUTES.SETTINGS, icon: Settings, permission: PERMISSIONS.DASHBOARD_ACCESS },
];

export function Sidebar() {
  const { can, loading: permissionsLoading } = usePermissionContext();

  const visibleItems = permissionsLoading
    ? navItems
    : navItems.filter((item) => !item.permission || can(item.permission));

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
          H
        </div>
        <span className="text-lg font-semibold text-gray-900">Homs Shop</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              cn('sidebar-link', isActive && 'active')
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{ROUTE_LABELS[item.to]}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
