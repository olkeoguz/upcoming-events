import { useContext } from 'react';
import NotificationContext from '../../store/notification.context';
import Notification from '../UI/Notification';
import MainHeader from './MainHeader';

const Layout = ({ children }) => {
  const { activeNotification } = useContext(NotificationContext);

  return (
    <div className='min-h-screen bg-gray-200'>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </div>
  );
};

export default Layout;
