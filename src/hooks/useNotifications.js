import { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/notificationService';
import { signalRManager } from '../services/signalrService';
import { playLuxuryChime } from '../utils/audioUtils';
import { useAuth } from './useAuth';
import storage from '../utils/storage';

export const useNotifications = () => {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const canFetch = Boolean(isLoggedIn && storage.get('auth_token'));

  const fetchNotifications = useCallback(async () => {
    if (!canFetch) {
      return;
    }
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
  }, [canFetch, selectedCategory]);

  useEffect(() => {
    if (!canFetch) return undefined;
    let cancelled = false;
    notificationService
      .getNotifications({ category: selectedCategory })
      .then((data) => {
        if (!cancelled && data) {
          setNotifications(data.items || []);
          setUnreadCount(data.unreadCount ?? 0);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('Failed to fetch notifications:', err);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [canFetch, selectedCategory]);

  useEffect(() => {
    if (!canFetch) {
      signalRManager.stopConnection();
      return undefined;
    }

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
  }, [canFetch]);

  const markAsRead = async (id) => {
    if (!canFetch) return;
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
    if (!canFetch) return;
    try {
      await notificationService.markAllAsRead(selectedCategory);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.warn('Failed to mark all read:', err);
    }
  };

  return {
    notifications: canFetch ? notifications : [],
    unreadCount: canFetch ? unreadCount : 0,
    isLoading: canFetch ? isLoading : false,
    selectedCategory,
    setSelectedCategory,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications,
  };
};

export default useNotifications;
