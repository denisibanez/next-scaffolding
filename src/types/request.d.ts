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
  payload?: unknown;
  loading?: boolean | null | undefined;
  customSuccessMessage?: string | null;
  customErrorMessage?: string | null;
  headers?: unknown;
}

export { Request, Methods, RequestParams };
