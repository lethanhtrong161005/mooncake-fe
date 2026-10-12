/**
 * User Roles & Status Constants
 */

export const USER_ROLES = {
  CUSTOMER: 'Customer',
  SUPPLIER: 'Supplier',
  ADMIN: 'Admin',
};

export const ORDER_STATUS = {
  PENDING: 'Pending',
  RFQ_OPEN: 'RfqOpen',
  CONTRACT_SIGNED: 'ContractSigned',
  IN_PRODUCTION: 'InProduction',
  DELIVERING: 'Delivering',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const ESCROW_STATUS = {
  NOT_FUNDED: 'NotFunded',
  HELD: 'Held',
  RELEASED: 'Released',
  REFUNDED: 'Refunded',
};

export default {
  USER_ROLES,
  ORDER_STATUS,
  ESCROW_STATUS,
};
