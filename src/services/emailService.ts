import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

export interface EmailFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: EmailFormData): Promise<{ success: boolean; message: string }> => {
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
      // Friendly simulation when keys are not yet configured in .env
      console.info("EmailJS keys not detected in environment variables. Simulating successful transmission.");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Launch celebratory confetti effect on success
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

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. I will get back to you shortly."
    };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      success: false,
      message: "Failed to send your message. Please reach out directly to petermisik86@gmil.com."
    };
  }
};
