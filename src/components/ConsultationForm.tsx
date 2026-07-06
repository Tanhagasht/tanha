import React, { useState } from 'react';
import { ConsultationFormData } from '../types';
import { User, Phone, HelpCircle, FileText, Smartphone, Send } from 'lucide-react';

interface ConsultationFormProps {
  onSubmit: (data: ConsultationFormData) => void;
  isSubmitting: boolean;
}

export default function ConsultationForm({ onSubmit, isSubmitting }: ConsultationFormProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    phone: '',
    subject: '',
    preferredContact: 'phone',
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
    <form onSubmit={handleSubmit} className="space-y-6 text-right" id="consultation-form">
      {/* Contact Section */}
      <div className="bg-brand-50/50 p-4 md:p-5 rounded-2xl border border-brand-100/60 space-y-4">
        <h3 className="text-sm font-bold text-brand-900 border-r-4 border-brand-500 pr-2">
          مشخصات فرد متقاضی مشاوره
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">نام و نام خانوادگی شما:</label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="مثال: حمیدرضا کریمی"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="consult-fullName"
              />
              <User className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">شماره تماس (جهت تماس کارشناس):</label>
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
                id="consult-phone"
              />
              <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Subject and Contact Method */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-brand-900 border-r-4 border-accent-500 pr-2">
          موضوع و نحوه ارتباط
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">موضوع مشاوره:</label>
            <div className="relative">
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="مثال: مشاوره خرید تور اقساطی یا هماهنگی هتل و..."
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="consult-subject"
              />
              <HelpCircle className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-1.5 text-right">
            <label className="text-xs font-semibold text-slate-600 block">روش ترجیحی برای تماس کارشناس با شما:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'phone', label: 'تماس تلفنی' },
                { value: 'whatsapp', label: 'واتساپ' },
                { value: 'telegram', label: 'تلگرام' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelectChange('preferredContact', option.value)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    formData.preferredContact === option.value
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
      </div>

      {/* Question Details */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-600 block">توضیحات یا شرح پرسش شما:</label>
        <div className="relative">
          <textarea
            name="additionalDetails"
            required
            value={formData.additionalDetails}
            onChange={handleChange}
            placeholder="لطفاً پرسش، شرایط یا نیازمندی‌های مسافرتی خود را به طور کامل بنویسید تا کارشناس با آمادگی کامل با شما تماس بگیرد."
            rows={4}
            className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
            id="consult-details"
          />
          <FileText className="absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-brand-900 hover:bg-brand-800 text-white font-bold rounded-2xl shadow-lg shadow-brand-100 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
        id="consult-submit-btn"
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
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            <span>ارسال درخواست مشاوره سفر</span>
          </span>
        )}
      </button>
    </form>
  );
}
