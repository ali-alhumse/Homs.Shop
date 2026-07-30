export const ROLES = {
  OWNER: 'owner',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer',
};

export const ROLE_HIERARCHY = {
  [ROLES.OWNER]: 100,
  [ROLES.MANAGER]: 50,
  [ROLES.EMPLOYEE]: 20,
  [ROLES.CUSTOMER]: 10,
};

export function hasMinRole(userRole, minimumRole) {
  return (ROLE_HIERARCHY[userRole] || 0) >= (ROLE_HIERARCHY[minimumRole] || 0);
}
