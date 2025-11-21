// wakeLock.js
// Provides a simple API to manage the Screen Wake Lock and wire it to a checkbox toggle.

let wakeLock = null;
let isSupported = 'wakeLock' in navigator;
let noSleepInstance = null;

async function requestWakeLock() {
  if (isSupported) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => {
        wakeLock = null;
      });
      return true;
    } catch (err) {
      console.warn('Wake Lock request failed:', err);
      wakeLock = null;
      return false;
    }
  }
  // fallback handled elsewhere
  return false;
}

async function releaseWakeLock() {
  if (wakeLock) {
    try {
      await wakeLock.release();
    } catch (err) {
      console.warn('Wake Lock release failed:', err);
    } finally {
      wakeLock = null;
    }
  }
  if (noSleepInstance) {
    try {
      noSleepInstance.disable();
    } catch (err) {
      // ignore
    }
    noSleepInstance = null;
  }
}

function handleVisibility() {
  if (document.visibilityState === 'visible') {
    const active = localStorage.getItem('cookMode') === 'true';
    if (active) {
      if (isSupported) {
        requestWakeLock();
      } else {
        ensureNoSleep().then(() => {
          if (noSleepInstance) noSleepInstance.enable();
        }).catch(() => {});
      }
    }
  }
}

function loadNoSleepScript() {
  // load NoSleep.js from CDN if not already loaded
  return new Promise((resolve, reject) => {
    if (window.NoSleep) return resolve(window.NoSleep);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/nosleep.js@0.12.0/dist/NoSleep.min.js';
    script.async = true;
    script.onload = () => resolve(window.NoSleep);
    script.onerror = () => reject(new Error('Failed to load NoSleep.js'));
    document.head.appendChild(script);
  });
}

async function ensureNoSleep() {
  if (window.NoSleep) return window.NoSleep;
  return loadNoSleepScript();
}

export async function initCookMode() {
  const checkbox = document.getElementById('cook-mode-toggle');
  if (!checkbox) return;

  // restore saved state
  const saved = localStorage.getItem('cookMode') === 'true';
  checkbox.checked = saved;

  // if saved active, try to acquire lock or fallback
  if (saved) {
    if (isSupported) {
      await requestWakeLock();
    } else {
      try {
        await ensureNoSleep();
        noSleepInstance = new window.NoSleep();
        noSleepInstance.enable();
      } catch (err) {
        console.warn('NoSleep fallback failed:', err);
      }
    }
  }

  checkbox.addEventListener('change', async (e) => {
    const on = e.target.checked;
    localStorage.setItem('cookMode', on ? 'true' : 'false');
    if (on) {
      if (isSupported) {
        const ok = await requestWakeLock();
        if (!ok) {
          e.target.checked = false;
          localStorage.setItem('cookMode', 'false');
          alert('Unable to enable Cook Mode on this browser.');
        }
      } else {
        try {
          await ensureNoSleep();
          noSleepInstance = new window.NoSleep();
          noSleepInstance.enable();
        } catch (err) {
          e.target.checked = false;
          localStorage.setItem('cookMode', 'false');
          alert('Cook Mode is not supported by this browser.');
        }
      }
    } else {
      await releaseWakeLock();
    }
  });

  document.addEventListener('visibilitychange', handleVisibility);
}

export default { initCookMode };
