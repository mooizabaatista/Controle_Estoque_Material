import { FrenteServico } from "./frente-servico";
import { Produto } from "./produto";

export interface Movimentacao {
    id: Number,
    data: String,
    tipoMovimentacao: number,
    qtd: number,
    produtoId: number,
    produto: Produto,
    frenteServicoId: number,
    frenteServico: FrenteServico
}
