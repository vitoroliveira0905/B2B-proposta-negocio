"use client";
import "./sobre.css";
import Image from "next/image";
import Link from "next/link";

export default function sobre() {
  return (
    <div className="sobre-container">
      {/* Seção principal */}
      <section className="sobre-intro">
        <div className="sobre-texto">
          <h1>Sobre a RUBOTZ tech</h1>
          <p>
            A <strong>RUBOTZ</strong> é uma empresa líder em soluções de
            automação e robótica industrial. Nosso compromisso é transformar
            linhas de produção em ambientes inteligentes, eficientes e
            sustentáveis através da tecnologia.
          </p>
        </div>
        <img src="/imagens/logo.png" alt="RUBOTZ fábrica" className="sobre-img" />
      </section>

      {/* História */}
      <section className="sobre-historia">
        <h2>Nossa História</h2>
        <p>
          Fundada por engenheiros apaixonados por inovação, a RUBOTZ nasceu com
          o propósito de revolucionar o setor industrial. Desde o início,
          investimos em pesquisa e desenvolvimento para criar robôs com
          precisão, durabilidade e design avançado. Hoje, estamos presentes em
          todo o Brasil, entregando automação inteligente para diversas
          indústrias.
        </p>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="sobre-mvv">
        <div className="mvv-card">
          <h3>Missão</h3>
          <p>
            Fornecer soluções tecnológicas que elevem a produtividade e a
            segurança das empresas, conectando o futuro à indústria atual.
          </p>
        </div>
        <div className="mvv-card">
          <h3>Visão</h3>
          <p>
            Ser referência nacional em robótica industrial, reconhecida pela
            inovação, qualidade e impacto positivo no setor produtivo.
          </p>
        </div>
        <div className="mvv-card">
          <h3>Valores</h3>
          <ul>
            <li>Inovação e tecnologia de ponta</li>
            <li>Comprometimento com o cliente</li>
            <li>Ética e transparência</li>
            <li>Sustentabilidade e responsabilidade</li>
          </ul>
        </div>
      </section>

      {/* Equipe */}
      <section className="sobre-equipe">
        <h2>Nossa Equipe</h2>
        <div className="equipe-grid">
          <div className="membro">
            <img src="/imagens/williansilva.png" alt="CEO" />
            <h4>Willian Silva</h4>
            <p>CEO & Fundador</p>
          </div>
          <div className="membro">
            <img src="/imagens/beccareis.png" alt="Engenheira de Robótica" />
            <h4>Becca Reis</h4>
            <p>Engenheira de Robótica</p>
          </div>
          <div className="membro">
            <img src="/imagens/annagrillao.png" alt="Desenvolvedor de IA" />
            <h4>Anna Grillão</h4>
            <p>Desenvolvedor de IA</p>
          </div>
          <div className="membro">
            <img src="/imagens/gustavopaiva.png" alt="Gerente de Projetos" />
            <h4>Gustavo Paivão</h4>
            <p>Gerente de Projetos</p>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="sobre-diferenciais">
        <h2>Nossos Diferenciais</h2>
        <div className="diferenciais-grid">
          <div className="diferencial-card">
            <h3>Robôs Personalizáveis</h3>
            <p>Projetos sob medida para cada aplicação, garantindo flexibilidade e alta performance.</p>
          </div>
          <div className="diferencial-card">
            <h3>Suporte Técnico Especializado</h3>
            <p>Equipe altamente qualificada para oferecer manutenção, upgrades e consultoria técnica.</p>
          </div>
          <div className="diferencial-card">
            <h3>Integração Inteligente</h3>
            <p>Compatibilidade total com sistemas de automação e controle baseados em IA.</p>
          </div>
          <div className="diferencial-card">
            <h3>Eficiência Energética</h3>
            <p>Desenvolvimento de soluções com foco em economia e sustentabilidade.</p>
          </div>
          <div className="diferencial-card">
            <h3>Inteligência Artificial Aplicada</h3>
            <p>Robôs que aprendem com o uso, aprimorando continuamente sua produtividade.</p>
          </div>
        </div>
      </section>


      {/* Contato */}
      <section className="sobre-contato">
        <h2>Fale Conosco</h2>
        <p>
          Quer saber mais sobre nossos robôs e soluções? Fale com um de nossos
          especialistas e leve inovação para sua empresa.
        </p>
        <Link href="/#contato" className="btn-contato">
          Entrar em Contato
        </Link>
      </section>
    </div>
  );
}
