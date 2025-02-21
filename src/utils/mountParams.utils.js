export default function mountUrl(urlParams) {
  let url = `${urlParams.path}`;
  if (urlParams?.params) {
    url += new URLSearchParams(urlParams.params);
  }
  return url;
}
