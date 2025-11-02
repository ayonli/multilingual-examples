export function getRunningTime(): number {
    return Math.round(performance.now() / 1_000)
}
