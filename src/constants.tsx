import type { WeddingConfig } from "./types";

export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    bride: {
      name: "Fey",
      fullName: "Fera Oktapia",
      parents: "Putri ke 1 dari Bapak Adam & Ibu Siti Hawa",
      instagram: "fera_oktapia",
      image: "https://placehold.co/600x800?text=Fey+Portrait",
    },
    groom: {
      name: "Yaya",
      fullName: "Yahya Zulfikri",
      parents: "Putra ke 7 dari Bapak Mahdi & Ibu Syaiyah",
      instagram: "yahya_zulfikri",
      image: "https://placehold.co/600x800?text=Yaya+Portrait",
    },
  },
  venue: {
    name: "The Royal Azure Ballroom",
    address: "Jl. Elok No. 77, Jakarta Selatan, DKI Jakarta",
    latitude: -6.2088,
    longitude: 106.8456,
  },
  events: {
    akad: {
      title: "Janji Suci",
      day: "Minggu",
      date: "11 Oktober 2026",
      startTime: "08:00",
      endTime: "10:00",
      startDateTime: new Date("2026-10-11T08:00:00+07:00"),
      endDateTime: new Date("2026-10-11T10:00:00+07:00"),
    },
    resepsi: {
      title: "Perayaan Cinta",
      day: "Minggu",
      date: "11 Oktober 2026",
      startTime: "11:00",
      endTime: "14:00",
      startDateTime: new Date("2026-10-11T11:00:00+07:00"),
      endDateTime: new Date("2026-10-11T14:00:00+07:00"),
    },
  },
};

export const LOVE_STORY = [
  {
    date: "Musim Gugur, 2020",
    title: "Pertemuan Pertama",
    desc: "Berawal dari sebuah diskusi kecil, dua jiwa yang berbeda menemukan keselarasan dalam pandangan hidup.",
  },
  {
    date: "Maret, 2022",
    title: "Sebuah Komitmen",
    desc: "Memutuskan untuk saling menguatkan, menjadikan setiap tantangan sebagai jembatan menuju kedewasaan bersama.",
  },
  {
    date: "Januari, 2025",
    title: "Langkah Terakhir",
    desc: "Di bawah restu kedua orang tua, kami memantapkan hati untuk melangkah ke jenjang yang lebih suci.",
  },
];

export const BANK_ACCOUNTS = [
  { bank: "Bank BCA", number: "1234567890", name: "Fera Oktapia" },
  { bank: "Bank Mandiri", number: "0987654321", name: "Yahya Zulfikri" },
];

export const GALLERY_IMAGES = [
  "https://placehold.co/800x1200?text=Moment+1",
  "https://placehold.co/1200x800?text=Moment+2",
  "https://placehold.co/800x800?text=Moment+3",
  "https://placehold.co/800x1200?text=Moment+4",
  "https://placehold.co/1200x800?text=Moment+5",
  "https://placehold.co/800x1200?text=Moment+6",
  "https://placehold.co/1200x800?text=Moment+7",
  "https://placehold.co/800x1200?text=Moment+8",
];
