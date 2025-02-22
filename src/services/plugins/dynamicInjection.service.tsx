import { RequestParams } from '../../types/request';

// SERVICE
import { CustomService } from '../index';

export default async function DynamicService(params: RequestParams) {
  const response = await CustomService.customServiceMethod(
    params,
    (response: unknown) => {
      return response;
    },
    (e: unknown) => {
      console.log(e, 'ERROR');
      return e;
    },
    () => {}
  );
  return response;
}
