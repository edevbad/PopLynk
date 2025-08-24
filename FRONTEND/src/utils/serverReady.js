const SERVER_TIMEOUT = 15 * 60 * 1000; // 15 minutes in ms

export function isServerStillWarm() {
  const lastReady = localStorage.getItem("serverReadyAt");
  if (!lastReady) return false;

  const age = Date.now() - parseInt(lastReady, 10);
  return age < SERVER_TIMEOUT; // true if server likely still awake
}

export function markServerReady() {
  localStorage.setItem("serverReadyAt", Date.now().toString());
}