import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState(); // {title,message,status}

  const showNotificationHandler = (notificationData = {}) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  return (
    <NotificationContext.Provider
      value={{
        activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
