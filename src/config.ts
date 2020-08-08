import { Options } from 'http-proxy-middleware';
import { ParsedUrlQueryInput } from 'querystring';
import { json } from 'express';

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
  allowedDomains: ['http://localhost:5000'],
  proxies: [
    {
      route: '/quote',
      allowedMethods: ['GET'],
      target: 'http://api.forismatic.com/api/1.0/',
      queryparams: {
        method: getQuote,
        lang: encodeURI,
        format: json,
      },
    },
    {
      route: '/ipinfo',
      allowedMethods: ['GET'],
      target: 'https://ipinfo.io/',
      queryparams: {
        token: process.env.IPINFO_TOKEN,
      },
    },
    {
      route: '/github',
      allowedMethods: ['GET'],
      target: 'https://api.github.com',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Token ${process.env.GITHUB_TOKEN}`,
      },
    },
  ],
};

export default config;
