import React from 'react';
import { useEffect } from 'react';
import { notification } from 'antd';

import { useNotificationStore } from '@/store/notification/notification.store';

import { NotificationType } from '@/types/notification';

enum NotificationTypes {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export default function NotificationComponent() {
  const [api, contextHolder] = notification.useNotification();
  const { notificationState } = useNotificationStore();

  useEffect(() => {
    const { model, message, type, description } = notificationState;

    const openNotificationWithIcon = (kind: NotificationType) => {
      api[kind]({
        message,
        description,
      });
    };

    if (model) {
      let localType: NotificationType = 'info';
      localType =
        NotificationTypes[type as keyof typeof NotificationTypes] || 'info';
      openNotificationWithIcon(localType);
    }
  }, [notificationState, api]);

  return <>{contextHolder}</>;
}
