import request from '@/services/plugins/request';

import { RequestParams, Request } from '@/types/request';

export class CustomService {
  static customServiceMethod(
    params: RequestParams,
    success: (res: unknown) => unknown,
    error: (e: unknown) => unknown,
    done = () => {}
  ) {
    const req: Request = {
      method: params.type,
      url: `${process.env.NEXT_PUBLIC_API_URL}${params.url}`,
    };
    if (params.payload) {
      req.body = params.payload;
    }

    if (params.headers) {
      req.headers = params.headers;
    }
    return request(req, success, error, done);
  }
}
