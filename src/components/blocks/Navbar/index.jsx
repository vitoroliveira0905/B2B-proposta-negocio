"use client";

import { useState, useEffect, useRef } from "react";
import "./navbar.css";
import Link from "next/link";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [isTop, setIsTop] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const linkImagem = "/imagens/logo.png";

  const [usuario, setUsuario] = useState(null)
  const [empresa, setEmpresa] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const empresaData = localStorage.getItem("empresaLogada");
    const usuarioData = localStorage.getItem("usuarioLogado");

    if (empresaData) {
      const empresaObj = JSON.parse(empresaData);
      setEmpresa(empresaObj.nomeEmpresa);
      setRole(empresaObj.role);
    }

    if (usuarioData) {
      const usuarioObj = JSON.parse(usuarioData);
      setUsuario(usuarioObj.nomeUsuario);
      setRole(usuarioObj.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("empresaLogada"); 
    setEmpresa(null); 
    window.location.reload(); // atualiza o navbar 
    };

    useEffect(() => {
      if (mobileOpen) setDropdownOpen(false);
    }, [mobileOpen]);

    // ✅ Controla visibilidade da navbar ao rolar
    useEffect(() => {
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        setIsTop(currentScroll <= 50);

        if (currentScroll > lastScroll && currentScroll > 200) {
          setShow(false);
        } else {
          setShow(true);
        }

        setLastScroll(currentScroll);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);

    // ✅ Fecha dropdown ao clicar fora
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
      <header
        className={`navbar ${isTop ? "top" : ""} ${show ? "visible" : "hidden"}`}
      >
        <Link href="/"><img src={linkImagem} alt="Logo RUBOTZ TECH" className="logo" /></Link>

        {/* Botão de menu mobile */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          ☰
        </button>

        <ul className={`menu ${mobileOpen ? "open" : ""}`}>
          <li className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-button"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen((prev) => !prev);
              }}
            >
              ROBÔS <span className={`arrow ${dropdownOpen ? "open" : ""}`}>▾</span>
            </button>

            <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <Link href="/produtos?tipo=Solda" onClick={() => dropdownOpen(false) }><p>Robôs de Solda</p></Link>
              <Link href="/produtos?tipo=Pintura" onClick={() => dropdownOpen(false)}><p>Robôs de Pintura</p></Link>
              <Link href="/produtos?tipo=Embalagem" onClick={() => dropdownOpen(false)}><p>Robôs de Embalagem</p></Link>
              <Link href="/produtos?tipo=Manipulador" onClick={() => dropdownOpen(false)}><p>Robôs Manipuladores</p></Link>
            </div>
          </li>

          <Link href="/carrinho" onClick={() => setMobileOpen(false)}><li>RESERVAR</li></Link>
          <Link href="/sobre" onClick={() => setMobileOpen(false)}><li>EMPRESA</li></Link>

          {/* Área de login/admin */}
          <div className="menu">
            {!usuario && !empresa ? (
              <Link href="/registrese"><li className="ALL">REGISTRE-SE</li></Link>
            ) : role === "admin" || usuario === "admin@rubotz.com" ? (
              <div className="empresa-menu">
                <span className="empresa-nome">👤 Admin</span>
                <div className="submenu">
                  <Link href="/Admin">Painel</Link>
                  <button onClick={handleLogout}>Sair</button>
                </div>
              </div>
            ) : (
              <div className="empresa-menu">
                <span className="empresa-nome">👤 {empresa || usuario}</span>
                <div className="submenu">
                  <button onClick={handleLogout}>Sair</button>
                </div>
              </div>
            )}
          </div>
        </ul>
      </header >
    );
  }
