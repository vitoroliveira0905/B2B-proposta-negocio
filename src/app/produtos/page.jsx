import { Suspense } from "react";
import ProdutosClient from "./ProdutosClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando produtos...</div>}>
      <ProdutosClient />
    </Suspense>
  );
}
