// ========================================
// SISTEMA DE KEY SYSTEM - LÓGICA PRINCIPAL
// ========================================

class KeySystem {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentKey = null;
    }

    initializeElements() {
        this.keyInput = document.getElementById('keyInput');
        this.verifyBtn = document.getElementById('verifyBtn');
        this.resultContainer = document.getElementById('resultContainer');
        this.successResult = document.getElementById('successResult');
        this.errorResult = document.getElementById('errorResult');
        this.errorMessage = document.getElementById('errorMessage');
        this.copyScriptBtn = document.getElementById('copyScriptBtn');
    }

    bindEvents() {
        // Verificar key ao clicar no botão
        this.verifyBtn.addEventListener('click', () => this.verifyKey());
        
        // Verificar key ao pressionar Enter
        this.keyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyKey();
            }
        });

        // Copiar script quando key for válida
        this.copyScriptBtn.addEventListener('click', () => this.copyScript());

        // Limpar resultados quando usuário digitar
        this.keyInput.addEventListener('input', () => this.clearResults());
    }

    async verifyKey() {
        const key = this.keyInput.value.trim();
        
        if (!key) {
            this.showError('Por favor, insira uma chave.');
            return;
        }

        // Mostrar loading
        this.setLoading(true);

        // Simular delay para melhor UX
        await this.delay(500);

        try {
            // Verificar se a key é válida usando o sistema
            if (window.KeySystem && window.KeySystem.isValidKey(key)) {
                this.currentKey = key;
                this.showSuccess();
            } else {
                this.showError('Chave inválida. Verifique se a chave está correta.');
            }
        } catch (error) {
            console.error('Erro ao verificar key:', error);
            this.showError('Erro interno. Tente novamente.');
        } finally {
            this.setLoading(false);
        }
    }

    showSuccess() {
        this.clearResults();
        this.successResult.classList.remove('hidden');
        this.resultContainer.classList.remove('hidden');
        
        // Scroll suave para o resultado
        this.resultContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    showError(message) {
        this.clearResults();
        this.errorMessage.textContent = message;
        this.errorResult.classList.remove('hidden');
        this.resultContainer.classList.remove('hidden');
        
        // Scroll suave para o resultado
        this.resultContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    clearResults() {
        this.resultContainer.classList.add('hidden');
        this.successResult.classList.add('hidden');
        this.errorResult.classList.add('hidden');
    }

    setLoading(loading) {
        if (loading) {
            this.verifyBtn.disabled = true;
            this.verifyBtn.classList.add('loading');
            this.verifyBtn.innerHTML = '<i class="fas fa-spinner"></i> Verificando...';
        } else {
            this.verifyBtn.disabled = false;
            this.verifyBtn.classList.remove('loading');
            this.verifyBtn.innerHTML = '<i class="fas fa-check"></i> Verificar Chave';
        }
    }

    async copyScript() {
        if (!this.currentKey) {
            this.showToast('Erro: Nenhuma chave válida encontrada.', 'error');
            return;
        }

        const script = this.generateScript(this.currentKey);
        
        try {
            await navigator.clipboard.writeText(script);
            this.showToast('Script copiado para a área de transferência!', 'success');
        } catch (error) {
            // Fallback para navegadores mais antigos
            this.fallbackCopyScript(script);
        }
    }

    generateScript(key) {
        // URL do GitHub Pages (substitua pelo seu repositório)
        const githubPagesUrl = 'https://SEU_USUARIO.github.io/SEU_REPOSITORIO';
        
        return `--[[
    SCRIPT AUTOMÁTICO - KEY SYSTEM
    Key: ${key}
    Gerado em: ${new Date().toLocaleString('pt-BR')}
]]--

local HttpService = game:GetService("HttpService")
local key = "${key}"
local apiUrl = "${githubPagesUrl}/keys.js"

-- Função para verificar a key
local function checkKey()
    local success, response = pcall(function()
        return HttpService:GetAsync(apiUrl)
    end)
    
    if success then
        -- Executar o script de verificação
        local script = response
        local func, err = loadstring(script)
        
        if func then
            -- Verificar se a key é válida
            if KeySystem and KeySystem.isValidKey(key) then
                print("✅ Key válida! Executando script principal...")
                -- AQUI VOCÊ COLOCA SEU SCRIPT PRINCIPAL
                executeMainScript()
            else
                print("❌ Key inválida!")
                return false
            end
        else
            print("❌ Erro ao carregar script de verificação:", err)
            return false
        end
    else
        print("❌ Erro ao conectar com o servidor:", response)
        return false
    end
    
    return true
end

-- Função principal do seu script
function executeMainScript()
    print("🚀 Script principal executando...")
    
    -- ========================================
    -- COLOQUE AQUI O CÓDIGO DO SEU SCRIPT
    -- ========================================
    
    -- Exemplo:
    -- local player = game.Players.LocalPlayer
    -- local character = player.Character or player.CharacterAdded:Wait()
    -- print("Jogador:", player.Name)
    
    -- ========================================
end

-- Executar verificação
checkKey()`;
    }

    fallbackCopyScript(script) {
        // Fallback para navegadores que não suportam clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = script;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showToast('Script copiado para a área de transferência!', 'success');
        } catch (error) {
            this.showToast('Erro ao copiar. Selecione e copie manualmente.', 'error');
            console.log('Script para copiar:', script);
        }
        
        document.body.removeChild(textArea);
    }

    showToast(message, type = 'success') {
        // Remover toast existente
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Criar novo toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        // Adicionar ao DOM
        document.body.appendChild(toast);
        
        // Remover após 3 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar o sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new KeySystem();
});

// Verificar se o sistema de keys está carregado
window.addEventListener('load', () => {
    if (!window.KeySystem) {
        console.error('❌ Sistema de keys não carregado!');
        document.body.innerHTML = `
            <div style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                height: 100vh; 
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
            ">
                <div>
                    <h1>❌ Erro de Carregamento</h1>
                    <p>O sistema de keys não foi carregado corretamente.</p>
                    <p>Verifique se o arquivo keys.js está presente.</p>
                </div>
            </div>
        `;
    } else {
        console.log('✅ Sistema de keys carregado com sucesso!');
    }
}); 