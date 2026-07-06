import React, { useState } from 'react';
import { FlightHotelFormData } from '../types';
import { User, Phone, MapPin, Calendar, BedDouble, Utensils, PlaneTakeoff, Info, FileText } from 'lucide-react';

interface FlightHotelFormProps {
  onSubmit: (data: FlightHotelFormData) => void;
  isSubmitting: boolean;
}

export default function FlightHotelForm({ onSubmit, isSubmitting }: FlightHotelFormProps) {
  const [formData, setFormData] = useState<FlightHotelFormData>({
    fullName: '',
    phone: '',
    flightType: 'round-trip',
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    flightClass: 'economy',
    roomType: 'double',
    mealPlan: 'breakfast',
    additionalDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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
    <form onSubmit={handleSubmit} className="space-y-6 text-right" id="flight-hotel-form">
      {/* Representative Details Section */}
      <div className="bg-brand-50/50 p-4 md:p-5 rounded-2xl border border-brand-100/60 space-y-4">
        <h3 className="text-sm font-bold text-brand-900 border-r-4 border-brand-500 pr-2">
          اطلاعات تماس مسافر اصلی
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
                placeholder="مثال: مریم کاظمی"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="fh-fullName"
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
                id="fh-phone"
              />
              <Phone className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Flight Path Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-brand-900 border-r-4 border-accent-500 pr-2">
            جزئیات بلیط هواپیما
          </h3>
          {/* Flight Type Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, flightType: 'round-trip' }))}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                formData.flightType === 'round-trip'
                  ? 'bg-white text-brand-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              رفت و برگشت
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, flightType: 'one-way' }))}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                formData.flightType === 'one-way'
                  ? 'bg-white text-brand-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              فقط رفت
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Origin */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">مبدا پرواز:</label>
            <div className="relative">
              <input
                type="text"
                name="origin"
                required
                value={formData.origin}
                onChange={handleChange}
                placeholder="مثال: شیراز"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="fh-origin"
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">مقصد پرواز:</label>
            <div className="relative">
              <input
                type="text"
                name="destination"
                required
                value={formData.destination}
                onChange={handleChange}
                placeholder="مثال: دبی"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="fh-destination"
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Departure Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 block">تاریخ رفت:</label>
            <div className="relative">
              <input
                type="text"
                name="departureDate"
                required
                value={formData.departureDate}
                onChange={handleChange}
                placeholder="مثال: ۲۵ مهر یا ۱۴۰۵/۰۷/۲۵"
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
                id="fh-departureDate"
              />
              <Calendar className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Return Date - conditional */}
          <div className="space-y-1.5">
            <label className={`text-xs font-semibold block ${formData.flightType === 'one-way' ? 'text-slate-300' : 'text-slate-600'}`}>
              تاریخ برگشت:
            </label>
            <div className="relative">
              <input
                type="text"
                name="returnDate"
                required={formData.flightType === 'round-trip'}
                disabled={formData.flightType === 'one-way'}
                value={formData.flightType === 'one-way' ? '' : formData.returnDate}
                onChange={handleChange}
                placeholder={formData.flightType === 'one-way' ? 'بدون نیاز به برگشت' : 'مثال: ۲ آبان'}
                className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-100"
                id="fh-returnDate"
              />
              <Calendar className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        {/* Flight Class */}
        <div className="space-y-1.5 text-right">
          <label className="text-xs font-bold text-slate-700 block flex items-center gap-1">
            <PlaneTakeoff className="w-3.5 h-3.5 text-brand-600" />
            <span>کلاس پروازی:</span>
          </label>
          <select
            name="flightClass"
            value={formData.flightClass}
            onChange={handleChange}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500"
            id="fh-flightClass"
          >
            <option value="economy">اکونومی (اقتصادی)</option>
            <option value="business">بیزینس (تجاری)</option>
            <option value="first">فرست کلاس (لوکس)</option>
          </select>
        </div>

        {/* Hotel Room Type */}
        <div className="space-y-1.5 text-right">
          <label className="text-xs font-bold text-slate-700 block flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5 text-brand-600" />
            <span>نوع اتاق هتل:</span>
          </label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500"
            id="fh-roomType"
          >
            <option value="single">اتاق یک تخته (Single)</option>
            <option value="double">اتاق دو تخته (Double/Twin)</option>
            <option value="triple">اتاق سه تخته (Triple)</option>
            <option value="family">اتاق خانوادگی (Family Suite)</option>
          </select>
        </div>

        {/* Hotel Meal Plan */}
        <div className="space-y-1.5 text-right">
          <label className="text-xs font-bold text-slate-700 block flex items-center gap-1">
            <Utensils className="w-3.5 h-3.5 text-brand-600" />
            <span>وعده غذایی هتل:</span>
          </label>
          <select
            name="mealPlan"
            value={formData.mealPlan}
            onChange={handleChange}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500"
            id="fh-mealPlan"
          >
            <option value="room-only">فقط اتاق (بدون غذا)</option>
            <option value="breakfast">با صبحانه (BB)</option>
            <option value="half-board">صبحانه و ناهار/شام (HB)</option>
            <option value="all-inclusive">صبحانه، ناهار، شام، نوشیدنی (All/UAll)</option>
          </select>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-600 block">توضیحات بیشتر (نام هتل مد نظر، ایرلاین خاص و...):</label>
        <div className="relative">
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            placeholder="مثال: ترجیحاً پرواز ماهان یا هتل خاصی مد نظرم است. تعداد مسافران ۳ بزرگسال است."
            rows={3}
            className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm text-slate-800 font-medium"
            id="fh-details"
          />
          <FileText className="absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-brand-900 hover:bg-brand-800 text-white font-bold rounded-2xl shadow-lg shadow-brand-100 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed"
        id="fh-submit-btn"
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
          <span>ارسال درخواست پرواز و هتل</span>
        )}
      </button>
    </form>
  );
}
