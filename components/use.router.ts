import React from 'react';
import {useRouter as useNextRouter} from 'next/router';


function parseQuery(path) {
  const query = {};
  const regex = /[?&]([^&$=]+)(=([^&$]+))?/g;
  let param;
  while ((param = regex.exec(path)) !== null) {
    query[decodeURIComponent(param[1])] = decodeURIComponent(param[3]);
  }
  return query;
}

export function useRouter() {
  const router = useNextRouter();
  router.query = {...router.query, ...parseQuery(router.asPath)};
  return router;
}
