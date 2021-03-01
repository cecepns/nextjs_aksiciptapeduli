export function convertPersen(terkumpul, target) {
    let persen = Math.ceil((parseInt(terkumpul) / parseInt(target)) * (100))
    if (parseInt(terkumpul) >= parseInt(target)) {
        return 100
    }
    return persen
}