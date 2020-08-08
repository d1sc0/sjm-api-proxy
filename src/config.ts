import { Options } from 'http-proxy-middleware';
import { ParsedUrlQueryInput } from 'querystring';

export interface Config {
  allowedDomains: string[];
  proxies: Proxy[];
}

export interface Proxy extends Options {
  route: string;
  allowedMethods: string[];
  queryparams?: ParsedUrlQueryInput;
  allowedDomains?: string[];
}

const config: Config = {
  allowedDomains: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  proxies: [
    {
      route: '/quote',
      allowedMethods: ['GET'],
      target: 'http://api.forismatic.com/api/1.0',
      queryparams: {
        method: 'getQuote',
        lang: 'en',
        format: 'json',
      },
    },
  ],
};

export default config;
