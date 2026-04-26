import './style.css';
import { wireBirthdayIntro } from './Brain.js';
import { primeIntroVideo } from './nerve.js';

const introVideo = document.querySelector('[data-intro-video]');
const startButton = document.querySelector('[data-start-video]');
const forceRedirectButton = document.querySelector('[data-force-redirect]');

// Flesh is flesh: it primes the video, then hands the interaction basically things you see
// logic to Brain so the page thinks .
primeIntroVideo(introVideo);
wireBirthdayIntro({
    introVideo,
    startButton,
    forceRedirectButton,
    redirectUrl: './page.html',
});

console.log('Flesh booted the birthday intro, nerve primed the video, and Brain is handling playback and redirect logic.');
