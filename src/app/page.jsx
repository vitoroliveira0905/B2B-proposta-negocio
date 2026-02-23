"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import TypingEffect from "./typingEffect";

export default function Home() {

  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/servicos")
      .then(res => res.json())
      .then(data => setServicos(data))
      .catch(err => console.error("Erro ao carregar serviços:", err));
  }, []);

  useEffect(() => {
    console.log("Lista de serviços:", servicos);
  }, [servicos]);

  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/marcas")
      .then(res => res.json())
      .then(data => setMarcas(data))
      .catch(err => console.error("Erro ao carregar marcas:", err));
  }, []);

  useEffect(() => {
    console.log("Lista de marcas:", marcas);
  }, [marcas]);


  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".fade-in-up, .slide-in-right, .fade-in-center"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.2 } // 20% visível já ativa a animação
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);


  return (
    <>
      {/* Hero principal */}

      <TypingEffect />


      {/* Imagem + Cards */}
      <section className="heros">
        <div className="hero-image-container">
          <img
            src="/imagens/robos.png"
            alt="Robôs RUBOTZ"
            className="hero-image fade-in-center "
          />
        </div>

        <div className="hero-cards fade-in-up ">
          <div className="card">
            <h3>Facilidade de Uso</h3>
            <p>
              Do movimento à configuração, o uso dos robôs é simples e intuitivo,
              com células Plug & Play e controle automatizado.
            </p>
          </div>
          <div className="card">
            <h3>Automação Inteligente</h3>
            <p>
              Aumente produtividade e eficiência com soluções prontas para
              paletização e soldagem industrial.
            </p>
          </div>
          <div className="card">
            <h3>Zero CAPEX</h3>
            <p>
              Reduza custos alugando robôs sob demanda — flexível e escalável
              para seu negócio.
            </p>
          </div>
        </div>
      </section>

      <section id="servicos" className="robot-types fade-in-up">
        <h2>Tipos de Robôs Industriais</h2>
        <p className="subtitle">
          Soluções robóticas especializadas para cada etapa do seu processo
          produtivo.
        </p>

        <div className="robot-grid">
          {servicos.map((r, index) => (
            <Link href={`/produtos?tipo=${r.tipo}`} key={index} style={{ textDecoration: "none", color: "inherit" }}><div className="robot-card">
              <div className="image-container">
                <img src={r.imagem} alt={r.nome} />
                <div className="overlay">
                  <span>Saiba mais +</span>
                </div>
              </div>
              <h3>{r.nome}</h3>
              <p>{r.descricao}</p>

            </div></Link>
          ))}
        </div>
      </section>
      <section className="brands-section fade-in-up">
        <h2 className="brands-title">Marcas de Robôs Industriais</h2>

        <div className={`brands-grid ${visible ? "fade-in" : ""}`}>
          {marcas.map((b, index) => (
            <div key={index} className="brand-card">
              <img src={b.img} alt={b.name} className="brand-image" />
              <div className="brand-info">
                <h3>{b.name}</h3>
                <p className="brand-desc">{b.desc}</p>
                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-link"
                >
                  Ver mais →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="contato" >
        <div className="icon-top">
          <div className="icon">
            <img
              src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/bw/512px/2709.png"
              alt="contato"
              style={{ width: "5vw" }}
            />
          </div>
        </div>

        <h2>Entre em contato conosco</h2>
        <p>
          Preencha o formulário abaixo e nossa equipe entrará em contato o mais
          rápido possível.
        </p>

        <form
          className="form-contato"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Mensagem enviada com sucesso! 🚀");
            e.target.reset();
          }}
        >
          <div className="form-grupo" >
            <label>Nome</label>
            <input type="text" name="nome" placeholder="Digite seu nome" required />
          </div>

          <div className="form-grupo">
            <label>Email</label>
            <input type="email" name="email" placeholder="Digite seu email" required />
          </div>

          <div className="form-grupo">
            <label>Empresa</label>
            <input type="text" name="empresa" placeholder="Nome da empresa (opcional)" />
          </div>

          <div className="form-grupo">
            <label>Mensagem</label>
            <textarea
              name="mensagem"
              placeholder="Como podemos ajudar?"
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-enviar" id="contato">
            Enviar Mensagem
          </button>
        </form>
      </section>

    </>
  );
}
