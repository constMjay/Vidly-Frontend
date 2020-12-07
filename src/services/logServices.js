
function init() {
    // Sentry.init({
    //     dsn: "https://6f73ebdcd2394fb3a07eb22ac110ddbc@o481580.ingest.sentry.io/5530501",
    //     integrations: [
    //         new Integrations.BrowserTracing(),
    //     ],

    //     // We recommend adjusting this value in production, or using tracesSampler
    //     // for finer control
    //     tracesSampleRate: 1.0,
    // });
}

function log(error) {
    console.log(error)
    // Sentry.captureException(error)
}
export default {
    init, log
}