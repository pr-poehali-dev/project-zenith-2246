import { X } from "lucide-react";
import Icon from "@/components/ui/icon";

interface ReviewLightboxProps {
  index: number;
  total: number;
  urls: string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ReviewLightbox = ({ index, total, urls, onClose, onPrev, onNext }: ReviewLightboxProps) => {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors z-10"
        onClick={onClose}
      >
        <X size={28} />
      </button>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white/50">
        {index + 1} / {total}
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all flex items-center justify-center z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <Icon name="ChevronLeft" size={22} className="text-white" />
      </button>

      <img
        src={urls[index]}
        alt={`Отзыв ${index + 1}`}
        className="max-h-[90vh] max-w-[calc(100vw-120px)] object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all flex items-center justify-center z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <Icon name="ChevronRight" size={22} className="text-white" />
      </button>
    </div>
  );
};

export default ReviewLightbox;
