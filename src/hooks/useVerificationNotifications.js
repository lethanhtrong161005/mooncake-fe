import { useContext } from 'react';
import { VerificationNotificationContext } from '../context/verificationNotificationStore';
export const useVerificationNotifications = () => useContext(VerificationNotificationContext);
