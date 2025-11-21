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
  const statusEl = document.getElementById('cook-mode-status');
  if (!checkbox) return;

  // restore saved state
  const saved = localStorage.getItem('cookMode') === 'true';
  checkbox.checked = saved;

  // helper to set non-blocking status messages
  function setStatus(message, type = '') {
    if (!statusEl) {
      // nothing to show, fallback to console
      if (type === 'error') console.error(message);
      else console.info(message);
      return;
    }
    statusEl.textContent = message;
    statusEl.classList.remove('active', 'error');
    if (type) statusEl.classList.add(type);
    // clear status after 5s for non-active messages
    if (type !== 'active') {
      setTimeout(() => {
        if (statusEl) statusEl.textContent = '';
      }, 5000);
    }
  }

  // if saved active, try to acquire lock or fallback
  if (saved) {
    if (isSupported) {
      const ok = await requestWakeLock();
      if (ok) setStatus('Cook Mode active', 'active');
      else setStatus('Could not enable Cook Mode (Wake Lock error)', 'error');
    } else {
      try {
        await ensureNoSleep();
        noSleepInstance = new window.NoSleep();
        noSleepInstance.enable();
        setStatus('Cook Mode active (fallback)', 'active');
      } catch (err) {
        console.warn('NoSleep fallback failed:', err);
        setStatus('Cook Mode not supported', 'error');
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
          setStatus('Unable to enable Cook Mode on this browser.', 'error');
        } else {
          setStatus('Cook Mode active', 'active');
        }
      } else {
        try {
          await ensureNoSleep();
          noSleepInstance = new window.NoSleep();
          noSleepInstance.enable();
          setStatus('Cook Mode active (fallback)', 'active');
        } catch (err) {
          e.target.checked = false;
          localStorage.setItem('cookMode', 'false');
          setStatus('Cook Mode is not supported by this browser.', 'error');
        }
      }
    } else {
      await releaseWakeLock();
      setStatus('Cook Mode disabled');
    }
  });

  // sync across tabs: respond when other tabs change cookMode
  window.addEventListener('storage', async (ev) => {
    if (ev.key !== 'cookMode') return;
    const newVal = ev.newValue === 'true';
    // update checkbox if different
    if (checkbox.checked !== newVal) checkbox.checked = newVal;
    if (newVal) {
      if (isSupported) {
        const ok = await requestWakeLock();
        if (ok) setStatus('Cook Mode active (synced)', 'active');
        else setStatus('Cook Mode sync failed (Wake Lock error)', 'error');
      } else {
        try {
          await ensureNoSleep();
          noSleepInstance = new window.NoSleep();
          noSleepInstance.enable();
          setStatus('Cook Mode active (fallback, synced)', 'active');
        } catch (err) {
          setStatus('Cook Mode not supported (synced)', 'error');
        }
      }
    } else {
      await releaseWakeLock();
      setStatus('Cook Mode disabled (synced)');
    }
  });

  document.addEventListener('visibilitychange', handleVisibility);
}

export default { initCookMode };
