import React, { useState } from 'react';
import { TourFormData } from '../types';
import { User, Phone, MapPin, Calendar, Clock, Star, Plane, Train, Bus, Plus, Minus, FileText } from 'lucide-react';

interface TourFormProps {
  onSubmit: (data: TourFormData) => void;
  isSubmitting: boolean;
}

export default function TourForm({ onSubmit, isSubmitting }: TourFormProps) {
  const [formData, setFormData] = useState<TourFormData>({
    fullName: '',
    phone: '',
    origin: '',
    destination: '',
    travelDate: '',
    duration: '',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    hotelStars: 'any',
    transportType: 'any',
    additionalDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePassengerChange = (type: 'adults' | 'children' | 'infants', operation: 'inc' | 'dec') => {
    setFormData(prev => {
      const currentValue = prev.passengers[type];
      let newValue = operation === 'inc' ? currentValue + 1 : currentValue - 1;
      
      // Validation limits
      if (type === 'adults' && newValue < 1) newValue = 1;
      if (type !== 'adults' && newValue < 0) newValue = 0;
      if (newValue > 15) newValue = 15;

      return {
        ...prev,
        passengers: {
          ...prev.passengers,
          [type]: newValue
        }
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-right" id="tour-booking-form">
      {/* Representative Details Section */}
      <div className="bg-brand-50/50 p-4 md:p-5 rounded-2xl border border-brand-100/60 space-y-4">
        <h3 className="text-sm font-bold text-brand-900 border-r-4 border-brand-500 pr-2">
          اطلاعات نماینده مسافران
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
                placeholder="مثال: علیرضا محمدی"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="tour-fullName"
              />
              <User className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">شماره تماس (ترجیحاً دارای واتساپ):</label>
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
                id="tour-phone"
              />
              <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Travel Details Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-brand-900 border-r-4 border-accent-500 pr-2">
          جزئیات سفر و مقصد
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origin */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">مبدا حرکت:</label>
            <div className="relative">
              <input
                type="text"
                name="origin"
                required
                value={formData.origin}
                onChange={handleChange}
                placeholder="مثال: تهران"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="tour-origin"
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">مقصد مورد نظر:</label>
            <div className="relative">
              <input
                type="text"
                name="destination"
                required
                value={formData.destination}
                onChange={handleChange}
                placeholder="مثال: استانبول، کیش، دبی"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="tour-destination"
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Travel Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">تاریخ حدودی سفر:</label>
            <div className="relative">
              <input
                type="text"
                name="travelDate"
                required
                value={formData.travelDate}
                onChange={handleChange}
                placeholder="مثال: نیمه دوم مرداد یا ۱۴۰۵/۰۵/۲۰"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="tour-travelDate"
              />
              <Calendar className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">مدت اقامت مد نظر:</label>
            <div className="relative">
              <input
                type="text"
                name="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                placeholder="مثال: ۳ شب، ۵ شب، ۷ شب"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="tour-duration"
              />
              <Clock className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Passengers count with custom counter elements */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
        <label className="text-xs font-bold text-slate-700 block">تعداد مسافران:</label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Adults */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between">
            <div className="text-right">
              <span className="text-sm font-semibold text-slate-700 block">بزرگسال</span>
              <span className="text-[10px] text-slate-400">۱۲ سال به بالا</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePassengerChange('adults', 'dec')}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-mono text-sm font-bold text-brand-900">{formData.passengers.adults}</span>
              <button
                type="button"
                onClick={() => handlePassengerChange('adults', 'inc')}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between">
            <div className="text-right">
              <span className="text-sm font-semibold text-slate-700 block">کودک</span>
              <span className="text-[10px] text-slate-400">۲ تا ۱۲ سال</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePassengerChange('children', 'dec')}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-mono text-sm font-bold text-brand-900">{formData.passengers.children}</span>
              <button
                type="button"
                onClick={() => handlePassengerChange('children', 'inc')}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/60 flex items-center justify-between">
            <div className="text-right">
              <span className="text-sm font-semibold text-slate-700 block">نوزاد</span>
              <span className="text-[10px] text-slate-400">زیر ۲ سال</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePassengerChange('infants', 'dec')}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-mono text-sm font-bold text-brand-900">{formData.passengers.infants}</span>
              <button
                type="button"
                onClick={() => handlePassengerChange('infants', 'inc')}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Section (Hotel Rating & Transport) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hotel Preference */}
        <div className="space-y-1.5 text-right">
          <label className="text-xs font-semibold text-slate-600 block">درجه هتل مورد نظر:</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: '5', label: '۵ ستاره' },
              { value: '4', label: '۴ ستاره' },
              { value: '3', label: '۳ ستاره' },
              { value: 'any', label: 'اقتصادی / هرکدام' }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, hotelStars: option.value }))}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  formData.hotelStars === option.value
                    ? 'bg-brand-900 text-white border-brand-900 shadow-md shadow-brand-100'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {option.value !== 'any' && <Star className="w-3 h-3 inline-block ml-1 text-amber-500 fill-amber-500" />}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transportation Preference */}
        <div className="space-y-1.5 text-right">
          <label className="text-xs font-semibold text-slate-600 block">نوع وسیله نقلیه پیشنهادی:</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: 'air', label: 'هوایی', icon: Plane },
              { value: 'train', label: 'قطار', icon: Train },
              { value: 'bus', label: 'اتوبوس', icon: Bus },
              { value: 'any', label: 'فرقی ندارد', icon: null }
            ].map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, transportType: option.value }))}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
                    formData.transportType === option.value
                      ? 'bg-brand-900 text-white border-brand-900 shadow-md shadow-brand-100'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-600 block">توضیحات یا نیازمندی‌های خاص:</label>
        <div className="relative">
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            placeholder="مثال: ترانسفر فرودگاهی مجزا، گشت‌های شهری، رزرو هتل رو به دریا، تور اقساطی یا..."
            rows={3}
            className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
            id="tour-details"
          />
          <FileText className="absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-brand-900 hover:bg-brand-800 text-white font-bold rounded-2xl shadow-lg shadow-brand-100 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
        id="tour-submit-btn"
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
          <span>ارسال درخواست تور مسافرتی</span>
        )}
      </button>
    </form>
  );
}
