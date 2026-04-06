let toaster: any = null;

export function setToasterInstance(t: any) {
  toaster = t;
}

export function getToasterInstance() {
  return toaster;
}

export function showToast(options: any) {
  if (!toaster) {
    // Toaster not initialized yet (server or before Layout mounted)
    // Fail silently during SSR or early client render.
    // eslint-disable-next-line no-console
    console.warn('[toast] Toaster not initialized');
    return;
  }
  const { status, type, ...rest } = options || {};
  const toastType = status || type || 'info';
  return toaster.create({ type: toastType, ...rest });
}

export const toast = {
  show: showToast,
  success: (opts: any) => toaster?.success?.(opts),
  error: (opts: any) => toaster?.error?.(opts),
  info: (opts: any) => toaster?.info?.(opts),
  warning: (opts: any) => toaster?.warning?.(opts),
};

export default toaster;
