
import React, { useState } from 'react';
import { Send, CheckCircle2, Heart, Users, MapPin, Sparkles } from 'lucide-react';
import { dbService } from '../services/dbService';
import { AttendanceStatus } from '../types';

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    guest_name: '',
    phone: '',
    attendance: AttendanceStatus.HADIR,
    guest_count: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guest_name) return;
    setIsSubmitting(true);
    try {
      await dbService.saveRSVP(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 bg-slate-950 text-white text-center">
        <div className="container mx-auto px-6">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-reveal">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-3xl md:text-6xl font-serif italic mb-4 animate-reveal">Terima Kasih</h3>
          <p className="text-white/70 font-light max-w-sm mx-auto animate-reveal [animation-delay:200ms] text-base md:text-lg">
            Konfirmasi kehadiran Anda telah kami terima. Sampai jumpa di hari bahagia kami!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-16 md:py-40 bg-white dark:bg-darkBg transition-colors duration-1000">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-24 space-y-3">
          <Heart className="w-5 h-5 text-accentDark dark:text-accent/30 mx-auto mb-2 animate-pulse" />
          <h2 className="text-4xl md:text-8xl font-serif italic text-slate-900 dark:text-white tracking-tight">Reservasi</h2>
          <p className="text-slate-400 dark:text-slate-500 tracking-luxury text-[9px] md:text-[10px] uppercase font-bold">Mohon konfirmasi kehadiran Anda</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-14 items-stretch">
          {/* Form Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="editorial-card h-full p-6 md:p-14 rounded-[1.5rem] md:rounded-[3.5rem] relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accentDark/5 dark:bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000"></div>
              
              <div className="relative z-10 space-y-8 md:space-y-12">
                <div className="flex items-center gap-4 border-b border-slate-50 dark:border-white/5 pb-4 md:pb-10">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-accentDark dark:text-accent border border-slate-100 dark:border-white/10">
                    <Users className="w-5 h-5 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-serif italic text-slate-900 dark:text-white leading-none">Konfirmasi</h3>
                    <p className="text-[8px] md:text-[9px] uppercase tracking-editorial text-slate-400 mt-1.5 font-bold">Lengkapi data Anda</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                  <div className="space-y-6 md:space-y-8">
                    <div className="relative group/input">
                      <input
                        required
                        type="text"
                        className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-2 md:py-5 focus:border-accentDark dark:focus:border-accent outline-none transition-all text-base md:text-xl font-serif italic text-slate-900 dark:text-white placeholder:text-slate-200"
                        placeholder="Nama Tamu"
                        value={formData.guest_name}
                        onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      />
                      <label className="absolute -top-3.5 left-0 text-[7px] md:text-[9px] uppercase tracking-editorial text-slate-400 font-bold group-focus-within/input:text-accentDark transition-colors">Nama</label>
                    </div>

                    <div className="relative group/input">
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-2 md:py-5 focus:border-accentDark dark:focus:border-accent outline-none transition-all text-base md:text-xl font-serif italic text-slate-900 dark:text-white placeholder:text-slate-200"
                        placeholder="WhatsApp / Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <label className="absolute -top-3.5 left-0 text-[7px] md:text-[9px] uppercase tracking-editorial text-slate-400 font-bold group-focus-within/input:text-accentDark transition-colors">Kontak</label>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-6">
                    <p className="text-[8px] md:text-[9px] uppercase tracking-editorial text-slate-400 font-bold mb-1">Status Kehadiran</p>
                    <div className="grid grid-cols-1 gap-2">
                      {[AttendanceStatus.HADIR, AttendanceStatus.TIDAK_HADIR, AttendanceStatus.RAGU].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormData({ ...formData, attendance: status })}
                          className={`px-5 py-3.5 md:py-5 rounded-lg md:rounded-2xl border transition-all text-[9px] md:text-[11px] font-bold uppercase tracking-editorial flex items-center justify-between group ${
                            formData.attendance === status 
                            ? 'bg-primary dark:bg-white text-white dark:text-primary border-primary dark:border-white shadow-md' 
                            : 'border-slate-100 dark:border-white/5 text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                        >
                          {status.replace('_', ' ')}
                          {formData.attendance === status && <CheckCircle2 className="w-3.5 h-3.5 md:w-5 md:h-5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3.5 md:py-6 bg-primary dark:bg-accentDark text-white rounded-xl md:rounded-3xl font-bold uppercase tracking-luxury text-[9px] md:text-[11px] hover:shadow-xl transition-all duration-700 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 group shadow-sm"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Sekarang'}
                    <Send className="w-3.5 h-3.5 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Decorative Info Card - Responsive Optimization */}
          <div className="lg:col-span-7">
            <div className="editorial-card h-full p-8 md:p-20 rounded-[2rem] md:rounded-[4rem] flex flex-col justify-center space-y-10 md:space-y-16 relative overflow-hidden group shadow-lg border border-slate-100 dark:border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-50"></div>
              
              <div className="relative z-10 text-center lg:text-left space-y-6 md:space-y-12">
                <div className="inline-flex items-center gap-2.5 bg-slate-50 dark:bg-white/5 px-4 py-1.5 md:px-6 md:py-3 rounded-full border border-slate-100 dark:border-white/10">
                   <Sparkles className="w-3.5 h-3.5 md:w-5 md:h-5 text-accentDark dark:text-accent animate-pulse" />
                   <span className="text-[7px] md:text-[10px] uppercase tracking-editorial font-bold text-slate-500">Love & Gratitude</span>
                </div>
                
                <h3 className="text-3xl md:text-8xl font-serif italic text-slate-900 dark:text-white leading-tight tracking-tight text-balance">
                  Lengkapi <span className="text-accentDark dark:text-accent">kebahagiaan</span> kami dengan kehadiran Anda.
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-2xl font-light leading-relaxed italic max-w-2xl mx-auto lg:mx-0 text-balance">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 pt-6 md:pt-10 border-t border-slate-50 dark:border-white/5">
                  <div className="space-y-1 md:space-y-4">
                    <div className="flex items-center justify-center lg:justify-start gap-2.5 text-accentDark dark:text-accent opacity-60">
                      <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                      <span className="text-[8px] md:text-[11px] uppercase tracking-editorial font-bold">Venue</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-serif italic text-xl md:text-3xl">Royal Azure Ballroom</p>
                  </div>
                  <div className="space-y-1 md:space-y-4">
                    <div className="flex items-center justify-center lg:justify-start gap-2.5 text-accentDark dark:text-accent opacity-60">
                      <Heart className="w-4 h-4 md:w-6 md:h-6" />
                      <span className="text-[8px] md:text-[11px] uppercase tracking-editorial font-bold">Dress Code</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 font-serif italic text-xl md:text-3xl">Batik / Formal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPForm;
