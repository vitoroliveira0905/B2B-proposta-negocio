"use client";
import { useEffect, useState } from "react";
import "./admin.css";

export default function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [linkimagem, setLinkimagem] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);


  const carregarProdutos = async () => {
    const res = await fetch("http://localhost:3001/api/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("empresaLogada"));
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    } else {
      carregarProdutos();
    }
  }, []);

  const adicionarProduto = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, preco, tipo, descricao, linkimagem }),
    });
    setNome("");
    setPreco("");
    setTipo("");
    setDescricao("");
    setLinkimagem("");
    carregarProdutos();
  };

  const editarProduto = (produto) => {
    setEditando(true);
    setIdEditando(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setTipo(produto.tipo);
    setDescricao(produto.descricao);
    setLinkimagem(produto.linkimagem);
  };

  const salvarEdicao = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/api/produtos/${idEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, preco, tipo, descricao, linkimagem }),
    });

    setEditando(false);
    setIdEditando(null);
    setNome("");
    setPreco("");
    setTipo("");
    setDescricao("");
    setLinkimagem("");
    carregarProdutos();
  };


  const excluirProduto = async (id) => {
    await fetch(`http://localhost:3001/api/produtos/${id}`, {
      method: "DELETE",
    });
    carregarProdutos();
  };

  return (
    <div className="page-wrapper">
      <div className="admin-container">
        <h2>Painel do Administrador</h2>

        <form onSubmit={editando ? salvarEdicao : adicionarProduto}>
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="link da imagem"
            value={linkimagem}
            onChange={(e) => setLinkimagem(e.target.value)}
            required
          />
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione o tipo de robô</option>
            <option value="Solda">Robô de Solda</option>
            <option value="Pintura">Robô de Pintura</option>
            <option value="Embalagem">Robô de Embalagem</option>
            <option value="Manipulador">Robô Manipulador</option>
          </select>

          <button type="submit">
            {editando ? "Salvar alterações" : "Adicionar"}
          </button>

          {editando && (
            <button
              type="button"
              onClick={() => {
                setEditando(false);
                setIdEditando(null);
                setNome("");
                setPreco("");
                setTipo("");
                setDescricao("");
                setLinkimagem("");
              }}
              style={{ backgroundColor: "gray" }}
            >
              Cancelar
            </button>
          )}
        </form>


        <h3>Produtos cadastrados</h3>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Preço</th>
              <th scope="col">Tipo</th>
              <th scope="col">Descricao</th>
              <th scope="col">Imagem</th>
              <th scope="col" className="acao">Ações</th>

            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <th scope="row">{p.id}</th>
                <td>{p.nome}</td>
                <td>R$ {p.preco}</td>
                <td>{p.tipo}</td>
                <td>{p.descricao}</td>
                <td>
                  <img src={p.linkimagem} alt={p.nome} style={{ width: "4vw" }} />
                </td>
                <td>
                  <div className="botoes">
                    <button onClick={() => visualizarProduto(p)}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/256/65/65000.png"
                        alt=""
                        style={{ width: "1.2vw", filter: "invert()" }}
                      />
                    </button>
                    <button onClick={() => {
                      editarProduto(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>                      
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1159/1159968.png"
                        alt=""
                        style={{ width: "1.2vw", filter: "invert()" }}
                      />
                    </button>
                    <button
                      style={{ backgroundColor: "darkblue" }}
                      onClick={() => excluirProduto(p.id)}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/54/54324.png"
                        alt=""
                        style={{ width: "1.2vw", filter: "invert()" }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );

}
