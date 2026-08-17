import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Campaign, DonationIntent, Currency, DonationFrequency } from '../../types/foundation';
import { paymentService } from '../../services/paymentService';
import {
  Heart,
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Building2,
  Smartphone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Receipt,
  Download,
} from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: Campaign[];
  defaultCampaignId?: string;
  onDonationSuccess: (amount: number, campaignId?: string) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  defaultCampaignId,
  onDonationSuccess,
}) => {
  const { language, t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [frequency, setFrequency] = useState<DonationFrequency>('one-time');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(defaultCampaignId || 'general');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  // Donor Details
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [dedicationMessage, setDedicationMessage] = useState<string>('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedDonation, setCompletedDonation] = useState<{
    transactionId: string;
    receiptNumber: string;
    amount: number;
    currency: string;
  } | null>(null);

  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const presetAmounts = [25, 50, 100, 250, 500, 1000];

  const handleSelectAmount = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setAmount(parseInt(val, 10));
    }
  };

  const handleProcessDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    if (!isAnonymous && !donorEmail) return;

    setIsProcessing(true);

    const intent: DonationIntent = {
      amount,
      currency,
      frequency,
      campaignId: selectedCampaignId === 'general' ? undefined : selectedCampaignId,
      donorName: isAnonymous ? 'فاعل خير' : donorName || 'فاعل خير',
      donorEmail: isAnonymous ? 'anonymous@askiafoundation.org' : donorEmail,
      isAnonymous,
      message: dedicationMessage,
      paymentMethod,
    };

    try {
      const result = await paymentService.processDonation(intent);
      if (result.success && result.transactionId && result.receiptNumber) {
        setCompletedDonation({
          transactionId: result.transactionId,
          receiptNumber: result.receiptNumber,
          amount,
          currency,
        });
        onDonationSuccess(amount, intent.campaignId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyTransaction = () => {
    if (!completedDonation) return;
    navigator.clipboard.writeText(completedDonation.transactionId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setCompletedDonation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-scaleUp text-stone-200">
        {/* Modal Header */}
        <div className="p-6 bg-stone-900/80 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {t.donation.modalTitle}
              </h3>
              <p className="text-xs text-stone-400">
                مؤسسة الملك اسكيا الخيرية • Sahel Relief Fund
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Step 1 & 2: Donation Configuration */}
          {!completedDonation ? (
            <form onSubmit={handleProcessDonation} className="space-y-6">
              {/* Frequency Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  تكرار العطاء
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                      frequency === 'one-time'
                        ? 'bg-red-600 text-white border-red-500 shadow-md'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {t.donation.oneTime}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                      frequency === 'monthly'
                        ? 'bg-red-600 text-white border-red-500 shadow-md'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {t.donation.monthly} (أثر مستدام)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('annual')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                      frequency === 'annual'
                        ? 'bg-red-600 text-white border-red-500 shadow-md'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {t.donation.annually}
                  </button>
                </div>
              </div>

              {/* Target Campaign Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  توجيه التبرع والمشروع
                </label>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-bold"
                >
                  <option value="general">صندوق الطوارئ العام للساحل (أولوية الميدان)</option>
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title[language] || c.title.ar} ({c.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency & Amount Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    {t.donation.amount}
                  </label>
                  <div className="flex items-center gap-1 text-xs font-mono">
                    {(['USD', 'EUR', 'XOF', 'SAR', 'AED'] as Currency[]).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          currency === curr ? 'bg-red-600 text-white' : 'bg-stone-900 text-stone-400'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {presetAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleSelectAmount(val)}
                      className={`py-3 rounded-xl text-sm font-black font-mono transition border ${
                        amount === val && !customAmount
                          ? 'bg-red-600 text-white border-red-500 shadow-md'
                          : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder={t.donation.customAmount}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                  <div className="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 font-mono">
                    {currency}
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  {t.donation.paymentMethod}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-start transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'bg-red-950/40 border-red-600 text-white'
                        : 'bg-stone-900 border-stone-800 text-stone-400'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-red-400" />
                    <span className="text-[11px] font-bold">بطاقة ائتمان / مدى</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile_money')}
                    className={`p-3 rounded-xl border text-start transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'mobile_money'
                        ? 'bg-red-950/40 border-red-600 text-white'
                        : 'bg-stone-900 border-stone-800 text-stone-400'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-400" />
                    <span className="text-[11px] font-bold">Orange / Wave Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border text-start transition flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'bank'
                        ? 'bg-red-950/40 border-red-600 text-white'
                        : 'bg-stone-900 border-stone-800 text-stone-400'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-blue-400" />
                    <span className="text-[11px] font-bold">تحويل بنكي رسمي</span>
                  </button>
                </div>
              </div>

              {/* Donor Details */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    بيانات المتبرع
                  </label>
                  <label className="flex items-center gap-2 text-xs text-stone-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded bg-stone-900 border-stone-700 text-red-600 focus:ring-0"
                    />
                    <span>{t.donation.anonymous}</span>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={t.donation.fullName}
                      className="bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="email"
                      required={!isAnonymous}
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder={t.donation.email}
                      className="bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                )}

                <input
                  type="text"
                  value={dedicationMessage}
                  onChange={(e) => setDedicationMessage(e.target.value)}
                  placeholder="إهداء أو نية خاصة (مثال: صدقة جارية عن الوالدين)..."
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Trust Badge */}
              <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 flex items-center gap-3 text-xs text-stone-400">
                <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t.donation.securityNote}</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-xl shadow-red-950/60 border border-red-500/40 transition disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.donation.processing}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>
                      إتمام التبرع بمبلغ {amount} {currency}
                    </span>
                  </span>
                )}
              </button>
            </form>
          ) : (
            /* Step 3: Success Receipt View */
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  {t.donation.successTitle}
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                  {t.donation.successSubtitle}
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-start space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-stone-400">
                  <span className="flex items-center gap-1 font-bold text-white">
                    <Receipt className="w-4 h-4 text-red-500" />
                    <span>سند تبرع معتمد</span>
                  </span>
                  <span>{completedDonation.receiptNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-400">المبلغ المتبرع به:</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {completedDonation.amount} {completedDonation.currency}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-400">رقم المعاملة:</span>
                  <div className="flex items-center gap-1">
                    <span className="text-stone-300">{completedDonation.transactionId}</span>
                    <button
                      onClick={handleCopyTransaction}
                      className="p-1 hover:text-white transition"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-400">التاريخ:</span>
                  <span className="text-stone-300">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition border border-stone-700"
              >
                {t.donation.done}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
