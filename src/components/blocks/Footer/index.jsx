"use client";
import { useState } from "react";
import "./footer.css";

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      url: "#",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    },
    {
      name: "Instagram",
      url: "#",
      img: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    },
    {
      name: "Twitter",
      url: "#",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/01/X-Logo-Round-Color.png",
    },
    {
      name: "Youtube",
      url: "#",
      img: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-title">RUBOTZ<span>tech</span></h2>
          <p>© 2025 RUBOTZ Tech. Todos os direitos reservados.</p>
        </div>

        <div className="footer-center">
          <a href="/sobre">Sobre</a>
          <a href="/#servicos">Serviços</a>
          <a href="/#contato">Contato</a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setShowPrivacy(true);
            }}
          >
            Privacidade
          </a>
        </div>

        <div className="footer-right">
          {socialLinks.map((item, i) => (
            <a key={i} href={item.url} target="_blank">
              <img src={item.img} alt={item.name} className="social-icon" />
            </a>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showPrivacy && (
        <div className="modal" onClick={() => setShowPrivacy(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowPrivacy(false)}>
              &times;
            </span>
            <h2>Política de Privacidade</h2>
            <p>
              A <b>RUBOTZ Tech</b> respeita sua privacidade e protege seus dados.
              <br /><br />
              <b>1. Coleta:</b> informações básicas e de navegação podem ser coletadas para melhorar sua experiência.<br /><br />
              <b>2. Uso:</b> seus dados são usados apenas para oferecer suporte e serviços.<br /><br />
              <b>3. Compartilhamento:</b> não repassamos informações a terceiros sem seu consentimento.<br /><br />
              <b>4. Segurança:</b> armazenamos os dados em servidores seguros com acesso restrito.<br /><br />
              <b>Contato:</b> dúvidas? Fale conosco em <b>contato@rubotz.com</b>.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
