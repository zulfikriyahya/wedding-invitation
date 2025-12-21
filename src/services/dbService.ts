// // import { RSVP, Wish, AttendanceStatus } from '../types';
// import { AttendanceStatus } from "../types";
// import type { RSVP, Wish } from "../types";
// Pisahkan AttendanceStatus (karena dia Enum/Nilai)
import { AttendanceStatus } from "../types";

// Import RSVP dan Wish sebagai Type (karena dia Interface)
import type { RSVP, Wish } from "../types";

const RSVP_KEY = "wedding_rsvp";
const WISHES_KEY = "wedding_wishes";

const generateAuthenticWishes = () => {
  const femaleFirst = [
    "Siti",
    "Maya",
    "Laras",
    "Putri",
    "Rina",
    "Indah",
    "Mega",
    "Amira",
    "Vina",
    "Siska",
    "Adinda",
    "Aulia",
    "Nia",
    "Fitri",
    "Dewi",
    "Lestari",
    "Wati",
    "Ayu",
  ];
  const femaleLast = [
    "Lestari",
    "Sari",
    "Utami",
    "Rahayu",
    "Aminah",
    "Fitriani",
    "Wahyuni",
    "Kusuma",
    "Permata",
    "Puspita",
    "Anggraini",
  ];

  const maleFirst = [
    "Rizky",
    "Bambang",
    "Dimas",
    "Hendra",
    "Fajar",
    "Bagas",
    "Eko",
    "Joko",
    "Agus",
    "Arif",
    "Taufik",
    "Guntur",
    "Sultan",
    "Doni",
    "Reza",
    "Saputra",
    "Budi",
    "Hidayat",
  ];
  const maleLast = [
    "Saputra",
    "Pratama",
    "Hidayat",
    "Purnomo",
    "Setiawan",
    "Ramadhan",
    "Nugroho",
    "Wijaya",
    "Kusuma",
    "Gunawan",
    "Susanto",
  ];

  const templates = [
    "Selamat ya Fey & Yaya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin.",
    "Happy wedding guys! Akhirnya pelaminan juga. Lancar-lancar ya kehidupan barunya.",
    "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Selamat ya!",
    "Selamat menempuh hidup baru. Semoga cinta kalian abadi sampai kakek nenek.",
    "Cieee yang udah halal! Selamat ya Yaya, jagain Fey baik-baik ya bro.",
    "Terharu banget liat kalian berdua. Dari jaman kuliah sampai sekarang akhirnya nikah. Selamat!",
    "Selamat menempuh bahtera rumah tangga. Semoga cepat dikasih momongan yang lucu-lucu.",
    "Wishing you a lifetime of love and happiness. Selamat Fey & Yaya!",
    "Maaf banget nggak bisa hadir langsung karena masih di luar kota, tapi doa terbaik dari kami sekeluarga.",
    "Mantap bosku! Akhirnya pecah telor juga. Bahagia terus ya buat kalian.",
    "Semoga Allah memberkahi pernikahan kalian dan menyatukan dalam kebaikan selalu.",
    "Selamat ya! Ikut seneng denger kabarnya. Semoga jadi keluarga yang harmonis.",
    "Congrats on your wedding! Stay in love forever and ever.",
    "Selamat menempuh petualangan baru bersama. Saling sabar dan saling dukung ya!",
    "Happy for you both! Semoga rumah tangganya penuh berkah dan kebahagiaan.",
    "Selamat ya Fey sayang, cantik banget hari ini. Semoga bahagia terus sama Yaya.",
    "Akhirnya janji suci terucap. Selamat membangun surga di dunia bersama ya.",
    "Selamat Bro Yaya! Jangan lupa traktirannya kalau ketemu haha. Bahagia terus ya!",
    "Semoga menjadi pasangan yang selalu menginspirasi. Selamat menempuh hidup baru.",
    "Doa terbaik untuk Fey & Yaya. Semoga setiap langkah kalian diberkahi Tuhan.",
  ];

  const wishes: Wish[] = [];
  const now = Date.now();
  const threeMonths = 90 * 24 * 60 * 60 * 1000;

  for (let i = 0; i < 165; i++) {
    const isFemale = Math.random() > 0.5;
    let name = "";

    if (isFemale) {
      const first = femaleFirst[Math.floor(Math.random() * femaleFirst.length)];
      const last = femaleLast[Math.floor(Math.random() * femaleLast.length)];
      name = `${first} ${last}`;
    } else {
      const first = maleFirst[Math.floor(Math.random() * maleFirst.length)];
      const last = maleLast[Math.floor(Math.random() * maleLast.length)];
      name = `${first} ${last}`;
    }

    const message = templates[Math.floor(Math.random() * templates.length)];
    const timestamp = new Date(
      now - Math.floor(Math.random() * threeMonths)
    ).toISOString();

    wishes.push({
      id: Math.random() + i,
      name,
      message,
      created_at: timestamp,
    });
  }
  return wishes;
};

export const dbService = {
  async initializeDemo() {
    const existing = localStorage.getItem(WISHES_KEY);
    if (!existing || JSON.parse(existing).length < 20) {
      const allWishes = generateAuthenticWishes();
      localStorage.setItem(WISHES_KEY, JSON.stringify(allWishes));
      return allWishes;
    }
    return JSON.parse(existing);
  },

  async saveRSVP(data: Omit<RSVP, "id" | "created_at">): Promise<RSVP> {
    const existing = JSON.parse(localStorage.getItem(RSVP_KEY) || "[]");
    const newRSVP: RSVP = {
      ...data,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(RSVP_KEY, JSON.stringify([...existing, newRSVP]));
    return newRSVP;
  },

  async getWishes(): Promise<Wish[]> {
    let wishesStr = localStorage.getItem(WISHES_KEY);
    let wishes: Wish[] = [];

    if (!wishesStr || JSON.parse(wishesStr).length < 5) {
      wishes = generateAuthenticWishes();
      localStorage.setItem(WISHES_KEY, JSON.stringify(wishes));
    } else {
      wishes = JSON.parse(wishesStr);
    }

    return wishes.sort(
      (a: Wish, b: Wish) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async saveWish(data: { name: string; message: string }): Promise<Wish> {
    const wishes = await this.getWishes();
    const newWish: Wish = {
      ...data,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    localStorage.setItem(WISHES_KEY, JSON.stringify([...wishes, newWish]));
    return newWish;
  },
};
