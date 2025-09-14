export class Api {
  static host = '';

  static options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };

  constructor(host = '') {
    Api.host = host;
  }

  getOptions(options: RequestInit = {}): RequestInit {
    const {headers = {}} = options;

    return {
      ...Api.options,
      headers: {...Api.options.headers, ...headers},
      ...options,
    };
  }

  request<T>(url = '', options?: RequestInit): Promise<T> {
    return this.fetch<T>(url, Api.host, options);
  }

  fetch<T>(url = '', host = '', options = {}): Promise<T> {
    return fetch(`${host}${url}`, this.getOptions(options)).then<T>(
      (response) => response.json()
    );
  }

  requestLocal<T>(url = ''): Promise<T> {
    return this.fetch(url, '/local');
  }
}

export const api = new Api();
