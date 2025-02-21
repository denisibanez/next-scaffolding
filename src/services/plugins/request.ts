import axiosApiInstance from '@/services/interceptor';

import { Request } from '@/types/request';
import { AxiosRequestConfig } from 'axios';

const request = async (
  { method, url, body, headers }: Request,
  success: (res: unknown) => unknown,
  error: (e: unknown) => unknown,
  done = () => {}
) => {
  try {
    const res = await axiosApiInstance[method](
      url,
      body as AxiosRequestConfig,
      { headers } as AxiosRequestConfig
    );
    return await success(res);
  } catch (e) {
    return await error(e);
  } finally {
    done();
  }
};

export default request;
