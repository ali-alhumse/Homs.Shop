export function successResponse(data) {
  return {
    success: true,
    data,
    error: null,
  };
}

export function errorResponse(code, message, details = null) {
  return {
    success: false,
    data: null,
    error: { code, message, details },
  };
}
