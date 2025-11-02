'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../ui/Container';
import { gsap } from '@/lib/animations';
import { prefersReducedMotion, getDuration } from '@/lib/animations';

interface FAQItemProps {
  question: string;
  answer?: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  // Accordion animation
  useEffect(() => {
    if (prefersReducedMotion() || !answerRef.current || !answer) return;

    if (isOpen) {
      // Open animation
      gsap.fromTo(
        answerRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: 'auto',
          opacity: 1,
          duration: getDuration(0.4),
          ease: 'ease.inOut',
        }
      );
    } else {
      // Close animation
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: getDuration(0.4),
        ease: 'ease.inOut',
      });
    }
  }, [isOpen, answer]);

  return (
    <div ref={itemRef} className="w-full border-b border-[var(--color-neutral-border)] overflow-hidden">
      {/* FAQ Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 md:py-4 lg:py-[16px] px-0 cursor-pointer hover:opacity-80 transition-opacity gap-2 md:gap-4"
      >
        <h3 className="flex-1 text-left font-medium leading-[20px] md:leading-[22px] lg:leading-[24px] text-[var(--color-neutral-foreground)] text-[14px] md:text-[15px] lg:text-[16px]">
          {question}
        </h3>
        <div className="w-[16px] h-[16px] relative shrink-0">
          {isOpen ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-[var(--color-neutral-foreground)]"
            >
              <path
                d="M4 8L12 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-[var(--color-neutral-foreground)]"
            >
              <path
                d="M8 4V12M4 8H12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </button>
      
      {/* FAQ Answer */}
      {answer && (
        <div ref={answerRef} className="overflow-hidden" style={{ height: isOpen ? 'auto' : 0 }}>
          <div className="pb-3 md:pb-4 lg:pb-[16px] pt-0 px-0">
            <p className="font-normal leading-[20px] md:leading-[22px] lg:leading-normal text-[var(--color-neutral-foreground-muted)] text-[13px] md:text-[13.5px] lg:text-[14px]">
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Todas começam fechadas
  const sectionRef = useRef<HTMLElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  // FAQ Items scroll-in animation
  useEffect(() => {
    if (prefersReducedMotion() || !itemsContainerRef.current) return;

    const items = itemsContainerRef.current.children;
    if (items.length === 0) return;

    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: getDuration(0.5),
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: itemsContainerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  }, []);

  const faqs = [
    {
      question: 'O que é o Open Finance?',
      answer: 'O Open Finance é uma iniciativa do Banco Central do Brasil que permite que você, como cliente, compartilhe seus dados financeiros de forma segura entre instituições autorizadas. Com o seu consentimento, sistemas como o Pierre podem acessar informações bancárias (como contas, cartões e investimentos) para oferecer uma visão completa e personalizada das suas finanças. Todo o processo é protegido por padrões rigorosos de segurança e criptografia, e você tem o controle total para decidir o que compartilhar, com quem e por quanto tempo.',
    },
    {
      question: 'Posso conectar mais de um banco?',
      answer: 'Sim! Você pode conectar quantos bancos quiser ao Pierre. Quanto mais contas conectadas, mais completa será sua visão financeira e mais precisos serão os insights personalizados que o Pierre pode te oferecer.',
    },
    {
      question: 'Como eu me conecto com os bancos?',
      answer: 'A conexão é feita de forma segura via Open Finance, diretamente pelo Pierre. Durante o processo, você será redirecionado para o ambiente seguro do seu banco para autorizar o compartilhamento de dados. O processo leva menos de 1 minuto.',
    },
    {
      question: 'Preciso fornecer minhas senhas bancárias ao Pierre?',
      answer: 'Não. Você nunca fornece sua senha bancária ao Pierre. A autorização acontece no próprio site do seu banco, com toda a segurança e criptografia exigida pelo Banco Central.',
    },
    {
      question: 'O Pierre consegue efetuar transações e pagamentos?',
      answer: 'Não. O Pierre não tem permissão para movimentar dinheiro ou fazer transações na sua conta. Ele apenas lê seus dados financeiros autorizados para ajudar você a entender melhor sua vida financeira.',
    },
    {
      question: 'Preciso configurar ou instalar algo no app do meu banco?',
      answer: 'Não. O Pierre usa o Open Finance, uma tecnologia autorizada pelo Banco Central, que permite integração segura sem necessidade de instalar nada nos apps dos bancos. Você só precisa autorizar o acesso aos seus dados financeiros uma vez, e o Pierre fará o resto automaticamente.',
    },
    {
      question: 'Posso adicionar meus gastos e transações manualmente?',
      answer: 'Não. O Pierre automaticamente categoriza e registra suas transações assim que você conecta suas contas bancárias. Você não precisa adicionar nada manualmente.',
    },
    {
      question: 'Posso fornecer apenas uma conta ou apenas um cartão da minha instituição financeira?',
      answer: 'Sim! Ao se conectar via Open Finance, você pode escolher exatamente quais contas, cartões ou produtos financeiros deseja compartilhar com o Pierre. A autorização é totalmente personalizada e você tem o controle total sobre quais informações serão acessadas.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[var(--color-primary-background)] flex flex-col items-center px-4 md:px-8 lg:px-[164px] py-12 md:py-16 lg:py-[96px]"
    >
      <Container maxWidth="section" className="flex flex-col items-start w-full">
        {/* FAQ Header */}
        <div className="w-full pb-8 md:pb-10 lg:pb-[44px] pt-0 px-0">
          <h2 className="font-medium leading-none text-[var(--color-neutral-foreground)] text-[28px] md:text-[36px] lg:text-[48px]">
            Perguntas frequentes
          </h2>
        </div>

        {/* FAQ Items */}
        <div ref={itemsContainerRef} className="w-full flex flex-col">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

