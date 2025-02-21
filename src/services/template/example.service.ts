import request from '@/services/plugins/request';
import { Request } from '@/types/request';

export class ExampleService {
  static getExample(
    success: (res: unknown) => unknown,
    error: (e: unknown) => unknown,
    done = () => {}
  ) {
    const req: Request = {
      method: 'get',
      url: `${process.env.VITE__BASE_PATH_EXAMPLE}/`,
    };
    return request(req, success, error, done);
  }
}
