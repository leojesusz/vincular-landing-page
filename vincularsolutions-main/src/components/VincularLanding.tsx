import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import emailjs from '@emailjs/browser';

const VincularLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const slides = ['contractors', 'professionals', 'investors'];

  // Swipe handling for mobile
  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        } else if (diffX < 0 && currentSlide > 0) {
          setCurrentSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, slides.length]);

  const navigateToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // HEADER FIXO
  const Header = () => (
    <header className="header-fixed">
      <div className="container mx-auto px-4 md:px-6 py-1 flex items-center justify-center">
        <button
          onClick={() => setShowAboutModal(true)}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <img src="/uploads/logo.png" alt="Vincular" className="h-24 w-auto" />
        </button>
      </div>
    </header>
  );

  const NavigationDots = () => (
    <div className="nav-dots">
      {slides.map((_, index) => (
        <button 
          key={index} 
          onClick={() => navigateToSlide(index)} 
          className={`nav-dot ${currentSlide === index ? 'active' : 'inactive'}`} 
        />
      ))}
    </div>
  );

  const WhatsAppButton = () => (
    <a href="https://wa.me/5511963276261" target="_blank" rel="noopener noreferrer" className="whatsapp-button" aria-label="Contato WhatsApp">
      <MessageCircle />
    </a>
  );

  const Footer = () => (
    <footer className="bg-secondary border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <button onClick={() => setShowAboutModal(true)} className="text-petrol-medium hover:text-accent transition-colors">
              Sobre Nós
            </button>
            <div className="flex items-center space-x-4">
              <a href="https://www.instagram.com/vincularsolutions" target="_blank" rel="noopener noreferrer" className="text-petrol-medium hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/vincularsolutions/" target="_blank" rel="noopener noreferrer" className="text-petrol-medium hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:vincularsuporte@outlook.com" className="text-petrol-medium hover:text-accent transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center space-x-2 text-sm text-petrol-medium">
              <span>🏆</span>
              <span>Projeto finalista do Spark Sebrae</span>
            </div>
            <p className="text-xs text-petrol-medium/70 mt-1">
              © 2025 Vincular. Todos os direitos reservados.
              </p>
            <p className="text-xs text-petrol-medium/70 mt-1">
              CNPJ 65.968.897.0001-97
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="relative overflow-x-hidden overflow-y-visible">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="slide-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <ContractorsSlide />
          <ProfessionalsSlide />
          <InvestorsSlide />
        </div>
      </main>
      <NavigationDots />
      <WhatsAppButton />
      <Footer />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
    </div>
  );
};

// --- SLIDE COMPONENTS ---

