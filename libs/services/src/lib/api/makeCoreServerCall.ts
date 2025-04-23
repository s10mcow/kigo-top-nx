import { cookies } from 'next/headers';

// Helper function to get session token and form headers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getHeaders(body?: any) {
  const cookieStore = await cookies();
  const session_token = cookieStore.get('SESSION_TOKEN')?.value;

  const isFormData = body instanceof FormData;

  return {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    authorization: session_token ? `Bearer ${session_token}` : '',
  };
}

export const makeServersideCoreServerCall = {
  get: async (url: string, options: RequestInit = {}, debug = false) => {
    const commonHeaders = await getHeaders();
    const mergedOptions = {
      ...options,
      method: 'GET',
      headers: { ...commonHeaders, ...options.headers },
    };

    const response = await fetch(
      `${process.env['NEXT_PUBLIC_CORE_URL']}${url}`,
      {
        ...mergedOptions,
        cache: 'no-store',
        // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#individual-fetch-requests
      },
    );

    if (!response.ok) {
      if (debug) {
        console.error('Error in makeServersideCoreServerCall.get', {
          url,
          options,
          response,
        });
      }
      const error = await response.json();
      if (error?.message) {
        throw new Error(error.message);
      }
      throw new Error(response.statusText);
    }

    return response.json();
  },

  post: async (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: Record<string, any>,
    options: RequestInit = {},
  ) => {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_CORE_URL']}${url}`,
      {
        ...options,
        method: 'POST',
        headers: { ...(await getHeaders(body)), ...options.headers },
        body: body instanceof FormData ? body : JSON.stringify(body),
      },
    );
    if (!response.ok) {
      const error = await response.json();
      if (error?.message) {
        throw new Error(error.message);
      }
      throw new Error(response.statusText);
    }

    return response.json();
  },

  patch: async (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: Record<string, any>,
    options: RequestInit = {},
  ) => {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_CORE_URL']}${url}`,
      {
        ...options,
        method: 'PATCH',
        headers: { ...(await getHeaders(body)), ...options.headers },
        body: body instanceof FormData ? body : JSON.stringify(body),
      },
    );
    return response.json();
  },

  delete: async (url: string, options: RequestInit = {}) => {
    const response = await fetch(
      `${process.env['NEXT_PUBLIC_CORE_URL']}${url}`,
      {
        ...options,
        method: 'DELETE',
        headers: { ...(await getHeaders()), ...options.headers },
      },
    );
    return response.json();
  },
};
