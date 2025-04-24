//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  /* config options here */
  publicRuntimeConfig: {
    // available to both frontend and backend
    // DO NOT PUT SENSITIVE INFORMATION OR KEYS IN HERE
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_CORE_URL: process.env.NEXT_PUBLIC_CORE_URL,
    NEXT_PUBLIC_SDK_URL: process.env.NEXT_PUBLIC_SDK_URL,
  },
  output: 'standalone',
  images: {
    domains: [
      'd1a4n83cq9sj78.cloudfront.net',
      'dhsjeavjbl7q5.cloudfront.net',
      'dpdag14b7jtjr.cloudfront.net',
      'kigo-image-rendering-test.s3.amazonaws.com',
      'kigo-static-assets.s3.us-east-1.amazonaws.com',
      'img.entertainment.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.entertainment.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'logos.entertainment.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.entertainment.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ent-swagger.s3.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ep-voucher-a-prod-ent-vpc-2.s3.us-east-2.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ep-voucher-b-prod-ent-vpc-2.s3.us-east-2.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ep-voucher-c-uat-ent-vpc-2.s3.us-east-2.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'kigo-static-assets.s3.us-east-1.amazonaws.com',
        pathname: '**',
      },
    ],
  },
  // Allows us to make calls to CORS-protected internal API endpoints without the browser blocking the request
  rewrites: async () => {
    const serverUrl = process.env.NEXT_PUBLIC_CORE_URL;
    return [
      {
        source: '/api/internal/:path*',
        destination: `${serverUrl}/:path*`, // Proxy to Backend
      },
    ];
  },

  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
