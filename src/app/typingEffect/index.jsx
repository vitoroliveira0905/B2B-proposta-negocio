"use client";
import { useEffect, useState } from "react";
import "./typingEffect.css";

export default function TypingEffect() {
  const line1Text = "R UBOTZtech - ";
  const line2Text = " Robôs Industriais";

  const [line1, setLine1] = useState(""); // inicia como string vazia
  const [line2, setLine2] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  useEffect(() => {
    let index1 = 0;
    let index2 = 0;

    // 🔹 Digitação da linha 1
    const typeLine1 = setInterval(() => {
      if (index1 < line1Text.length) {
        setLine1(prev => prev + line1Text.charAt(index1)); // charAt evita undefined
        index1++;
      } else {
        clearInterval(typeLine1);
        setShowCursor1(false); // 🔸 some cursor da linha 1
        setTimeout(() => {
          setShowCursor2(true); // 🔹 ativa cursor da linha 2

          // 🔹 Digitação da linha 2
          const typeLine2 = setInterval(() => {
            if (index2 < line2Text.length) {
              setLine2(prev => prev + line2Text.charAt(index2));
              index2++;
            } else {
              clearInterval(typeLine2);
              // 🔸 some cursor final
            }
          }, 120);
        }, 400); // pausa entre linhas
      }
    }, 120);

    return () => {
      clearInterval(typeLine1);
    };
  }, []);

  return (
    <section className="hero">
    <div className="hero-text">
      <h1>
        <span className="line1">
          {line1}
          {showCursor1 && <span className="cursor" style={{color:"transparent"}}>|</span>}
        </span>
        <br className="mobile-break" />
        <span className="line2">
          {line2}
          {showCursor2 && <span className="cursor" style={{color:"transparent"}}>|</span>}
        </span>
      </h1>
      <p>
        Descomplicados e acessíveis — paletização, solda, manipulação e outros
        processos industriais.
      </p>
    </div>
    </section>
  );
}
