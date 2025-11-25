export interface Cupom {
  idCupom?: number;
  codigo: string;
  percentualDesconto: number;
  ativo: boolean;
  validadeInicio: string;
  validadeFinal: string;
}