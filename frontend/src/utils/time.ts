export const formatTimeFromSeconds = (time: number) => {
    const seconds = Math.floor(time % 60).toString().padStart(2, "0")
    const minutes = Math.floor(time / 60).toString().padStart(2, "0")
    const hour = Math.floor(time / 3600).toString().padStart(2, "0")

    return `${hour}:${minutes}:${seconds}`
}