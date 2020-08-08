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
      target: 'https://api.airtable.com/v0/appbg8J7uh1qMZme5/quotes',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    },
  ],
};

export default config;
