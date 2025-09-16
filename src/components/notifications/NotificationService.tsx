import { useEffect } from "react";

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return false;
  }
  
  if (Notification.permission === "granted") {
    return true;
  }
  
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  
  return false;
};

// Show browser notification
export const showBrowserNotification = (title: string, options: NotificationOptions = {}) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }
  
  const defaultOptions: NotificationOptions = {
    icon: "/logo192.png",
    badge: "/logo192.png",
    ...options
  };
  
  new Notification(title, defaultOptions);
};

// Custom hook for notification management
export const useNotifications = () => {
  useEffect(() => {
    // Request permission when component mounts
    requestNotificationPermission();
  }, []);
  
  return {
    requestPermission: requestNotificationPermission,
    showNotification: showBrowserNotification
  };
};