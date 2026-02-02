"use client";
import { useCarrinho } from "@/context/CarrinhoContext";
import "./carrinho.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Carrinho() {
  const { carrinho, alterarQuantidade, removerDoCarrinho, limparCarrinho } = useCarrinho();
  const [empresa, setEmpresa] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const empresaData = localStorage.getItem("empresaLogada");
    if (empresaData) {
      const empresaObj = JSON.parse(empresaData);
      setEmpresa(empresaObj.nomeEmpresa);
    }
  }, []);

  const total = carrinho.reduce(
    (acc, p) => acc + Number(p.preco) * p.quantidade,
    0
  );

  const finalizarCompra = async () => {
    if (!empresa) {
      Swal.fire({
        icon: "warning",
        title: "Faça login antes!",
        text: "Você precisa estar logado para finalizar a compra.",
        confirmButtonText: "Ir para Registro",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/registrese");
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: `Obrigado por reservar com a gente, ${empresa}!`,
      text: "Um email será enviado com as confirmações!",
      confirmButtonText: "Fechar",
      confirmButtonColor: "#3085d6",
      background: "#fefefe",
    });

    limparCarrinho();
  };

  return (
    <div className="carrinho-container">
      <h1 className="titulo-carrinho">🦾 Carrinho de Reserva</h1>

      {carrinho.length === 0 ? (
        <p className="vazio">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="itens-carrinho">
            {carrinho.map((item) => (
              <div className="item-carrinho" key={item.id}>
                <img src={item.linkimagem} alt={item.nome} className="img-produto" />
                <div className="info-produto">
                  <h3>{item.nome}</h3>
                  <p className="preco">R$ {Number(item.preco).toLocaleString("pt-BR")},00</p>

                  <div className="quantidade">
                    <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                  </div>

                  <button className="remover" onClick={() => removerDoCarrinho(item.id)}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/54/54324.png"
                        alt=""
                        style={{ width: "1.2vw", filter: "invert()" }}
                      />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="resumo">
            <h2>
              Total: <span>R$ {total.toLocaleString("pt-BR")},00</span>
            </h2>
            <button className="finalizar" onClick={finalizarCompra}>
              Finalizar Compra
            </button>
            <button className="remover2" onClick={limparCarrinho}>
              <img
                        src="https://cdn-icons-png.flaticon.com/512/54/54324.png"
                        alt=""
                        style={{ width: "1.2vw", filter: "invert()" }}
                      /> Esvaziar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
