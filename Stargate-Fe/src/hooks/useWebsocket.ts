const webSocket = (function(url: string | null) {
  let instance: WebSocket;

  function initiate() {
    return new WebSocket(`${import.meta.env.VITE_WEBSOKET_URL}${url}`)
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = initiate();
      }
      return instance;
    }
  }
});

export { webSocket };