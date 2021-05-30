import { useContext } from 'react';

import NotificationContext from '../../store/notification.context';

function Notification({ title, message, status }) {
  const { hideNotification } = useContext(NotificationContext);

  const activeClasses = `notification ${status}`;

  return (
    <div onClick={hideNotification} className={activeClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
