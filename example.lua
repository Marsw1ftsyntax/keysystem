--[[
    EXEMPLO DE USO NO ROBLOX - KEY SYSTEM
    =====================================
    
    Este é um exemplo de como usar o sistema de keys no Roblox.
    Substitua a URL pelo seu repositório GitHub Pages.
    
    INSTRUÇÕES:
    1. Substitua 'SEU_USUARIO' e 'SEU_REPOSITORIO' pela sua URL do GitHub Pages
    2. Cole este script no seu executor (Synapse, KRNL, etc.)
    3. O script irá verificar a key automaticamente
]]--

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- CONFIGURAÇÕES
local key = "KEY-2024-ABC123-XYZ789" -- Substitua pela sua key
local apiUrl = "https://SEU_USUARIO.github.io/SEU_REPOSITORIO/keys.js"

-- Função para verificar a key
local function checkKey()
    print("🔍 Verificando key...")
    
    local success, response = pcall(function()
        return HttpService:GetAsync(apiUrl)
    end)
    
    if success then
        print("✅ Conectado ao servidor de keys")
        
        -- Executar o script de verificação
        local script = response
        local func, err = loadstring(script)
        
        if func then
            -- Verificar se a key é válida
            if KeySystem and KeySystem.isValidKey(key) then
                print("✅ Key válida! Executando script principal...")
                return true
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
end

-- Função principal do script
function executeMainScript()
    print("🚀 Script principal executando...")
    print("👤 Jogador:", player.Name)
    
    -- ========================================
    -- EXEMPLO DE FUNCIONALIDADES
    -- ========================================
    
    -- Exemplo 1: Teleportar para spawn
    local spawnLocation = game:GetService("Workspace").SpawnLocation
    if spawnLocation then
        player.Character:SetPrimaryPartCFrame(spawnLocation.CFrame + Vector3.new(0, 5, 0))
        print("📍 Teleportado para spawn")
    end
    
    -- Exemplo 2: Dar velocidade ao personagem
    local character = player.Character or player.CharacterAdded:Wait()
    local humanoid = character:FindFirstChild("Humanoid")
    if humanoid then
        humanoid.WalkSpeed = 50
        print("🏃 Velocidade aumentada para 50")
    end
    
    -- Exemplo 3: Fazer o personagem pular alto
    if humanoid then
        humanoid.JumpPower = 100
        print("🦘 Pulo aumentado para 100")
    end
    
    -- Exemplo 4: Mostrar informações do jogador
    print("📊 Informações do jogador:")
    print("   Nome:", player.Name)
    print("   ID:", player.UserId)
    print("   Account Age:", player.AccountAge, "dias")
    
    -- Exemplo 5: Listar todos os jogadores
    print("👥 Jogadores online:")
    for _, p in pairs(Players:GetPlayers()) do
        print("   - " .. p.Name)
    end
    
    -- ========================================
    -- ADICIONE AQUI SUAS FUNCIONALIDADES
    -- ========================================
    
    print("✅ Script executado com sucesso!")
end

-- Função para mostrar mensagem de erro
function showError(message)
    print("❌ ERRO:", message)
    
    -- Opcional: Mostrar notificação no jogo
    if player:FindFirstChild("PlayerGui") then
        local screenGui = Instance.new("ScreenGui")
        local frame = Instance.new("Frame")
        local textLabel = Instance.new("TextLabel")
        
        screenGui.Parent = player.PlayerGui
        frame.Size = UDim2.new(0, 300, 0, 100)
        frame.Position = UDim2.new(0.5, -150, 0.8, 0)
        frame.BackgroundColor3 = Color3.fromRGB(255, 0, 0)
        frame.BorderSizePixel = 0
        frame.Parent = screenGui
        
        textLabel.Size = UDim2.new(1, 0, 1, 0)
        textLabel.BackgroundTransparency = 1
        textLabel.Text = message
        textLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
        textLabel.TextScaled = true
        textLabel.Font = Enum.Font.SourceSansBold
        textLabel.Parent = frame
        
        -- Remover após 5 segundos
        game:GetService("Debris"):AddItem(screenGui, 5)
    end
end

-- Função principal
local function main()
    print("🎮 Iniciando Key System...")
    
    -- Verificar se o jogador tem personagem
    if not player.Character then
        player.CharacterAdded:Wait()
    end
    
    -- Verificar a key
    if checkKey() then
        executeMainScript()
    else
        showError("Key inválida! Verifique sua chave de acesso.")
    end
end

-- Executar o script
main() 