// Define interfaces for the Axios error structure
export interface AxiosError {
  response?: {
    data?:
      | string
      | {
          message?: string;
          error?: string;
          statusMessage?: string;
        };
    statusText?: string;
  };
  request?: {
    statusText?: string;
  };
  message?: string;
}

/**
 * Extracts the error message from an Axios error object.
 * It navigates through various common structures to find the message.
 * Returns null if no message is found.
 *
 * @param error - The error object from Axios.
 * @returns The extracted error message, or null if not found.
 */
function extractErrorMessage(error: AxiosError): string | null {
  // Check for response data in error
  if (error.response && error.response.data) {
    if (typeof error.response.data === "string") {
      return error.response.data;
    } else if (error.response.data.message) {
      return error.response.data.message;
    } else if (error.response.data.error) {
      return error.response.data.error;
    } else if (error.response.data.statusMessage) {
      return error.response.data.statusMessage;
    }
  }

  // Check for request error
  if (error.request && error.request.statusText) {
    return error.request.statusText;
  }

  // Fallback to generic error message or null
  return error.message || null;
}

export default extractErrorMessage;
