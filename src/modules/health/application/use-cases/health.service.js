export default () => {
  const getHealthStatus = async () => {
    return {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
  };

  return {
    getHealthStatus,
  };
};
