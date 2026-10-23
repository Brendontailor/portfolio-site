import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <div className="container">
        <p className="eyebrow">404 / página não encontrada</p>
        <h1>
          Esse caminho <span className="accent">não existe.</span>
        </h1>
        <p>
          A página pode ter sido movida ou o endereço está incorreto. Volte para
          a vitrine ou abra um dos cases.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn btn-primary">
            Voltar para o início
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/#cases" className="btn btn-ghost">
            Ver os cases
          </Link>
        </div>
      </div>
    </main>
  );
}
