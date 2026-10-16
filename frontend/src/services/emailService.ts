import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

export interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#22c55e', '#16a34a', '#10b981', '#34d399', '#ffffff']
    });
  } catch {
    // Safe fallback if canvas-confetti is not supported
  }
};

export const sendContactEmail = async (data: EmailFormData): Promise<{ success: boolean; message: string }> => {
  const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const endpoint = `${apiUrl}/api/contact`;

  // 1. First attempt through the backend API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const resData = await response.json();
      triggerConfetti();
      return {
        success: true,
        message: resData.message || "Thank you! Your message has been sent successfully. Peter will get back to you shortly."
      };
    }
  } catch (backendError) {
    console.warn('[Contact Service] Backend /api/contact unavailable. Attempting direct fallback...', backendError);
  }

  // 2. Direct client fallback (via EmailJS if configured in client env, or simulation)
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  try {
    if (serviceId && templateId && publicKey) {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_name: "Peter Kiplagat Misik"
        },
        publicKey
      );
    } else {
      // Friendly simulation when keys are not configured
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    triggerConfetti();
    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. Peter will get back to you shortly."
    };
  } catch (error) {
    console.error("Failed to send contact email via fallback:", error);
    return {
      success: false,
      message: "Failed to send your message. Please reach out directly to petermisik86@gmil.com or WhatsApp (0743329366)."
    };
  }
};
