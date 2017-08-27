export default function apiMiddleware() {
  return next => (action) => {
    const {
      types,
      promise,
      ...rest
    } = action;

    if (!promise) return next(action);

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({
      ...rest,
      type: REQUEST
    });
    return promise
      .then(
        response => next({ ...rest, response, type: SUCCESS }),
        error => next({ ...rest, error, type: FAILURE })
      );
  };
}
