import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import PageSections from "@/components/PageSections";
import LeadModal from "@/components/LeadModal";
import ReviewLightbox from "@/components/ReviewLightbox";

const reviewUrls = [
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/d981d827-ba42-4701-b8a4-eaed83a391d8.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/a61eb943-dd8d-4805-873a-89d2b7982ae5.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/748dc942-1bc7-4a50-81f8-febad9e88714.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/621d5de0-07a3-4049-8b7b-80dae0fe39c9.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/352b530d-153d-47b9-85e5-c86938c58840.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/74a3d18a-179d-48b0-a3bf-f18fdc63db04.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/9dce4c15-325a-4dd9-a556-55ad872e4083.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/0300c764-825c-4dcd-90db-3fbafd5e9aea.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/cef8fe87-264f-44ab-b66a-a1cb627a7526.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/dab8f2e0-56e5-4e27-adb0-adf938b93ae7.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/202aea84-caf5-4049-823d-811dbea861d1.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/1b7159a7-cd66-4258-b250-f94ee04792e0.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/d5f6a587-5ab2-4aa2-93a5-d0d6193f55b0.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/dce00f25-7e12-4c57-a683-f924f522cd5d.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/30691347-36b1-4305-9d38-04a87723a37f.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/27732d88-d1cf-445d-ab3c-a69004405c5d.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/1be0cf76-6607-47cd-a1e8-c050e6bebcb9.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/38bb981d-d767-470c-8f9a-fc430abe9c73.JPG",
  "https://cdn.poehali.dev/projects/66f79eb2-4061-4cd5-b3b8-754dec1e81e0/bucket/cbeaa636-776b-4e2b-99b7-53f726ee109d.JPG",
];

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setForm({ name: "", contact: "", email: "" });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    fetch('https://functions.poehali.dev/5d91e12e-30c5-492c-9329-cdcf7cf28592', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader onOpenModal={openModal} />

      <PageSections
        visibleSections={visibleSections}
        reviewUrls={reviewUrls}
        onOpenModal={openModal}
        onOpenLightbox={setLightboxIndex}
      />

      {lightboxIndex !== null && (
        <ReviewLightbox
          index={lightboxIndex}
          total={reviewUrls.length}
          urls={reviewUrls}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + reviewUrls.length) % reviewUrls.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % reviewUrls.length)}
        />
      )}

      {modalOpen && (
        <LeadModal
          form={form}
          submitted={submitted}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          onFormChange={handleFormChange}
        />
      )}
    </div>
  );
};

export default Index;
