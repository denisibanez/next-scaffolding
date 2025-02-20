import type { Preview } from '@storybook/react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import themeConfig from '../src/theme/themeConfig';
import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <AntdRegistry>
        <ConfigProvider theme={themeConfig}>
          {' '}
          <Story />
        </ConfigProvider>
      </AntdRegistry>
    ),
  ],
};

export default preview;
