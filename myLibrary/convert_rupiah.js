export function convertRupiah(nominal) {
        let rupiah = '';
        let angkarev = nominal
            .toString()
            .split('')
            .reverse()
            .join('');
        for (let i = 0; i < angkarev.length; i++) 
            if (i % 3 == 0) 
                rupiah += angkarev.substr(i, 3) + '.';
    let result = 'Rp. ' + rupiah
            .split('', rupiah.length - 1)
            .reverse()
            .join('');

        return result
}