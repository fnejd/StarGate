const webSocket = (function(url: string | null) {
  let instance: WebSocket;

  function initiate() {
    return new WebSocket(`ws://i9a406.p.ssafy.io:8080/api/rtc/${url}`)
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