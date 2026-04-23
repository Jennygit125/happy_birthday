const FALLBACK_DELAY_MS = 50000;

export const primeIntroVideo = (video) => {
    if (!video) {
        return;
    }

    video.preload = 'auto';

    if (typeof video.load === 'function') {
        video.load();
    }
};

export const getFallbackDelayMs = () => FALLBACK_DELAY_MS;

export const scheduleFallbackTimer = (callback, delayMs) => window.setTimeout(callback, delayMs);

export const clearFallbackTimer = (timerId) => {
    if (timerId !== null) {
        window.clearTimeout(timerId);
    }
};
