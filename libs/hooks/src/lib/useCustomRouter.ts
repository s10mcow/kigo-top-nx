'use client';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter, useSearchParams } from 'next/navigation';

export type CustomRouterOptions = {
  preserveQuery: boolean;
  queryParams?: Record<string, string>;
};

export function useCustomRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getFormattedUrl = (
    href: string,
    routerOptions: CustomRouterOptions = { preserveQuery: true },
  ) => {
    // If relative URL given, stick the current host on the string passed to URL()
    // as the constructor throws an error if URL without a host is given
    const urlBase = href.includes('http')
      ? href
      : window.location.origin + href;
    const url = new URL(urlBase);
    if (routerOptions?.preserveQuery) {
      searchParams.forEach((val, key) => {
        url.searchParams.set(key, val);
      });
    }

    if (routerOptions?.queryParams) {
      Object.entries(routerOptions.queryParams).forEach(([key, val]) => {
        url.searchParams.set(key, val);
      });
    }

    let urlString = url.toString();

    // If the href arg was relative, strip everything before the first '/' to
    // revert it back to a relative URL we can pass into the router.push() method
    if (!href.includes('http')) {
      urlString = urlString.substring(urlString.indexOf('/'));
    }

    return urlString;
  };

  const push = (
    href: string,
    routerOptions: CustomRouterOptions = { preserveQuery: true },
    options?: NavigateOptions,
  ) => {
    const urlString = getFormattedUrl(href, routerOptions);

    router.push(urlString, options);
  };

  const replace = (
    href: string,
    routerOptions: CustomRouterOptions = { preserveQuery: true },
    options?: NavigateOptions,
  ) => {
    const urlString = getFormattedUrl(href, routerOptions);

    router.replace(urlString, options);
  };

  return { push, replace };
}
