import { clearFallbackTimer, getFallbackDelayMs, scheduleFallbackTimer } from './nerve.js';

export const wireBirthdayIntro = ({
    introVideo,
    startButton,
    forceRedirectButton,
    redirectUrl = './page.html',
} = {}) => {
    if (!introVideo || !startButton) {
        return;
    }

    const redirectToPage = () => {
        window.location.href = redirectUrl;
    };

    let fallbackTimer = null;
    let playbackStarted = false;

    const showFallbackButton = () => {
        if (forceRedirectButton) {
            forceRedirectButton.hidden = false;
        }
    };

    const scheduleFallback = () => {
        if (!playbackStarted) {
            return;
        }

        clearFallbackTimer(fallbackTimer);
        // Use a fixed 50s fallback so the button appears predictably even if
        // the media duration or ended event is unreliable.
        fallbackTimer = scheduleFallbackTimer(showFallbackButton, getFallbackDelayMs());
    };

    const startPlaybackWithSound = async () => {
        introVideo.muted = false;
        playbackStarted = true;
        startButton.hidden = true;

        try {
            await introVideo.play();
            scheduleFallback();
        } catch {
            playbackStarted = false;
            startButton.hidden = false;
            showFallbackButton();
        }
    };

    introVideo.addEventListener('ended', redirectToPage, { once: true });
    introVideo.addEventListener('loadedmetadata', scheduleFallback);
    introVideo.addEventListener('error', showFallbackButton);
    introVideo.addEventListener('stalled', showFallbackButton);
    introVideo.addEventListener('abort', showFallbackButton);

    startButton.addEventListener('click', startPlaybackWithSound);

    if (forceRedirectButton) {
        forceRedirectButton.addEventListener('click', redirectToPage);
    }
};
