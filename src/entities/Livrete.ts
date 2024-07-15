interface Livrete {
    codLivrete: number;
    codViatura: number;
    numeroQuadro: string;
    corViatura: string;
    MedidasPneumaticos: string;
    codServico: number;
    dataEmissao: Date;
    dataPrimeiroRegistro: Date;
    lotacao: string;
    cilindrada: string;
    numeroCilindro: string;
    conbustivel: string;
    peso: string;
    tara: string;
    tipoCaixa: string;
    distanciaEixo: string;
    modelo: string;
    codMarca: number;
    marca: Marca;
    viatura: Viatura;
    serivicoviatura: Serivicoviatura;
  }