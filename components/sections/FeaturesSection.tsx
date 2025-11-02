import React from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  variant: 'dark' | 'light' | 'light-accent';
  title: string;
  imageSrc: string;
  imageAlt: string;
}

function FeatureCard({ variant, title, imageSrc, imageAlt }: FeatureCardProps) {
  const variantStyles = {
    dark: 'bg-[var(--color-primary-surface)]',
    light: 'bg-[var(--color-secondary-accent-hover)]',
    'light-accent': 'bg-[var(--color-secondary-accent)]',
  };

  const textColor = variant === 'dark' 
    ? 'text-[var(--color-neutral-foreground)]'
    : 'text-[var(--color-neutral-foreground-inverted)]';

  return (
    <div className={`w-[546px] h-[600px] rounded-[24px] overflow-hidden flex flex-col gap-[4px]`}>
      <div className={`${variantStyles[variant]} w-full h-[600px] rounded-[24px] flex flex-col gap-[4px]`}>
        {/* Title Container */}
        <div className="w-full h-[126px] px-[24px] pt-[24px] pb-[12px] flex flex-col gap-[4px]">
          <h3 className={`w-full font-bold leading-[1.4] ${textColor} text-[30px]`}>
            {title}
          </h3>
        </div>
        
        {/* Image Container */}
        <div className="flex-1 w-full relative">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="546px"
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureHighlightProps {
  variant: 'green' | 'light';
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
}

function FeatureHighlight({ 
  variant, 
  title, 
  description, 
  imageSrc, 
  imageAlt,
  imagePosition = 'right' 
}: FeatureHighlightProps) {
  const bgColor = variant === 'green' 
    ? 'bg-[var(--color-accent-green-secondary)]'
    : 'bg-[var(--color-secondary-accent-hover)]';

  const textContainer = (
    <div className="w-[556px] h-[600px] px-[24px] py-[40px] pr-[12px] flex flex-col justify-between">
      <h2 className="font-bold leading-none text-[var(--color-neutral-foreground-inverted)] text-[80px] w-full">
        {title.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < title.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <p className="font-normal leading-[28px] text-[var(--color-neutral-foreground-disabled)] text-[20px] w-full">
        {description.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < description.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );

  const imageContainer = (
    <div className="w-[556px] h-[600px] relative">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="556px"
      />
    </div>
  );

  return (
    <div className={`w-[1112px] h-[600px] rounded-[24px] overflow-hidden flex justify-between items-center ${bgColor}`}>
      {imagePosition === 'left' ? (
        <>
          {imageContainer}
          {textContainer}
        </>
      ) : (
        <>
          {textContainer}
          {imageContainer}
        </>
      )}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="w-full flex flex-wrap gap-[20px] items-center justify-center pt-[120px] pb-[80px] px-[164px]">
      {/* Row 1: Two Cards */}
      <FeatureCard
        variant="dark"
        title="O jeito mais simples de entender pra onde seu dinheiro vai"
        imageSrc="/images/feature-simple-tracking.webp"
        imageAlt="Interface mostrando visualização simples dos gastos"
      />
      <FeatureCard
        variant="light"
        title="Receba insights reais sobre suas finanças"
        imageSrc="/images/feature-insights.webp"
        imageAlt="Insights financeiros personalizados"
      />

      {/* Row 2: Large Highlight */}
      <FeatureHighlight
        variant="green"
        title="Seu consultor financeiro\nno seu bolso"
        description="O Pierre é seu consultor 24h no WhatsApp ou app —\nfala a sua língua, responde rápido e te ajuda a cuidar do dinheiro em qualquer hora do dia."
        imageSrc="/images/feature-consultant.webp"
        imageAlt="Consultor financeiro Pierre no seu bolso"
        imagePosition="right"
      />

      {/* Row 3: Two Cards */}
      <FeatureCard
        variant="light"
        title="Segurança de ponta certificada pelo Banco Central"
        imageSrc="/images/feature-security.webp"
        imageAlt="Segurança certificada pelo Banco Central"
      />
      <FeatureCard
        variant="dark"
        title="Gráficos e relatórios claros sobre suas finanças"
        imageSrc="/images/feature-reports.webp"
        imageAlt="Gráficos e relatórios financeiros"
      />

      {/* Row 4: Large Highlight (reversed) */}
      <FeatureHighlight
        variant="light"
        title="Inteligência para cuidar do seu dinheiro"
        description="Pierre te avisa antes de você gastar demais e mostra como economizar todo mês"
        imageSrc="/images/feature-intelligence.webp"
        imageAlt="Inteligência artificial para finanças"
        imagePosition="left"
      />

      {/* Row 5: Two Cards */}
      <FeatureCard
        variant="dark"
        title="São mais de 56 instituições. Seu banco provavelmente está aqui."
        imageSrc="/images/feature-banks.webp"
        imageAlt="56+ instituições financeiras conectadas"
      />
      <FeatureCard
        variant="light-accent"
        title="Lembretes inteligentes de contas, boletos e pagamentos"
        imageSrc="/images/feature-reminders.webp"
        imageAlt="Lembretes inteligentes de pagamentos"
      />
    </section>
  );
}

