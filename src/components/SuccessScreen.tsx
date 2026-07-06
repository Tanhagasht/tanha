import { motion } from 'motion/react';
import { CheckCircle2, PhoneCall, Calendar, MapPin, Users, HeartHandshake } from 'lucide-react';
import { ServiceType } from '../types';

interface SuccessScreenProps {
  serviceType: ServiceType;
  formData: any;
  onReset: () => void;
}

export default function SuccessScreen({ serviceType, formData, onReset }: SuccessScreenProps) {
  // Helper to translate service type to Persian
  const getServiceName = (type: ServiceType) => {
    switch (type) {
      case 'tour': return 'درخواست تور مسافرتی';
      case 'flight-hotel': return 'درخواست پرواز و هتل';
      case 'visa': return 'تقاضای خدمات ویزا';
      case 'consultation': return 'درخواست مشاوره مسافرتی';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden text-right"
      id="success-screen-card"
    >
      {/* Visual Top Branding banner */}
      <div className="h-3 bg-emerald-500 w-full" />
      
      <div className="p-8 md:p-12 space-y-8 flex flex-col items-center text-center">
        {/* Animated Check icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-200 shadow-md"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-900 font-sans">
            درخواست شما با موفقیت ارسال شد!
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-lg mx-auto font-medium">
            اطلاعات شما با موفقیت برای کارشناسان سفر <span className="text-brand-700 font-bold">تنها گشت ایرانیان</span> ارسال گردید. به زودی از طریق تماس تلفنی یا واتساپ جهت هماهنگی با شما ارتباط برقرار خواهیم کرد.
          </p>
        </div>

        {/* Request Brief Summary card */}
        <div className="w-full bg-slate-50 rounded-2xl p-5 border border-slate-100 text-right space-y-4">
          <h3 className="text-sm font-bold text-slate-500 border-b border-slate-200/60 pb-2">
            خلاصه درخواست ارسال شده ({getServiceName(serviceType)}):
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100">
              <Users className="w-4 h-4 text-brand-600" />
              <span><strong>نام متقاضی:</strong> {formData.fullName || formData.name || 'نامشخص'}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100">
              <PhoneCall className="w-4 h-4 text-brand-600" />
              <span><strong>شماره تماس:</strong> <span className="font-mono text-xs">{formData.phone || 'نامشخص'}</span></span>
            </div>

            {/* Conditional Details based on type */}
            {serviceType === 'tour' && (
              <>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span><strong>مقصد سفر:</strong> {formData.destination || 'نامشخص'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <span><strong>تاریخ سفر:</strong> {formData.travelDate || 'نامشخص'}</span>
                </div>
              </>
            )}

            {serviceType === 'flight-hotel' && (
              <>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span><strong>مسیر پرواز:</strong> {formData.origin || 'نامشخص'} به {formData.destination || 'نامشخص'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <span><strong>تاریخ رفت:</strong> {formData.departureDate || 'نامشخص'}</span>
                </div>
              </>
            )}

            {serviceType === 'visa' && (
              <>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span><strong>ویزای کشور:</strong> {formData.destinationCountry || 'نامشخص'}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100">
                  <Users className="w-4 h-4 text-brand-600" />
                  <span><strong>تعداد متقاضیان:</strong> {formData.applicantCount || 1} نفر</span>
                </div>
              </>
            )}

            {serviceType === 'consultation' && (
              <>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100 md:col-span-2">
                  <HeartHandshake className="w-4 h-4 text-brand-600" />
                  <span><strong>موضوع مشاوره:</strong> {formData.subject || 'مشاوره کلی سفر'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onReset}
          className="px-8 py-3 bg-brand-900 hover:bg-brand-800 text-white font-bold rounded-2xl transition-all shadow-md shadow-brand-100 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          id="submit-another-btn"
        >
          ثبت درخواست یا رزرو جدید
        </button>
      </div>
    </motion.div>
  );
}
