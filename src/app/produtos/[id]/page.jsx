"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./produtoDetalhe.css";
import Link from "next/link";
import { useCarrinho } from "@/context/CarrinhoContext";
import { Check } from "lucide-react"; // ou outro ícone
import { ArrowLeft } from "lucide-react";
import { FileText } from "lucide-react";



export default function ProdutoDetalhe() {
    const { id } = useParams();
    const router = useRouter();
    const [produto, setProduto] = useState(null);
    const [relacionados, setRelacionados] = useState([]);
    const [loading, setLoading] = useState(true);
    const { adicionarAoCarrinho } = useCarrinho();
    const [added, setAdded] = useState(false);



    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/produtos/${id}`);
                const data = await res.json();
                setProduto(data);

                // depois que o produto principal for carregado, buscar os do mesmo tipo
                if (data?.tipo) {
                    const todosRes = await fetch(`http://localhost:3001/api/produtos`);
                    const todos = await todosRes.json();
                    const filtrados = todos.filter(
                        (p) => p.tipo === data.tipo && p.id !== data.id
                    );
                    setRelacionados(filtrados);
                }
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
            } finally {
                setLoading(false);
            }
        };
        carregarProduto();
    }, [id]);

    if (loading) {
        return <div className="carregando">Carregando produto...</div>;
    }

    if (!produto) {
        return (
            <div className="erro-produto">
                <h2>Produto não encontrado 😕</h2>
                <button onClick={() => router.back()}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="produto-detalhe">
            <div className="produto-container">
                <img src={produto.linkimagem} alt={produto.nome} className="produto-img" />
                <div className="produto-info">
                    <h1 style={{ wordBreak: "break-word" }}>{produto.nome}</h1>
                    <p className="produto-descricao" style={{ wordBreak: "break-word" }}>{produto.descricao}</p>
                    <p className="produto-preco">R$ {Number(produto.preco).toLocaleString("pt-BR")},00</p>
                    <p className="produto-tipo">
                        <strong>Tipo:</strong> {produto.tipo}
                    </p>
                    <div className="botoes">
                        <button title="Reservar robô"
                            className={`btn-voltar ${added ? "added" : ""}`}
                            onClick={() => {
                                adicionarAoCarrinho(produto);
                                setAdded(true);
                                setTimeout(() => setAdded(false), 1500);
                            }}
                        >
                            {added ? <><Check size={18} /> Adicionado!</> : "Adicionar"}
                        </button>
                        <div className="bot">
                            <Link href="https://www.ece.ufrgs.br/~rventura/RoboticaIndustrial.pdf" target="_blank"><button title="PDF detalhado" className="btn-voltar"  >
                                <FileText size={20} />
                            </button></Link>
                            <button title="Voltar" className="btn-voltar" onClick={() => router.back()} >
                                <ArrowLeft size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {relacionados.length > 0 && (
                <div className="relacionados">
                    <h2>Produtos Relacionados</h2>
                    <div className="relacionados-grid">
                        {relacionados.slice(0, 6).map((p) => (
                            <div
                                key={p.id}
                                className="relacionado-card"
                                onClick={() => router.push(`/produtos/${p.id}`)}
                            >
                                <img src={p.linkimagem} alt={p.nome} />
                                <h3 style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    wordBreak: "break-word"
                                }}>
                                    {p.nome}
                                </h3>
                                <p className="descricao" style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    wordBreak: "break-word"
                                }}>
                                    {p.descricao}
                                </p>
                                <div className="bottom-info">
                                    <p className="preco">R$ {Number(p.preco).toLocaleString("pt-BR")},00</p>
                                    <Link className="vermais" href={`/produtos/${p.id}`}>ver mais</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
