import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqsData } from "@/data/faqData";

export function Faq() {
  return (
    <section id="faq" className="container mx-auto my-8 px-10 py-6">
      <h2 className="text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="mt-8 w-full">
        {faqsData.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent>{faq.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
