import { testimonials } from "@/utils/utils";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function TestimonialSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const duplicatedTestimonials = [...testimonials, ...testimonials]; // for seamless infinite scroll

  return (
    <section className="bg-white py-16 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Loved by Professionals ❤️
      </h2>
      <div className="relative w-full overflow-hidden">
        <div className="group">
          <div
            className="flex animate-scroll-horizontal group-hover:[animation-play-state:paused]"
            style={{
              width: `${duplicatedTestimonials.length * 320}px`,
              animation: "scroll-left 30s linear infinite",
            }}
          >
            {duplicatedTestimonials.map((item, idx) => (
              <div
                key={idx}
                className="w-[300px] shrink-0 p-4 mx-2 bg-gray-50 rounded-lg border shadow hover:scale-[1.02] transition-transform"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-16 h-16 rounded-full mb-4 shadow"
                  />
                  <p className="text-gray-600 italic text-sm mb-3">
                    “{item.text}”
                  </p>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-xs text-gray-500">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
