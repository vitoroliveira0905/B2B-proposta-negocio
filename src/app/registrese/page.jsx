"use client";
import { useState } from "react";
import "./registrase.css";

export default function Registro() {
  const [isLogin, setIsLogin] = useState(false);
  const [empresa, setEmpresa] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false); // 👈 novo estado
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    const url = isLogin
      ? "http://localhost:3001/api/login"
      : "http://localhost:3001/api/registrar";

    const body = isLogin ? { usuario, senha } : { empresa, usuario, senha };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("sucesso");
        setMensagem(data.message || "Operação realizada com sucesso!");

        if (isLogin) {
          const role = usuario === "admin@rubotz.com" ? "admin" : "empresa";
          localStorage.setItem(
            "empresaLogada",
            JSON.stringify({
              nomeEmpresa: data.empresa || data.nomeEmpresa || empresa || usuario,
              usuario,
              role,
            })
          );

          if (data.role === "admin") {
            window.location.href = "/Admin";
          } else {
            window.location.href = "/";
          }
        } else {
          setEmpresa("");
          setUsuario("");
          setSenha("");
          setTimeout(() => setIsLogin(true), 1500);
        }
      } else {
        setStatus("erro");
        if (data.errors) {
          const mensagens = Object.values(data.errors).join(" | ");
          setMensagem(mensagens);
        } else {
          setMensagem(data.message || "Erro desconhecido.");
        }
      }
    } catch (error) {
      setStatus("erro");
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Fazer Login" : "Registrar-se"}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Nome da Empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
          />
        )}

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        {/* Campo de senha com botão de visualização */}
        <div className="password-wrapper">
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="buttonCadastro">{isLogin ? "Entrar" : "Registrar"}</button>

        <p className="alternar">
          {isLogin ? "Ainda não tem conta?" : "Já possui conta?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Registrar-se" : "Fazer login"}
          </span>
        </p>

        {mensagem && (
          <div
            className={status === "sucesso" ? "msg-sucesso" : "msg-erro"}
            style={{ whiteSpace: "pre-wrap", textAlign: "center" }}
          >
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
}
