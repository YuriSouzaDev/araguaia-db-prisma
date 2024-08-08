// @ts-nocheck
// export const API_URL = 'http://18.218.233.145/wp-json';
export const API_URL = process.env.API_URL;

export function LOGIN_POST() {
  return {
    url: API_URL + '/login',
  };
}

export function TOKEN_VALIDATE_POST() {
  return {
    url: API_URL + '/validate',
  };
}

export function USER_GET() {
  return {
    url: API_URL + '/user',
  };
}

export function BRAND_POST() {
  return {
    url: API_URL + '/brands',
  };
}

export function OPTIONAL_GET() {
  return {
    url: API_URL + '/api/v1/opcional',
  };
}
