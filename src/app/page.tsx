
import HomeView from '@/app/views/home/page';

import dynamicService from '@/services/plugins/dynamicInjection.service';
import mountUrl from '@/utils/mountParams.utils';
import { RequestParams } from '@/types/request';

interface GetExampleResponse {
  name: string;
  url: string;
}

const getExample = async () => {
  const urlParams = {
    path: `/api/v2/pokemon`,
  };
  const requestParams: RequestParams = {
    type: 'get',
    url: mountUrl(urlParams),
  };

  const response = await dynamicService(requestParams)
  return (response as { data: { results: GetExampleResponse[] } })?.data?.results;
} 

export default async function HomePage() {


  const resultResponse = await getExample();

  return (
    <HomeView items={resultResponse} />
  );
}
