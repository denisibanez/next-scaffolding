type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get';
type Request = {
  method: Methods;
  url: string;
  body?: unknown;
  headers?: unknown;
};

interface RequestParams {
  type: Methods;
  url: string;
  baseUrl?: string;
  payload?: unknown;
  headers?: unknown;
}

export { Request, Methods, RequestParams };
