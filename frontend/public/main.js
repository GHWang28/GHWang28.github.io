// Setting up service workers
if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js');
  });
}
