export default function() {
  const events = {};
  return {
    on(name, handler) {
      let handlers = events[name];
      if (!!handlers === false) {
        const arr = [];
        handlers = arr;
        events[name] = arr;
      }
      handlers.push(handler);
    },
    emit(name, data) {
      const handlers = events[name];
      if (!!handlers === false) {
        return;
      }
      handlers.forEach(handler => handler(data));
    }
  };
}
