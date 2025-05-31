'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'How does the job application automation work?',
        answer: 'HireSphere connects to major job platforms through APIs and secure browser automation. You set your preferences and filters, and our system automatically identifies matching positions, tailors your resume and cover letter for each role, and submits applications on your behalf.',
    },
    {
        question: 'Is my data secure with HireSphere?',
        answer: 'Absolutely. We use bank-level encryption to protect your personal information and credentials. We never share your data with third parties without your explicit consent, and you can request data deletion at any time.',
    },
    {
        question: 'Can I customize the automated messages sent to recruiters?',
        answer: "Yes! While our AI generates personalized outreach messages based on the job and company, you can review and edit all messages before they're sent. You can also create your own templates that the system will use as a base.",
    },
    {
        question: 'How accurate is the AI interview simulator?',
        answer: 'Our interview simulator is trained on thousands of real interview questions and feedback from hiring managers across industries. It adapts to your responses in real-time, just like a human interviewer would, and provides constructive feedback on both your content and delivery.',
    },
    {
        question: 'Can I cancel my subscription at any time?',
        answer: 'Yes, you can cancel your subscription at any time with no questions asked. Your subscription will remain active until the end of your current billing period, after which it will not renew.',
    },
];

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={faq.question} className="border rounded-lg overflow-hidden">
                    <button
                        type="button"
                        className="flex w-full items-center justify-between p-4 text-left font-medium focus:outline-none"
                        onClick={() => toggleFaq(index)}
                    >
                        <span>{faq.question}</span>
                        <ChevronDown
                            className={`h-5 w-5 text-muted-foreground transition-transform ${
                                openIndex === index ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openIndex === index ? 'max-h-96' : 'max-h-0'
                        }`}
                    >
                        <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
