export default class ApiSuccessResponse {
  public async toResponse(response, message) {
    return response.json({
      data: message,
      message: true,
      status: 200,
    })
  }
}
