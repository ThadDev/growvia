// Structured logger for Growvia
// In production, replace with pino or winston if needed.

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const currentLevel =
    LOG_LEVELS[process.env.LOG_LEVEL] ?? (process.env.NODE_ENV === "production" ? LOG_LEVELS.warn : LOG_LEVELS.debug);

function format(level, message, meta) {
    const ts = new Date().toISOString();
    const base = { ts, level, message };
    return meta ? { ...base, ...meta } : base;
}

const logger = {
    debug(msg, meta) {
        if (currentLevel <= LOG_LEVELS.debug) console.debug(JSON.stringify(format("debug", msg, meta)));
    },
    info(msg, meta) {
        if (currentLevel <= LOG_LEVELS.info) console.info(JSON.stringify(format("info", msg, meta)));
    },
    warn(msg, meta) {
        if (currentLevel <= LOG_LEVELS.warn) console.warn(JSON.stringify(format("warn", msg, meta)));
    },
    error(msg, meta) {
        if (currentLevel <= LOG_LEVELS.error) console.error(JSON.stringify(format("error", msg, meta)));
    },
};

export default logger;
