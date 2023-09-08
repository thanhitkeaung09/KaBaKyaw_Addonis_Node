export default class ApiErrorResponse {
  public async toResponse(response, message = 'Something Wrong') {
    return response.unauthorized({
      data: message,
      message: false,
      status: 401,
    })
  }
}