const ContractorsSlide = () => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    emailjs.send(
      'service_no7fbzp',
      'template_293kmad',
      {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
        projectType: (form.elements.namedItem('projectType') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      },
      'W90LRk4Axs3IzhaFF'
    ).then(
      () => {
        alert('Solicitação enviada com sucesso!');
        form.reset();
      },
      (error) => {
        console.error(error);
        alert('Erro ao enviar.');
      }
    );
  };

  return (
    <div className="slide slide-contractors">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            A forma mais segura e inteligente de construir e reformar
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
            Conectamos o seu sonho aos melhores profissionais. Garantimos o seu investimento 
            com pagamentos seguros e gestão transparente, do início ao fim.
          </p>
          <Button className="bg-white text-petrol-dark hover:bg-ice hover:scale-105 transition-all duration-300 shadow-lg text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 w-full sm:w-auto font-semibold" onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}>
            QUERO UM ORÇAMENTO SEGURO
          </Button>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
            Segurança e Transparência em 4 Passos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: "1", title: "Encontre o Profissional Ideal", description: "Acesse uma curadoria de arquitetos e engenheiros com perfis verificados e portfólios reais." },
              { step: "2", title: "Contrate com Confiança", description: "Use nossos contratos digitais e o sistema de pagamento seguro (escrow). Seu dinheiro fica 100% protegido." },
              { step: "3", title: "Gerencie o Projeto", description: "Centralize a comunicação, aprove arquivos e acompanhe o andamento da obra em um único lugar." },
              { step: "4", title: "Conclua com Tranquilidade", description: "Libere o pagamento a cada etapa concluída e aprovada por você. Simples assim." }
            ].map((item, index) => (
              <Card key={index} className="step-card">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-petrol-dark/80">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div id="form-section" className="bg-ice/10 backdrop-blur rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Pronto para começar o seu projeto sem dor de cabeça?</h2>
            <p className="text-center mb-8 opacity-90">Preencha os dados abaixo e um dos nossos especialistas entrará em contato.</p>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input name="name" placeholder="Seu nome completo" required className="bg-card/80 border-border text-emerald-950" />
                <Input name="email" type="email" placeholder="Seu e-mail" required className="bg-card/80 border-border text-emerald-950" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input name="phone" placeholder="Seu telefone" required className="bg-card/80 border-border text-emerald-950" />
                <Input name="projectType" placeholder="Tipo de projeto" required className="bg-card/80 border-border text-emerald-950" />
              </div>
              <Textarea name="message" placeholder="Conte-nos mais sobre seu projeto..." rows={4} className="bg-card/80 border-border text-emerald-950" />
              <div className="text-center">
                <Button type="submit" className="bg-white text-petrol-dark hover:bg-ice hover:scale-105 transition-all duration-300 shadow-lg w-full md:w-auto font-semibold">
                  ENVIAR SOLICITAÇÃO
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfessionalsSlide = () => {
  return (
    <div className="slide slide-professionals">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Mais projetos, menos preocupação. E com recebimento garantido.
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
            Chega de correr atrás de cliente e de se preocupar com calotes. Na Vincular, 
            você recebe propostas qualificadas e tem a garantia de que o seu trabalho será pago.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="cta-primary text-sm md:text-base px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
              <a href="https://chat.whatsapp.com/BVu7DVurpqIIMxKD7ZZyzz" target="_blank" rel="noopener noreferrer">
                ENTRAR PARA O ECOSSISTEMA
              </a>
            </Button>
            <Button asChild className="bg-gradient-to-r from-accent to-petrol-medium text-white hover:from-petrol-medium hover:to-accent hover:scale-105 transition-all duration-300 shadow-lg text-sm md:text-base px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto font-semibold">
              <a href="https://wa.me/5511963276261?text=Olá!%20Tenho%20interesse%20em%20ser%20um%20parceiro%20da%20Vincular." target="_blank" rel="noopener noreferrer">
                QUERO SER UM PARCEIRO
              </a>
            </Button>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">
            Um Sistema Operacional para sua Carreira
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: "Recebimento Garantido", description: "Com nosso sistema de pagamento seguro, o risco de calote é zero. Entregou, recebeu.", icon: "💰" },
              { title: "Clientes Qualificados", description: "Receba propostas alinhadas ao seu perfil, de clientes que já entendem o valor do seu trabalho.", icon: "🎯" },
              { title: "Gestão Profissional", description: "Abandone as planilhas e o WhatsApp. Gerencie seus projetos, contratos e pagamentos em um único lugar.", icon: "⚡" },
              { title: "Construa sua Autoridade", description: "Crie um portfólio verificado com avaliações reais e publique tutoriais para atrair ainda mais clientes.", icon: "🏆" }
            ].map((item, index) => (
              <Card key={index} className="feature-card">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-petrol-dark">{item.title}</h3>
                  <p className="text-petrol-dark/80">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-ice/10 backdrop-blur rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Sua opinião vale ouro (e 5 ebooks)!</h2>
            <p className="text-lg opacity-90 mb-8">
              Ajude-nos a construir a plataforma perfeita para o nosso setor. Responda à nossa pesquisa 
              e receba um pack exclusivo com 5 guias técnicos de arquitetura.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
            {["/uploads/decoracaoquartodebebe.png", "/uploads/guiadecoresparaambientes.png", "/uploads/guiadeespecificacoes.png", "/uploads/guiadelevantamento.png", "/uploads/guiadepisos.png"].map((src, index) => (
              <div key={index} className="aspect-[3/4] rounded-lg overflow-hidden shadow-vincular">
                <img src={src} alt={`Ebook ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button asChild className="cta-primary">
              <a href="https://yeirqszm.manus.space" target="_blank" rel="noopener noreferrer">RESPONDER PESQUISA</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InvestorsSlide = () => {
  const handlePartnershipFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    emailjs.send(
      'service_no7fbzp', 
      'template_qc1xqao', 
      {
        company: (form.elements.namedItem('company') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      },
      'W90LRk4Axs3IzhaFF'
    ).then(
      () => {
        alert('Solicitação de contato enviada com sucesso!');
        form.reset();
      },
      (error) => {
        console.error(error);
        alert('Erro ao enviar solicitação.');
      }
    );
  };

  return (
    <div className="slide slide-investors">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-petrol-dark">
            Estamos construindo a infraestrutura de confiança para um mercado de R$ 390 bilhões
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-petrol-dark/80">
            O mercado da construção civil no Brasil opera sobre uma base de informalidade. 
            A Vincular nasceu para trazer segurança e tecnologia para as transações.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-petrol-dark">
            Uma Tese de Investimento Validada
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "R$ 390 Bilhões", label: "TAM", description: "Mercado Total da Construção Civil no Brasil." },
              { value: "R$ 150 Bilhões", label: "SAM", description: "Mercado Endereçável de projetos residenciais." },
              { value: "85,4%", label: "dos Profissionais", description: "Já enfrentaram problemas de recebimento." }
            ].map((item, index) => (
              <Card key={index} className="text-center p-8 bg-card shadow-vincular-elevated">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{item.value}</div>
                  <div className="text-lg font-semibold text-petrol-dark mb-4">{item.label}</div>
                  <p className="text-petrol-dark/70">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-petrol-medium text-ice rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center">
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Investir na Vincular é investir no padrão de confiança deste setor. 
              Nosso foco na transação nos posiciona para capturar o verdadeiro valor do mercado.
            </p>
            <Button asChild className="cta-primary">
              <a href="https://wa.me/5511963276261" target="_blank" rel="noopener noreferrer">CONVERSAR COM A EQUIPE</a>
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-petrol-dark">Conecte sua marca ao momento da decisão</h2>
              <p className="text-lg text-petrol-dark/80 mb-8">
                A Vincular é um ecossistema onde as decisões de compra acontecem. Anuncie para um 
                público altamente qualificado.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-petrol-dark">Fale com nossa equipe de parcerias</h3>
              <form onSubmit={handlePartnershipFormSubmit} className="space-y-4">
                <Input name="company" placeholder="Nome da Empresa" required className="bg-background border-border" />
                <Input name="email" type="email" placeholder="E-mail de Contato" required className="bg-background border-border" />
                <Textarea name="message" placeholder="Mensagem" rows={4} className="bg-background border-border" />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  SOLICITAR CONTATO
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODAL COMPONENT ---

const AboutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  const founders = [
    { name: "Rodrigo Rodrigues", role: "CEO", linkedin: "https://www.linkedin.com/in/eorodrigorodrigues/", photo: "/uploads/fotorodrigo.png" },
    { name: "João Victor Vaz", role: "CTO", linkedin: "https://www.linkedin.com/in/joão-victor-vaz-5aa832236/", photo: "/uploads/fotojoao.jpg" },
    { name: "Tainá Campos", role: "CPO", linkedin: "https://www.linkedin.com/in/taina-campos-00a3b9274/", photo: "/uploads/fototaina.png" },
    { name: "Leonardo Jesus", role: "CTO", linkedin: "https://www.linkedin.com/in/leojesusz/", photo: "/uploads/fotoleo.jpeg" },
    { name: "Matheus Filipe", role: "CTO", linkedin: "https://www.linkedin.com/in/mathfilipe/", photo: "/uploads/fotomata.jpg" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto bg-ice">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-petrol-dark text-center">
            Nascemos do Desejo de Vincular Sonhos a Realizadores
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8 p-6">
          <div className="text-center">
            <p className="text-lg text-petrol-dark/80 leading-relaxed">
              A Vincular nasceu de uma dupla frustração: a insegurança de clientes ao contratar 
              e o desafio de profissionais para receber por seu trabalho. Decidimos criar uma ponte 
              baseada em confiança e tecnologia.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-petrol-dark mb-3">Missão</h3>
                <p className="text-petrol-dark/80">Conectar o ecossistema da construção civil com segurança e transparência.</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-petrol-dark mb-3">Visão</h3>
                <p className="text-petrol-dark/80">Ser o selo de confiança padrão para projetos de construção no Brasil.</p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold text-petrol-dark mb-3">Valores</h3>
                <ul className="text-petrol-dark/80 text-sm">
                  <li>• Confiança</li>
                  <li>• Inovação Real</li>
                  <li>• Transparência</li>
                  <li>• Colaboração</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-petrol-dark text-center mb-8">Os Fundadores</h3>
            <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto">
              <div className="grid grid-cols-3 gap-8 w-full">
                {founders.slice(0, 3).map((f, i) => (
                  <Card key={i} className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                      <img src={f.photo} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold text-xs text-petrol-dark">{f.name}</h4>
                    <p className="text-petrol-dark/70 text-[10px] mb-2">{f.role}</p>
                    <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent text-[10px] flex items-center justify-center">
                      <Linkedin size={12} className="mr-1" /> LinkedIn
                    </a>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-8 w-2/3">
                {founders.slice(3).map((f, i) => (
                  <Card key={i} className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                      <img src={f.photo} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-semibold text-xs text-petrol-dark">{f.name}</h4>
                    <p className="text-petrol-dark/70 text-[10px] mb-2">{f.role}</p>
                    <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent text-[10px] flex items-center justify-center">
                      <Linkedin size={12} className="mr-1" /> LinkedIn
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VincularLanding;