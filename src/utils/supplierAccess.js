// RequestedRole records intent. Only granted selling capabilities unlock the Supplier workspace.
export const hasSupplierWorkspace = (user) => user?.role === 'Supplier' &&
  user?.capabilities?.canCreateShop === true;
