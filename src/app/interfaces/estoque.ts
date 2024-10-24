import { Produto } from "./produto"

export interface Estoque {
    id: number,
    produtoId: String,
    produto: Produto,
    qtdInicial: number,
    qtdEntrada: number,
    qtdSaida: number,
    estoqueFinal: number
}
