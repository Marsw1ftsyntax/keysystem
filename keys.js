// ========================================
// SISTEMA DE KEYS - ARQUIVO DE CONFIGURAÇÃO
// ========================================
// 
// INSTRUÇÕES PARA ADICIONAR/REMOVER KEYS:
// 1. Para adicionar uma nova key, adicione no array 'validKeys'
// 2. Para remover uma key, delete a linha do array
// 3. As keys são automaticamente ofuscadas
// 4. Salve o arquivo e faça commit no GitHub
//
// ========================================

// Função para ofuscar strings (reversível)
function obfuscate(str) {
    return btoa(str.split('').reverse().join(''));
}

// Função para desofuscar strings
function deobfuscate(str) {
    return atob(str).split('').reverse().join('');
}

// Lista de keys válidas (ofuscadas)
// Para adicionar uma nova key, adicione: obfuscate('SUA_KEY_AQUI')
const validKeys = [
    obfuscate('KEY-2024-ABC123-XYZ789'),
    obfuscate('KEY-2024-DEF456-UVW012'),
    obfuscate('KEY-2024-GHI789-RST345'),
    obfuscate('KEY-2024-JKL012-MNO678'),
    obfuscate('KEY-2024-PQR345-TUV901'),
    obfuscate('KEY-2024-WXY678-ZAB234'),
    obfuscate('KEY-2024-CDE901-FGH567'),
    obfuscate('KEY-2024-IJK234-LMN890'),
    obfuscate('KEY-2024-OPQ567-RST123'),
    obfuscate('KEY-2024-UVW890-XYZ456')
];

// Função para verificar se uma key é válida
function isValidKey(key) {
    if (!key || typeof key !== 'string') return false;
    
    const trimmedKey = key.trim();
    if (trimmedKey.length === 0) return false;
    
    // Verifica se a key está na lista de keys válidas
    return validKeys.some(obfuscatedKey => {
        try {
            const deobfuscatedKey = deobfuscate(obfuscatedKey);
            return deobfuscatedKey === trimmedKey;
        } catch (error) {
            return false;
        }
    });
}

// Função para obter informações da key (opcional)
function getKeyInfo(key) {
    if (!isValidKey(key)) return null;
    
    return {
        valid: true,
        timestamp: new Date().toISOString(),
        keyType: 'standard',
        expires: null // null = não expira
    };
}

// Exportar funções para uso global
window.KeySystem = {
    isValidKey: isValidKey,
    getKeyInfo: getKeyInfo,
    validKeys: validKeys
}; 