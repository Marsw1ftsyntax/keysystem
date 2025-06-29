# 🔑 Key System - Sistema de Verificação de Chaves

Um sistema completo de verificação de chaves baseado em HTML e JavaScript puro, projetado para ser hospedado no GitHub Pages e integrado com scripts do Roblox.

## ✨ Características

- 🎨 **Interface Moderna**: Design responsivo e intuitivo
- 🔒 **Segurança**: Keys ofuscadas para dificultar roubo
- 📱 **Responsivo**: Funciona em desktop e mobile
- 🚀 **GitHub Pages**: Hospedagem gratuita e fácil
- 🎮 **Integração Roblox**: Scripts Lua prontos para uso
- 📋 **Copiar Script**: Geração automática de scripts
- ⚡ **Performance**: Carregamento rápido e eficiente

## 📁 Estrutura do Projeto

```
key-system/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # Lógica principal
├── keys.js             # Configuração das keys
├── example.lua         # Exemplo para Roblox
└── README.md           # Documentação
```

## 🚀 Como Usar

### 1. Configuração Inicial

1. **Clone ou baixe** este repositório
2. **Edite** o arquivo `keys.js` para adicionar suas keys
3. **Configure** a URL do GitHub Pages no `script.js`
4. **Faça upload** para o GitHub

### 2. Adicionando Keys

Edite o arquivo `keys.js`:

```javascript
// Para adicionar uma nova key:
const validKeys = [
    obfuscate('SUA-NOVA-KEY-AQUI'),
    obfuscate('OUTRA-KEY-EXEMPLO'),
    // ... outras keys
];
```

### 3. Configurando GitHub Pages

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em **Settings > Pages**
4. Selecione **Source: Deploy from a branch**
5. Escolha a branch **main**
6. Acesse: `https://SEU_USUARIO.github.io/SEU_REPOSITORIO`

### 4. Atualizando a URL

No arquivo `script.js`, linha 108:

```javascript
const githubPagesUrl = 'https://SEU_USUARIO.github.io/SEU_REPOSITORIO';
```

## 🎮 Uso no Roblox

### Script Básico

```lua
local HttpService = game:GetService("HttpService")
local key = "SUA-KEY-AQUI"
local apiUrl = "https://SEU_USUARIO.github.io/SEU_REPOSITORIO/keys.js"

local success, response = pcall(function()
    return HttpService:GetAsync(apiUrl)
end)

if success then
    local func, err = loadstring(response)
    if func then
        if KeySystem and KeySystem.isValidKey(key) then
            print("✅ Key válida!")
            -- Seu código aqui
        else
            print("❌ Key inválida!")
        end
    end
end
```

### Script Completo

Use o arquivo `example.lua` como base para seus scripts.

## 🔧 Personalização

### Mudando o Design

Edite o arquivo `style.css` para personalizar:
- Cores
- Fontes
- Animações
- Layout

### Adicionando Funcionalidades

No arquivo `script.js`, você pode:
- Adicionar validações extras
- Implementar sistema de expiração
- Adicionar logs de uso
- Criar diferentes tipos de keys

### Exemplo de Key com Expiração

```javascript
// No keys.js
function getKeyInfo(key) {
    if (!isValidKey(key)) return null;
    
    return {
        valid: true,
        timestamp: new Date().toISOString(),
        keyType: 'premium',
        expires: '2024-12-31T23:59:59Z' // Data de expiração
    };
}
```

## 🛡️ Segurança

### Ofuscação de Keys

As keys são automaticamente ofuscadas usando:
- Base64 encoding
- Reversão de string
- Funções customizadas

### Proteções Adicionais

- Validação de entrada
- Sanitização de dados
- Tratamento de erros
- Logs de segurança

## 📊 Keys de Exemplo

O sistema vem com 10 keys de exemplo:

- `KEY-2024-ABC123-XYZ789`
- `KEY-2024-DEF456-UVW012`
- `KEY-2024-GHI789-RST345`
- `KEY-2024-JKL012-MNO678`
- `KEY-2024-PQR345-TUV901`
- `KEY-2024-WXY678-ZAB234`
- `KEY-2024-CDE901-FGH567`
- `KEY-2024-IJK234-LMN890`
- `KEY-2024-OPQ567-RST123`
- `KEY-2024-UVW890-XYZ456`

## 🔍 Troubleshooting

### Problema: Keys não funcionam
- Verifique se o arquivo `keys.js` está carregado
- Confirme se a URL do GitHub Pages está correta
- Teste com as keys de exemplo

### Problema: Erro de conexão
- Verifique se o GitHub Pages está ativo
- Confirme se o repositório é público
- Teste a URL diretamente no navegador

### Problema: Script não copia
- Verifique se o navegador suporta Clipboard API
- Use o fallback automático para navegadores antigos

## 📝 Logs e Debug

Abra o Console do navegador (F12) para ver:
- Status de carregamento
- Erros de verificação
- Logs de segurança

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🆘 Suporte

Se você encontrar problemas:

1. Verifique a documentação
2. Teste com as keys de exemplo
3. Abra uma issue no GitHub
4. Verifique os logs do console

---

**Desenvolvido com ❤️ para a comunidade Roblox** 