import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    title: "How does the text-to-speech conversion work?",
    description:
      "Our advanced AI technology converts written text into natural-sounding speech using deep learning models. It analyzes the text, considers context, and generates human-like pronunciation and intonation.",
  },
  {
    title: "Do I need to install any software?",
    description:
      "No, our service is entirely web-based. You can use it directly in your browser without installing any additional software. This makes it easy to access from any device with an internet connection",
  },
  {
    title: "What languages and voices are available?",
    description:
      "We offer a wide range of languages and voices, including male and female options. Our current selection covers over 32 languages and hundreds of voice variations. You can preview all available voices in our voice gallery.",
  },
  {
    title: "Can I customize the voice or accent of the generated speech?",
    description:
      "Yes, we offer a variety of voices and accents to choose from. You can select different options to match your desired tone and style for the generated audio.",
  },
  {
    title: "What file formats are supported for the generated audio?",
    description:
      "We support audio generation exclusively in the MP3 format, ensuring compatibility and high-quality sound for your needs.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="container mx-auto my-8 px-10 py-6">
      <h1 className="text-center text-3xl font-bold">
        Frequently Asked Questions
      </h1>

      <Accordion type="single" collapsible className="mt-8 w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent>{faq.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
