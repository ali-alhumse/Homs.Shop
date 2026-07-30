import { createContext, useContext, useState, useEffect } from 'react';
import { permissionService } from '../services/permissionService';
import { useAuthContext } from '@modules/auth/providers/AuthProvider';

const PermissionContext = createContext(null);

export function PermissionProvider({ children }) {
  const { user } = useAuthContext();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) {
        setPermissions([]);
        setLoading(false);
        return;
      }
      const result = await permissionService.getUserPermissions(user.id);
      if (result.success) {
        setPermissions(result.data);
      }
      setLoading(false);
    }
    load();
  }, [user]);

  function can(required) {
    return permissionService.can(permissions, required);
  }

  function canAny(requiredList) {
    return permissionService.canAny(permissions, requiredList);
  }

  return (
    <PermissionContext.Provider value={{ permissions, loading, can, canAny }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionContext() {
  const ctx = useContext(PermissionContext);
  if (!ctx) throw new Error('usePermissionContext must be used within PermissionProvider');
  return ctx;
}
