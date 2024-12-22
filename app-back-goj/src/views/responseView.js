const formatResponse = (data) => {
  if (data.error) {
    return { error: data.error };
  }

  if (data.message) {
    return { message: data.message };
  }

  return { results: data };
};

module.exports = { formatResponse };
