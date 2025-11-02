'use client';

import React, { useState } from 'react';
import { Container } from '../ui/Container';

interface FAQItemProps {
  question: string;
  answer?: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="w-full border-b border-[var(--color-neutral-border)]">
      {/* FAQ Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-[16px] px-0 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <h3 className="flex-1 text-left font-medium leading-[24px] text-[var(--color-neutral-foreground)] text-[16px]">
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
      {isOpen && answer && (
        <div className="pb-[16px] pt-0 px-0">
          <p className="font-normal leading-normal text-[var(--color-neutral-foreground-muted)] text-[14px]">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Todas começam fechadas

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
    <section className="w-full bg-[var(--color-primary-background)] flex flex-col items-center px-[164px] py-[96px]">
      <Container maxWidth="section" className="flex flex-col items-start w-full">
        {/* FAQ Header */}
        <div className="w-full pb-[44px] pt-0 px-0">
          <h2 className="font-medium leading-none text-[var(--color-neutral-foreground)] text-[48px]">
            Perguntas frequentes
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="w-full flex flex-col">
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

