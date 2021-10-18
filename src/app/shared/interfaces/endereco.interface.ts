export interface IEndereco {
    cep: number,
    logradouro: string,
    bairro: string,
    numero: number,
    outros: string,
    uf: string,
    localidade: number,
    cidade?: any
}