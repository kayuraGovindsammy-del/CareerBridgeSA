const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api/v1';

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    status: number,
    code: string,
    details?: unknown,
  ) {
    super(message);

    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set('Accept', 'application/json');

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json');
  }

  let response: Response;

  try {
    response = await fetch(
      `${API_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`,
      {
        ...options,
        headers,
        credentials: 'include',
      },
    );
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }

    throw new ApiClientError(
      'Unable to connect to the server',
      0,
      'NETWORK_ERROR',
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  let result: ApiSuccessResponse<T> | ApiErrorResponse;

  try {
    result = await response.json();
  } catch {
    throw new ApiClientError(
      'Invalid response from server',
      response.status,
      'INVALID_RESPONSE',
    );
  }

  if (!response.ok || !result.success) {
    const error = !result.success
      ? result.error
      : undefined;

    throw new ApiClientError(
      error?.message || 'Request failed',
      response.status,
      error?.code || 'REQUEST_FAILED',
      error?.details,
    );
  }

  return result.data;
}

export const api = {
  get<T>(endpoint: string) {
    return apiRequest<T>(endpoint, {
      method: 'GET',
    });
  },

  post<T>(endpoint: string, body?: unknown) {
    return apiRequest<T>(endpoint, {
      method: 'POST',
      body: body === undefined
        ? undefined
        : JSON.stringify(body),
    });
  },

  put<T>(endpoint: string, body: unknown) {
    return apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  patch<T>(endpoint: string, body: unknown) {
    return apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string) {
    return apiRequest<T>(endpoint, {
      method: 'DELETE',
    });
  },
};