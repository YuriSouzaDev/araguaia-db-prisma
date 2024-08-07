// @ts-nocheck
// export const API_URL = 'http://18.218.233.145/wp-json';
export const API_URL = 'http://localhost:3000/api/v1';

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
    url: API_URL + '/api/v1/user',
  };
}

export function VEHICLE_POST() {
  return {
    url: API_URL + '/api/v1/veiculo',
  };
}

export function OPTIONAL_GET() {
  return {
    url: API_URL + '/api/v1/opcional',
  };
}
