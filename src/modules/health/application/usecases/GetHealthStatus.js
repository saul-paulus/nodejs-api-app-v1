export default class GetHealthStatus {
  async execute() {
    return {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
  }
}
