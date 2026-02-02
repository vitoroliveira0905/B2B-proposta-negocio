"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  // 🔹 Carregar do localStorage apenas no cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("carrinho");
      if (saved) setCarrinho(JSON.parse(saved));
    }
  }, []);

  // 🔹 Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }
  }, [carrinho]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const alterarQuantidade = (id, delta) => {
    setCarrinho((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, quantidade: Math.max(1, p.quantidade + delta) }
            : p
        )
        .filter((p) => p.quantidade > 0)
    );
  };


  const limparCarrinho = () => setCarrinho([]);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
