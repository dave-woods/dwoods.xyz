export function normalise2DVector([x, y]: [number, number]): [number, number] {
    if (x === 0 && y === 0) return [0, 0]
    const divisor = Math.sqrt(x * x + y * y)
    const fixedNums = 10000 // to avoid floating point issues
    return [
        Math.round(fixedNums * (x / divisor)) / fixedNums,
        Math.round(fixedNums * (y / divisor)) / fixedNums
    ]
}