import React, { useState, useEffect } from 'react';
import { Settings, Key, Copy, Check, ExternalLink, HelpCircle, X, ShieldAlert } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessKey: string;
  onSaveKey: (key: string) => void;
}

export default function SettingsModal({ isOpen, onClose, accessKey, onSaveKey }: SettingsModalProps) {
  const [keyInput, setKeyInput] = useState(accessKey);
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setKeyInput(accessKey);
  }, [accessKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose(); // Automatically close after save for great UX!
    }, 1500);
  };

  const shareableLink = `${window.location.origin}${window.location.pathname}?key=${accessKey || 'YOUR_KEY_HERE'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all text-right"
      id="settings-modal-container"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#090d1a] border-2 border-[#dfb86c] rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
        id="settings-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#dfb86c]/20 bg-[#0a1022]">
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            aria-label="بستن"
            id="close-settings-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#dfb86c]" />
            <h2 className="text-sm font-bold text-white">تنظیمات کلید ارسال ایمیل Web3Forms</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[80vh] text-right">
          
          {/* Instruction Box */}
          <div className="p-4 bg-[#0d162d] border-r-4 border-[#dfb86c] rounded-xl text-xs text-gray-300 leading-relaxed space-y-2">
            <div className="flex items-center gap-1.5 text-[#dfb86c] font-bold mb-1">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>چگونه فرم را فعال کنیم؟</span>
            </div>
            <p className="leading-relaxed">
              این لندینگ‌پیج بدون نیاز به کدنویسی سرور یا پایگاه داده، اطلاعات کاربران را به صورت امن و مستقیم به ایمیل شما (<span className="text-[#dfb86c] font-bold font-mono">tanhagashtiranian@gmail.com</span>) ارسال می‌کند.
            </p>
            <ol className="list-decimal list-inside pr-1 space-y-1.5 text-gray-400">
              <li>ابتدا به وب‌سایت رسمی <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="text-[#dfb86c] hover:underline inline-flex items-center gap-0.5 font-bold">web3forms.com <ExternalLink className="w-3 h-3" /></a> بروید.</li>
              <li>ایمیل خود را ثبت کنید تا یک <strong>Access Key</strong> رایگان به ایمیل شما ارسال شود.</li>
              <li>کلید دریافتی را کپی کرده و در کادر زیر قرار دهید.</li>
            </ol>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <label className="block text-xs font-bold text-[#dfb86c]">
                کلید دسترسی Web3Forms (Access Key):
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="مثال: e2b60ca7-53c8-47bc-ba58-94770fc56bc9"
                  className="w-full pl-3 pr-10 py-2.5 bg-[#050915] border border-[#dfb86c]/30 rounded-xl font-mono text-xs text-white placeholder-gray-600 focus:border-[#dfb86c] focus:ring-1 focus:ring-[#dfb86c] transition-all text-left"
                  dir="ltr"
                  id="access-key-input"
                />
                <Key className="absolute right-3.5 top-3 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-2 cursor-pointer ${
                saveSuccess 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#dfb86c] hover:bg-[#d8ae5f] text-black shadow-md shadow-[#dfb86c]/10'
              }`}
              id="save-key-btn"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>کلید با موفقیت در این مرورگر ذخیره شد!</span>
                </>
              ) : (
                <span>ذخیره تنظیمات روی این مرورگر</span>
              )}
            </button>
          </form>

          {/* Share Section */}
          <div className="pt-4 border-t border-[#dfb86c]/15 space-y-2">
            <div className="flex items-center gap-1.5 text-white font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-[#dfb86c]" />
              <span>ساخت تک‌لینک اختصاصی شرکت</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              با کلیک روی دکمه زیر می‌توانید <strong>تک‌لینک اختصاصی</strong> خود را کپی کنید. اگر مشتریان این لینک را باز کنند، فرم مستقیماً به ایمیل شما متصل خواهد بود و نیازی به ذخیره کلید روی گوشی آن‌ها نیست! این لینک را در بیو پیج اینستاگرام، کانال تلگرام یا استاتوس واتساپ خود قرار دهید.
            </p>

            <div className="p-3 bg-[#050915] border border-[#dfb86c]/20 rounded-xl flex flex-col gap-2">
              <div className="text-[10px] font-mono text-gray-500 truncate text-left" dir="ltr">
                {shareableLink}
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                disabled={!accessKey}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  !accessKey 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                    : copied 
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/50' 
                      : 'bg-transparent text-[#dfb86c] hover:bg-[#dfb86c]/10 border border-[#dfb86c]/30'
                }`}
                id="copy-share-link-btn"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تک‌لینک اختصاصی کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>کپی تک‌لینک اختصاصی ادمین</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
