import { RequestParams } from '@/types/request';

// SERVICE
import { CustomService } from '../index';

export default async function dynamicService(params: RequestParams) {
  if (params.loading) {
     // dispatch loading
  }

  const response = await CustomService.customServiceMethod(
    params,
    (response: unknown) => {
      if (params.customSuccessMessage) {
        // dispatch custom success message
      }
      return response;
    },
    (e: unknown) => {
      console.log(e, 'ERROR');
      // dispatch error message
    },
    () => {
      if (params.loading) {
        // dispatch loading false
      }
    }
  );
  return response;
}
