import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, AlertCircle, CheckCircle2, Phone, Loader2 } from 'lucide-react';
// @ts-ignore
import tgiLogo from './assets/images/tgi_official_logo_1783262467741.webp';

const WEB3FORMS_ACCESS_KEY = '0be382d4-29d4-4021-884c-566b01bc5355';

// تابع تبدیل اعداد انگلیسی به فارسی
const toPersianDigits = (num: string) => {
  const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.replace(/\d/g, (d) => persian[+d]);
};

interface AccordionItem {
  title: string;
  subtext: string;
  emoji: string;
  bullets: string[];
}

export default function App() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // فرم
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('اخذ اقامت و صدور انواع ویزا');

  // وضعیت ارسال
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const services: AccordionItem[] = [
    {
      title: 'اخذ اقامت و صدور انواع ویزا',
      subtext: 'کاری، نمایشگاهی، توریستی و مهاجرتی',
      emoji: '🌍',
      bullets: [
        'اخذ پذیرش، ویزاهای توریستی و کاری شینگن، کانادا، انگلیس و استرالیا.',
        'مشاوره تخصصی در نحوه ارائه و چیدمان مدارک به سفارت‌خانه‌ها جهت افزایش شانس پذیرش.',
        'پرداخت مستقیم و قانونی هزینه‌های ارزی ثبت‌نام سفارت.',
      ],
    },
    {
      title: 'ویزای تخصصی خلیج فارس',
      subtext: 'صدور فوری ویزای امارات (دبی)، عمان و قطر',
      emoji: '🌴',
      bullets: [
        'صدور مستقیم و بدون واسطه انواع ویزاهای توریستی و تجاری دبی.',
        'اخذ مجوزهای ورود و دعوت‌نامه‌های رسمی از عمان و قطر در کوتاه‌ترین زمان ممکن.',
        'پشتیبانی ویژه مسافران در طول سفر به صورت ۲۴ ساعته.',
      ],
    },
    {
      title: 'صدور بلیط پرواز',
      subtext: 'پروازهای داخلی و بین‌المللی با بهترین قیمت',
      emoji: '✈️',
      bullets: [
        'رزرو و صدور بلیط پروازهای داخلی و خارجی از معتبرترین ایرلاین‌ها.',
        'ارائه بهترین نرخ‌ها، مسیرهای متنوع و انتخاب مناسب بر اساس بودجه و زمان سفر.',
        'پشتیبانی برای تغییر تاریخ، استرداد بلیط و پیگیری امور پس از خرید.',
      ],
    },
    {
      title: 'رزرو لوکس‌ترین هتل‌های جهان',
      subtext: 'دسترسی به سیستم جهانی با قیمت رقابتی',
      emoji: '🏨',
      bullets: [
        'رزرو آنلاین هتل‌های معتبر دنیا به همراه صدور آنی واچر رسمی و قابل ارائه به سفارت.',
        'امکان هماهنگی ترانسفرهای لوکس فرودگاهی و گشت‌های شهری اختصاصی.',
        'بهترین قیمت‌های تضمین شده در مقایسه با سایر آژانس‌ها.',
      ],
    },
    {
      title: 'صدور گواهینامه بین‌المللی',
      subtext: 'صدور معتبر و قانونی ۱ تا ۳ ساله',
      emoji: '🚗',
      bullets: [
        'صدور سریع گواهینامه بین‌المللی خودرو منطبق بر قوانین کانون جهانگردی.',
        'قابل ارائه و معتبر برای رانندگی و اجاره خودرو در بیش از ۱۹۰ کشور دنیا.',
        'دفترچه چند زبانه رسمی بدون نیاز به ترجمه مدارک دیگر.',
      ],
    },
  ];

  const handleAccordionClick = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
      setSubject(services[index].title);
    }
  };

  const validateForm = () => {
    if (!fullName || fullName.trim().length < 3) {
      setSubmitError('لطفاً نام و نام خانوادگی خود را به صورت کامل (حداقل ۳ حرف) وارد کنید.');
      return false;
    }
    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.length !== 11 || !cleanPhone.startsWith('0')) {
      setSubmitError('لطفاً شماره تماس معتبر ۱۱ رقمی وارد کنید (مانند 09123456789).');
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;
    setIsSubmitting(true);

    const timestamp = new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' });

    // محتوای HTML برای ایمیل
    const htmlMessage = `
      <div dir="rtl" style="font-family: Tahoma; padding: 20px; background: #f9f9f9;">
        <h2 style="color: #19313d;">📞 درخواست مشاوره تلفنی</h2>
        <p><strong>نام متقاضی:</strong> ${fullName.trim()}</p>
        <p><strong>شماره تماس:</strong> ${phone.trim()}</p>
        <p><strong>موضوع مشاوره:</strong> ${subject}</p>
        <p><strong>زمان ثبت:</strong> ${timestamp}</p>
        <hr style="border: 1px solid #dfb86c;" />
        <p style="font-size: 12px; color: #666;">این ایمیل از طریق وب‌سایت تنها گشت ایرانیان ارسال شده است.</p>
      </div>
    `;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `درخواست مشاوره - ${fullName.trim()}`,
          from_name: 'تنها گشت ایرانیان',
          email: 'your-email@example.com',
          message: htmlMessage,
          html: true,
          fullName: fullName.trim(),
          phone: phone.trim(),
          subjectConsultation: subject,
          timestamp: timestamp,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitSuccess(true);
      } else {
        throw new Error(result.message || 'خطا در ارسال');
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <div className="min-h-screen bg-[#19313d] text-white flex flex-col justify-between py-6 px-4 relative select-none" id="app-root-container">
      <div className="w-full max-w-[480px] mx-auto border-2 border-[#dfb86c]/80 rounded-[32px] p-1.5 bg-transparent my-auto shadow-2xl">
        <div className="bg-[#19313d] border border-[#dfb86c]/40 rounded-[26px] p-5 md:p-6 space-y-6">
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.div
                key="main-landing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-right"
              >
                {/* لوگو */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full border border-[#dfb86c] overflow-hidden flex items-center justify-center bg-[#19313d] shadow-lg shadow-[#dfb86c]/5">
                    <img
                      src={tgiLogo}
                      alt="لوگو تنها گشت ایرانیان"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* برندینگ */}
                <div className="text-center space-y-1">
                  <h1 className="text-2xl font-black text-white tracking-tight leading-relaxed">
                    تنها گشت ایرانیان
                  </h1>
                  <p className="text-xs md:text-sm text-[#dfb86c] font-medium tracking-wide">
                    خدمات بین‌المللی مسافرتی و مهاجرتی
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#dfb86c] py-2">
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                  </div>
                  <h2 className="text-sm md:text-base font-bold text-white leading-relaxed">
                    جهان در دست شماست؛ بدون مرز، بدون دغدغه
                  </h2>
                </div>

                {/* آکاردئون خدمات */}
                <div className="space-y-4">
                  <p className="text-[11px] text-[#dfb86c] font-bold text-center flex items-center justify-center gap-1">
                    👇 برای مشاهده جزئیات و شرایط هر خدمت روی آن ضربه بزنید:
                  </p>
                  <div className="space-y-2.5">
                    {services.map((service, index) => {
                      const isExpanded = expandedIndex === index;
                      return (
                        <div
                          key={index}
                          className="border border-[#dfb86c]/20 rounded-xl overflow-hidden bg-[#13252e] transition-all"
                        >
                          <button
                            type="button"
                            onClick={() => handleAccordionClick(index)}
                            className="w-full p-3.5 flex flex-row items-center justify-between text-right gap-3 cursor-pointer hover:bg-[#1c3542] transition-all"
                            dir="rtl"
                          >
                            <div className="flex flex-row items-center gap-2.5 text-right min-w-0">
                              <span className="text-xl shrink-0" role="img" aria-label="service-icon">
                                {service.emoji}
                              </span>
                              <div className="text-right min-w-0">
                                <h3 className="text-xs font-bold text-white truncate leading-relaxed">
                                  {service.title}
                                </h3>
                                <p className="text-[10px] text-gray-400 font-medium truncate mt-0.5">
                                  {service.subtext}
                                </p>
                              </div>
                            </div>
                            <span className="text-[#dfb86c] text-[10px] shrink-0 font-bold">
                              {isExpanded ? '▲' : '▼'}
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden border-t border-[#dfb86c]/10"
                              >
                                <div className="p-4 bg-[#0f212a] space-y-3 text-right">
                                  <h4 className="text-[11px] font-bold text-[#dfb86c]">توضیحات خدمات:</h4>
                                  <ul className="space-y-2 text-[11px] text-gray-300 font-medium leading-relaxed list-none pr-1">
                                    {service.bullets.map((bullet, bIdx) => (
                                      <li key={bIdx} className="flex gap-2 items-start justify-start text-right">
                                        <span className="text-[#dfb86c] shrink-0 text-xs mt-0.5">🔸</span>
                                        <span>{bullet}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* باکس تبلیغاتی */}
                <div className="border border-[#dfb86c]/35 rounded-xl p-3.5 bg-[#13252e] space-y-1.5 text-right">
                  <div className="flex items-center gap-1.5 text-right text-white">
                    <span className="text-[#dfb86c] text-xs">✨</span>
                    <h3 className="text-xs font-bold text-[#dfb86c]">
                      همراه با تیم حرفه‌ای و مجرب تنها گشت
                    </h3>
                  </div>
                  <p className="text-[10.5px] text-gray-300 font-medium leading-relaxed">
                    تضمین منصفانه‌ترین قیمت‌ها، سرعت بالا در پاسخگویی و وفاداری کامل به تعهدات شما مسافرین ارجمند.
                  </p>
                </div>

                {/* فرم درخواست مشاوره */}
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
                  <h3 className="text-xs font-bold text-[#dfb86c] text-center flex items-center justify-center gap-1">
                    📞 درخواست رایگان مشاوره تلفنی فوری
                  </h3>

                  {submitError && (
                    <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-200 text-[11px] rounded-xl font-medium leading-relaxed flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1 text-right">
                        <label className="block text-[10px] text-gray-400 font-semibold">نام و نام خانوادگی</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="رضا احمدی"
                          className="w-full p-2.5 text-sm bg-[#0e212a] border border-[#dfb86c]/30 focus:border-[#dfb86c] focus:ring-1 focus:ring-[#dfb86c] rounded-xl text-white placeholder-gray-500 transition-all font-medium text-right"
                        />
                      </div>
                      <div className="space-y-1 text-right">
                        <label className="block text-[10px] text-gray-400 font-semibold">شماره تماس (همراه)</label>
                        <input
                          type="tel"
                          required
                          maxLength={11}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="09123456789"
                          className="w-full p-2.5 text-sm bg-[#0e212a] border border-[#dfb86c]/30 focus:border-[#dfb86c] focus:ring-1 focus:ring-[#dfb86c] rounded-xl text-white placeholder-gray-500 transition-all font-mono font-bold tracking-wider text-right"
                          dir="ltr"
                        />
                      </div>
                  </div>

                  <div className="space-y-1 text-right">
                    <label className="block text-[10px] text-gray-400 font-semibold">موضوع مورد نیاز جهت مشاوره</label>
                    <div className="relative">
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-2.5 text-xs bg-[#0e212a] border border-[#dfb86c]/30 focus:border-[#dfb86c] focus:ring-1 focus:ring-[#dfb86c] rounded-xl text-white transition-all font-medium cursor-pointer appearance-none pr-8"
                      >
                        {services.map((service, idx) => (
                          <option key={idx} value={service.title} className="bg-[#19313d] text-white">
                            {service.title}
                          </option>
                        ))}
                      </select>
                      {/* آیکون مثلث پایین (هم‌رنگ با آکاردئون) */}
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#dfb86c] text-xs pointer-events-none select-none">
                        ▼
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#dfb86c] hover:bg-[#d8ae5f] text-black font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs md:text-sm active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>در حال ارسال درخواست...</span>
                      </>
                    ) : (
                      <>
                        <span>ثبت درخواست و تماس کارشناس</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* صفحه موفقیت */
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-950/20 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-extrabold text-white">درخواست شما با موفقیت ثبت شد!</h2>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium">
                    اطلاعات شما با موفقیت برای کارشناسان سفر{' '}
                    <span className="text-[#dfb86c] font-bold">تنها گشت ایرانیان</span> ارسال گردید. به زودی جهت هماهنگی
                    با شما تماس خواهیم گرفت.
                  </p>
                </div>
                <div className="bg-[#13252e] border border-[#dfb86c]/20 rounded-xl p-4 space-y-3 text-right">
                  <h3 className="text-[11px] font-bold text-[#dfb86c] border-b border-[#dfb86c]/10 pb-2">
                    خلاصه درخواست مشاوره:
                  </h3>
                  <div className="space-y-2 text-[11px] text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-gray-400">نام متقاضی:</span>
                      <span className="font-bold text-white">{fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">شماره تماس:</span>
                      <span className="font-mono text-white" dir="ltr">
                        {phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">موضوع مشاوره:</span>
                      <span className="font-bold text-[#dfb86c]">{subject}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full py-2.5 bg-[#dfb86c]/15 hover:bg-[#dfb86c]/25 text-[#dfb86c] border border-[#dfb86c]/30 font-bold rounded-xl transition-all cursor-pointer text-xs"
                >
                  ثبت درخواست جدید یا اصلاح اطلاعات
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* فوتر با شماره تماس فارسی */}
          <div className="space-y-4 pt-4 border-t border-[#dfb86c]/15 text-center">
            <div className="space-y-2">
              <p className="text-[10px] text-gray-400 font-medium">جهت کسب اطلاعات بیشتر با ما تماس بگیرید</p>
              <a
                href="tel:+989021649171"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full border-2 border-[#dfb86c] text-[#dfb86c] hover:bg-[#dfb86c]/10 transition-all font-mono font-bold text-lg shadow-lg hover:scale-[1.03] active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">+98 902 164 9171</span>
              </a>
            </div>
            <p className="text-[9px] text-gray-500 font-medium leading-relaxed">
              حقوق معنوی محفوظ و متعلق به شرکت تنها گشت ایرانیان می‌باشد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}