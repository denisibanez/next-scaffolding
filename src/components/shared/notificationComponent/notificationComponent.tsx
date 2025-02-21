import React from 'react';
import { useEffect } from 'react';
import {  notification } from 'antd';

import { useNotificationStore } from '@/store/notification/notification.store';

import { NotificationType } from '@/types/notification';

export default function NotificationComponent () {
  const [api, contextHolder] = notification.useNotification();
  const { notificationState } = useNotificationStore();

  useEffect(() => {
    const {
      model,
      message,
      type,
      description,
    } = notificationState;

    const openNotificationWithIcon = (kind: NotificationType) => {
      api[kind]({
        message,
        description
      });
    };

    if (model) {
      let localType: NotificationType = 'info';
      switch (type) {
        case 'success':
          localType = 'success';
          break;
        case 'info':
          localType = 'info';
          break;
        case 'warning':
          localType = 'warning';
          break;
        case 'error':
          localType = 'error';
          break;
      }
      openNotificationWithIcon(localType);
    }
  }, [notificationState, api]);

  return (
    <>
      {contextHolder}
    </>
  );
}