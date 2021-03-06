export const mapToNumber = (value) => Number(value)

export const STATES: Array<{ id: string, name: string }> = [
    { id: 'AC', name: 'ACRE' },
    { id: 'AL', name: 'ALAGOAS' },
    { id: 'AP', name: 'AMAPÁ' },
    { id: 'AM', name: 'AMAZONAS' },
    { id: 'BA', name: 'BAHIA' },
    { id: 'CE', name: 'CEARÁ' },
    { id: 'DF', name: 'DISTRITO FEDERAL' },
    { id: 'ES', name: 'ESPÍRITO SANTO' },
    { id: 'GO', name: 'GOIÁS' },
    { id: 'MA', name: 'MARANHÃO' },
    { id: 'MT', name: 'MATO GROSSO' },
    { id: 'MS', name: 'MATO GROSSO DO SUL' },
    { id: 'MG', name: 'MINAS GERAIS' },
    { id: 'PR', name: 'PARANÁ' },
    { id: 'PB', name: 'PARAÍBA' },
    { id: 'PA', name: 'PARÁ' },
    { id: 'PE', name: 'PERNAMBUCO' },
    { id: 'PI', name: 'PIAUÍ' },
    { id: 'RJ', name: 'RIO DE JANEIRO' },
    { id: 'RN', name: 'RIO GRANDE DO NORTE' },
    { id: 'RS', name: 'RIO GRANDE DO SUL' },
    { id: 'RO', name: 'RONDÔNIA' },
    { id: 'RR', name: 'RORAIMA' },
    { id: 'SC', name: 'SANTA CATARINA' },
    { id: 'SE', name: 'SERGIPE' },
    { id: 'SP', name: 'SÃO PAULO' },
    { id: 'TO', name: 'TOCANTINS' },
];

export const CIVIL: string[] = [
    'Solteiro(a)',
    'Casado(a)',
    'Separado(a)',
    'Divorciado(a)',
    'Viúvo(a)'
]