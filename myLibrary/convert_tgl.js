export function convertTgl(tanggal) {
    let datePart = tanggal
                    .match(/\d+/g),
                    year = datePart[0],
                    month = parseInt(datePart[1]),
                    day = datePart[2],
                    jam = datePart[3],
                    menit = datePart[4],
                    detik = datePart[5];
    return day + '-' + month + '-' + year +' | ' + jam + ":" +menit + ":" +detik;
}