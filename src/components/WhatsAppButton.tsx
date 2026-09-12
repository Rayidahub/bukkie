import { CONTACT } from "../data";
import { IcWhatsApp } from "../lib";

export function WhatsAppButton() {
  const whatsappUrl = "https://wa.link/r43m3e";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-[#20BA5C] hover:shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <IcWhatsApp className="h-7 w-7" />
    </a>
  );
}
