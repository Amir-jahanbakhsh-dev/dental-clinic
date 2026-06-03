import localFont from 'next/font/local';
const btitr = localFont({
    src: './BTitrBold.ttf',
    variable: '--font-btitr',
    display: 'swap',
});

const bnazanin = localFont({
    src: './BNazanin.ttf',
    variable: '--font-bnazanin',
    display: 'swap',
});

export { btitr, bnazanin };