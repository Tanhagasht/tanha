import React, { useState } from 'react';
import { VisaFormData } from '../types';
import { User, Phone, MapPin, Briefcase, DollarSign, Users, HelpCircle, FileText } from 'lucide-react';

interface VisaFormProps {
  onSubmit: (data: VisaFormData) => void;
  isSubmitting: boolean;
}

export default function VisaForm({ onSubmit, isSubmitting }: VisaFormProps) {
  const [formData, setFormData] = useState<VisaFormData>({
    fullName: '',
    phone: '',
    destinationCountry: '',
    visaType: 'tourist',
    applicantCount: 1,
    jobTitle: '',
    financialStatus: '',
    additionalDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-right" id="visa-request-form">
      {/* Contact Section */}
      <div className="bg-brand-50/50 p-4 md:p-5 rounded-2xl border border-brand-100/60 space-y-4">
        <h3 className="text-sm font-bold text-brand-900 border-r-4 border-brand-500 pr-2">
          اطلاعات فرد متقاضی ویزا
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">نام و نام خانوادگی:</label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="مثال: رضا احمدی"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="visa-fullName"
              />
              <User className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">شماره تماس (همراه):</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="مثال: 09123456789"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium text-left"
                dir="ltr"
                id="visa-phone"
              />
              <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Destination & Visa Specifications */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-brand-900 border-r-4 border-accent-500 pr-2">
          مشخصات درخواست ویزا
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Destination Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">کشور مقصد جهت اخذ ویزا:</label>
            <div className="relative">
              <input
                type="text"
                name="destinationCountry"
                required
                value={formData.destinationCountry}
                onChange={handleChange}
                placeholder="مثال: شینگن (فرانسه)، کانادا، ژاپن، انگلیس"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="visa-destinationCountry"
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Applicant Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">تعداد متقاضیان ویزا:</label>
            <div className="relative">
              <input
                type="number"
                name="applicantCount"
                required
                min={1}
                max={50}
                value={formData.applicantCount}
                onChange={handleChange}
                placeholder="مثال: 2"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium text-left font-mono"
                dir="ltr"
                id="visa-applicantCount"
              />
              <Users className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Visa Type Buttons */}
        <div className="space-y-1.5 text-right">
          <label className="text-xs font-semibold text-slate-600 block">نوع ویزای درخواستی:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { value: 'tourist', label: 'توریستی (گردشگری)' },
              { value: 'business', label: 'تجاری (کار)' },
              { value: 'study', label: 'تحصیلی (دانشجویی)' },
              { value: 'other', label: 'سایر موارد' }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelectChange('visaType', option.value)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  formData.visaType === option.value
                    ? 'bg-brand-900 text-white border-brand-900 shadow-md shadow-brand-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applicant Eligibility Profile */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-brand-600" />
          <span>شرایط کلی متقاضی (جهت مشاوره دقیق‌تر سفارت)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">شغل فعلی متقاضی (مثال: کارمند، پزشک، مهندس، بازنشسته):</label>
            <div className="relative">
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="مثال: پزشک عمومی، یا مالک شرکت بازرگانی"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="visa-jobTitle"
              />
              <Briefcase className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Financial Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">میزان تمکن مالی حدودی (بر حسب میلیون تومان یا دلار):</label>
            <div className="relative">
              <input
                type="text"
                name="financialStatus"
                value={formData.financialStatus}
                onChange={handleChange}
                placeholder="مثال: تمکن مالی بالای ۵۰۰ میلیون تومان، دارای سند ملکی"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="visa-financialStatus"
              />
              <DollarSign className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-600 block">سابقه سفر قبلی یا توضیحات دیگر (مثلا: ویزای شینگن قبلی، ویزای دبی و...):</label>
        <div className="relative">
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            placeholder="مثال: دارای ۲ ویزای شینگن در ۳ سال گذشته و ۱ سفر به ژاپن هستم. دعوت‌نامه معتبر هم دارم."
            rows={3}
            className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
            id="visa-details"
          />
          <FileText className="absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-brand-900 hover:bg-brand-800 text-white font-bold rounded-2xl shadow-lg shadow-brand-100 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
        id="visa-submit-btn"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>در حال ارسال اطلاعات...</span>
          </>
        ) : (
          <span>ارسال فرم تقاضای خدمات ویزا</span>
        )}
      </button>
    </form>
  );
}
