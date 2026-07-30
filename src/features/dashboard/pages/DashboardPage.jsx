import { AppCard } from '@shared/components/AppCard';
import { ShoppingCart, Users, Package, DollarSign } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$0.00', icon: DollarSign, color: 'text-green-600' },
  { label: 'Total Orders', value: '0', icon: ShoppingCart, color: 'text-blue-600' },
  { label: 'Total Products', value: '0', icon: Package, color: 'text-purple-600' },
  { label: 'Total Customers', value: '0', icon: Users, color: 'text-orange-600' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome to Homs Shop</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <AppCard key={stat.label}>
            <div className="flex items-center gap-4">
              <div className={`rounded-lg p-3 bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </AppCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AppCard>
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="mt-2 text-sm text-gray-500">No orders yet</p>
        </AppCard>
        <AppCard>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="mt-2 text-sm text-gray-500">No recent activity</p>
        </AppCard>
      </div>
    </div>
  );
}
