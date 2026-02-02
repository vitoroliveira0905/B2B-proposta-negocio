"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "./produtos.css";

export default function ProdutosClient() {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [texto, setTexto] = useState("");
  const [indexFrase, setIndexFrase] = useState(0);
  const [indexLetra, setIndexLetra] = useState(0);

  const searchParams = useSearchParams();

  const frases = [
    "Automatizando o futuro com precisão robótica.",
    "Robôs inteligentes para indústrias mais eficientes.",
    "Tecnologia que move o progresso.",
    "A força da automação está em cada movimento.",
    "Robôs projetados para transformar a produção.",
  ];

  // Atualiza o filtro com base na URL
  useEffect(() => {
    const tipoURL = searchParams.get("tipo");
    if (tipoURL) setFiltro(tipoURL);
  }, [searchParams]);

  // Carrega produtos da API
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/produtos");
        const data = await res.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    carregarProdutos();
  }, []);

  // Efeito de digitação
  useEffect(() => {
    const fraseAtual = frases[indexFrase];
    if (indexLetra < fraseAtual.length) {
      const timeout = setTimeout(() => {
        setTexto((prev) => prev + fraseAtual[indexLetra]);
        setIndexLetra(indexLetra + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTexto("");
        setIndexLetra(0);
        setIndexFrase((prev) => (prev + 1) % frases.length);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [indexLetra, indexFrase]);

  const produtosFiltrados =
    filtro === "Todos"
      ? produtos
      : produtos.filter(
          (p) => p.tipo.toLowerCase() === filtro.toLowerCase()
        );

  return (
    <div className="produtos-page">
      {/* Banner tecnológico com texto animado */}
      <div className="tech-banner">
        <div className="tech-overlay">
          <h1 className="digitando">
            {texto}
            <span className="cursor">|</span>
          </h1>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros">
        {["Todos", "Solda", "Pintura", "Embalagem", "Manipulador"].map(
          (tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={filtro === tipo ? "ativo" : ""}
            >
              {tipo === "Todos"
                ? "Todos os Robôs"
                : `Robôs de ${tipo}`}
            </button>
          )
        )}
      </div>

      {/* Lista de produtos */}
      <div className="produtos-grid">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((p) => (
            <div className="produto-card" key={p.id}>
              <img src={p.linkimagem} alt={p.nome} />
              <h3>{p.nome}</h3>
              <p className="descricao">{p.descricao}</p>
              <div className="bottom-info">
                <p className="preco">R$ {Number(p.preco).toLocaleString("pt-BR")},00</p>
                <Link className="vermais" href={`/produtos/${p.id}`}>
                  VER MAIS
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="nenhum-produto">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}
