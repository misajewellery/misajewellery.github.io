/**
 * Pure utility hook for WhatsApp Inquiry Logic.
 * 
 * Responsibilities:
 * - Purely manages localStorage for inquiry state.
 * - No side-effects, no redirects, no auth checks.
 */
export const useInquiry = () => {

    /**
     * Saves inquiry intent to localStorage.
     */
    const saveInquiry = (product, whatsappUrl) => {
        const inquiryData = {
            productName: product?.name || 'Collection',
            productId: product?.id || 'general',
            source: 'whatsapp',
            url: whatsappUrl || 'https://wa.me/917984294889'
        };
        localStorage.setItem('misa_pending_inquiry', JSON.stringify(inquiryData));
    };

    /**
     * Retrieves pending inquiry from localStorage.
     */
    const getPendingInquiry = () => {
        try {
            const saved = localStorage.getItem('misa_pending_inquiry');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Failed to parse pending inquiry:', e);
            return null;
        }
    };

    /**
     * Clears pending inquiry from localStorage.
     */
    const clearInquiry = () => {
        localStorage.removeItem('misa_pending_inquiry');
    };

    return {
        saveInquiry,
        getPendingInquiry,
        clearInquiry
    };
};
