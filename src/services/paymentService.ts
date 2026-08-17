import { DonationTransaction, DonationIntent, CountryCode, Sector, Currency } from '../types/foundation';

export interface PaymentRequest {
  amount: number;
  currency: Currency;
  frequency?: string;
  cause?: Sector | 'general';
  targetCountry?: CountryCode;
  campaignId?: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorCountry?: string;
  isAnonymous: boolean;
  paymentMethod: string;
  dedicationMessage?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  receiptNumber: string;
  message: string;
  transaction?: DonationTransaction;
}

export function generateReceiptNumber(): string {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `ASK-${year}-DON-${randomDigits}`;
}

export const paymentService = {
  async processDonation(intent: DonationIntent): Promise<PaymentResponse> {
    // Simulate real network transaction latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const receiptNumber = generateReceiptNumber();
    const transactionId = `tx_askia_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const transaction: DonationTransaction = {
      id: transactionId,
      transactionId,
      receiptNumber,
      amount: intent.amount,
      currency: intent.currency,
      donorName: intent.isAnonymous ? 'فاعل خير (Anonymous)' : intent.donorName || 'فاعل خير',
      donorEmail: intent.donorEmail,
      isAnonymous: intent.isAnonymous,
      paymentMethod: intent.paymentMethod,
      campaignId: intent.campaignId,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      transactionId,
      receiptNumber,
      message: 'Donation processed successfully in safe verified mode.',
      transaction,
    };
  },
};

export async function executeDonationPayment(request: PaymentRequest): Promise<PaymentResponse> {
  return paymentService.processDonation({
    amount: request.amount,
    currency: request.currency,
    frequency: 'one-time',
    campaignId: request.campaignId,
    donorName: request.donorName,
    donorEmail: request.donorEmail,
    isAnonymous: request.isAnonymous,
    paymentMethod: request.paymentMethod,
  });
}
