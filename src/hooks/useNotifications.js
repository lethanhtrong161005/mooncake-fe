import { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/notificationService';
import { signalRManager } from '../services/signalrService';
import { playLuxuryChime } from '../utils/audioUtils';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await notificationService.getNotifications({ category: selectedCategory });
      if (data) {
        setNotifications(data.items || []);
        setUnreadCount(data.unreadCount ?? 0);
      }
    } catch (err) {
      console.warn('Failed to fetch notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const handleReceive = (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
      playLuxuryChime();
    };

    const handleCountUpdate = ({ unreadCount: count }) => {
      setUnreadCount(count);
    };

    const handleMarkedRead = ({ ids, unreadCount: count }) => {
      setNotifications((prev) =>
        prev.map((n) => (ids.includes(n.id) ? { ...n, isRead: true } : n))
      );
      if (typeof count === 'number') {
        setUnreadCount(count);
      }
    };

    const handleAllRead = ({ unreadCount: count = 0 }) => {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(count);
    };

    signalRManager.on('ReceiveNotification', handleReceive);
    signalRManager.on('UnreadCountUpdated', handleCountUpdate);
    signalRManager.on('NotificationsMarkedAsRead', handleMarkedRead);
    signalRManager.on('AllNotificationsRead', handleAllRead);

    signalRManager.startConnection();

    return () => {
      signalRManager.off('ReceiveNotification', handleReceive);
      signalRManager.off('UnreadCountUpdated', handleCountUpdate);
      signalRManager.off('NotificationsMarkedAsRead', handleMarkedRead);
      signalRManager.off('AllNotificationsRead', handleAllRead);
    };
  }, []);

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.warn('Failed to mark read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead(selectedCategory);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.warn('Failed to mark all read:', err);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications,
  };
};

export default useNotifications;

