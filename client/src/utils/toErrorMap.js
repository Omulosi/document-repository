export default function toErrorMap(err, error = "", setError = null) {
  if (err?.response?.data) {
    let errors = err?.response?.data;

    errors = Object.entries(errors);

    const errorMap = {};
    errors.forEach(([field, message]) => {
      errorMap[field] = message;
    });

    return errorMap;
  }
  if (error) {
    setError(error);
  }
}
