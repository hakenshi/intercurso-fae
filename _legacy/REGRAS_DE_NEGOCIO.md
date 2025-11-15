# Documentação de Regras de Negócio - Sistema Intercurso

## 📋 Índice
1. [Autenticação e Usuários](#1-autenticação-e-usuários)
2. [Times e Jogadores](#2-times-e-jogadores)
3. [Jogos e Chaveamento](#3-jogos-e-chaveamento)
4. [Placar e Progressão](#4-placar-e-progressão)
5. [Modalidades](#5-modalidades)
6. [Notificações](#6-notificações)
7. [Likes/Votação](#7-likesvotação)
8. [Recuperação de Senha](#8-recuperação-de-senha)
9. [Pontos Críticos e Falhas](#9-pontos-críticos-e-falhas)

---

## 1. Autenticação e Usuários

### 1.1 Cadastro (AuthController::cadastro)

**Regras:**
- Todo novo usuário deve preencher um questionário de saúde com 7 perguntas
- Respostas aceitas: "Sim" ou "Não" (convertidas para 1 ou 0)
- Deve aceitar termo de responsabilidade
- Senha é criptografada com bcrypt
- Gera token de acesso (Sanctum) automaticamente após cadastro
- Cria registro de termo com assinatura UUID

**Questionário de Saúde:**
1. Dor no peito
2. Problema cardíaco
3. Dor no peito no último mês
4. Desequilíbrio/tontura
5. Problema ósseo/articular
6. Outra condição
7. Medicamento para pressão/cardíaco

**Transação:**
- Usa transação de banco (DB::beginTransaction)
- Rollback em caso de erro

**⚠️ FALHAS IDENTIFICADAS:**
- Não valida se email já existe (duplicação possível)
- Erro de digitação: "Alg deu errado" sem "o"
- Não há validação de força de senha
- Token nunca expira

### 1.2 Login (AuthController::login)

**Regras:**
- Valida email e senha
- Retorna erro 401 se usuário não encontrado
- Retorna erro 422 se senha incorreta
- Gera novo token a cada login (não revoga anteriores)

**⚠️ FALHAS IDENTIFICADAS:**
- Múltiplos tokens ativos por usuário (não revoga tokens antigos)
- Não há limite de tentativas de login
- Não há logs de tentativas falhas

### 1.3 Tipos de Usuário

**Tipos:**
- `1` - Usuário comum/jogador
- `2` - Responsável de time (pode criar e gerenciar times)
- `3` - Administrador (não implementado explicitamente)

**Regras:**
- Administrador pode promover usuário comum a responsável
- Responsável pode criar times
- Usuário pode participar de múltiplos times

**⚠️ FALHAS IDENTIFICADAS:**
- Não há verificação de permissões nos controllers
- Qualquer usuário autenticado pode acessar endpoints admin
- Falta middleware de autorização

### 1.4 Gestão de Usuários (UserController)

**Regras de Update:**
- Foto de perfil: se existir foto anterior, deleta antes de salvar nova
- Data de nascimento: aceita formato dd/mm/YYYY, converte para Y-m-d
- Senha: só atualiza se fornecida (criptografa novamente)
- Email e RA: só atualiza se fornecido

**Regras de Deleção:**
- Remove jogador associado
- Remove referência como responsável de times (id_responsavel = null)
- Remove termos de responsabilidade
- Soft delete ou hard delete (não está claro)

**⚠️ FALHAS IDENTIFICADAS:**
- Ao deletar usuário, times ficam sem responsável (órfãos)
- Não verifica se usuário é responsável de times ativos
- Foto antiga não é deletada em alguns casos
- Validação de data pode falhar com formatos inválidos

---

## 2. Times e Jogadores

### 2.1 Criação de Time (TimeController::store)

**Regras:**
- Requer: nome, id_modalidade, id_responsavel
- Se responsável for passado como nome (string), busca ID do usuário
- Cada time pertence a uma modalidade
- Nome deve ser único (constraint de banco)

**⚠️ FALHAS IDENTIFICADAS:**
- Não valida se responsável tem permissão (tipo_usuario = 2)
- Não valida quantidade de participantes da modalidade
- Conversão de nome para ID pode falhar silenciosamente

### 2.2 Adição de Jogadores (JogadoresController::store)

**Regras:**
- Aceita array de jogadores
- Verifica se jogador já está no time (evita duplicação)
- Cada entrada requer: id_usuario, id_time, status
- Cria notificação para jogador adicionado
- Retorna apenas jogadores novos criados

**⚠️ FALHAS IDENTIFICADAS:**
- Não valida limite de jogadores por time
- Não verifica se modalidade do jogador é compatível com time
- Continua processamento mesmo com erros em alguns jogadores
- Status do jogador não é validado

### 2.3 Expulsão de Jogador (JogadoresController::expulsarJogador)

**Regras:**
- Define id_time = null
- Define status = '0' (inativo)
- Deleta registro de jogador

**⚠️ FALHAS IDENTIFICADAS:**
- Deleta depois de atualizar (dados perdidos)
- Não cria notificação para jogador expulso
- Não verifica se jogo já começou

### 2.4 Times do Usuário (TimeController::showTimesUsuario)

**Regras:**
- Retorna todos os times que o usuário participa como jogador
- Busca através da tabela jogadores

---

## 3. Jogos e Chaveamento

### 3.1 Criação Manual de Jogo (JogosController::store)

**Regras:**
- Um time não pode enfrentar a si mesmo
- Requer: id_fase, id_modalidade, id_time_1, id_time_2, data_jogo, local, status
- Data aceita formato dd/mm/YYYY HH:mm, converte para Y/m/d H:i:s
- Usa transação de banco

**⚠️ FALHAS IDENTIFICADAS:**
- Não valida se times são da mesma modalidade
- Não valida se times existem e estão ativos
- Não verifica conflito de horário/local
- Data pode falhar se formato incorreto

### 3.2 Geração Automática de Chaveamento (JogosController::storeMany)

**Algoritmo de Chaveamento (Jogo::organizeMatches):**

1. **Determina tamanho da chave:**
   - ≤ 3 times → chave de 2
   - ≤ 7 times → chave de 4
   - ≤ 15 times → chave de 8
   - ≤ 31 times → chave de 16
   - ≤ 63 times → chave de 32

2. **Fase Chapéu (Eliminatória Preliminar):**
   - Times excedentes jogam para classificar
   - Quantidade = (total_times - tamanho_chave) × 2
   - Vencedores entram na chave principal

3. **Fases do Torneio:**
   - Fase 1: Chapéu (se necessário)
   - Fase 2: Primeira fase principal (Oitavas/Quartas/etc)
   - Fase 3: Oitavas de final
   - Fase 4: Quartas de final
   - Fase 5: Semifinais
   - Fase 6: Final

4. **Vinculação de Jogos:**
   - Cada jogo tem referência para próximo jogo (id_proximo_jogo)
   - Vencedor avança automaticamente
   - Último jogo (final) não tem próximo jogo

**⚠️ FALHAS IDENTIFICADAS:**
- Embaralha array mas não usa resultado (linha: `$shuffledTeams = shuffle($teams)`)
- Não considera chaveamento por desempenho/ranking
- Não permite chaveamento manual/seeding
- Lógica de vinculação complexa pode gerar erros em casos extremos
- Não valida se já existe chaveamento para modalidade
- Times inativos podem entrar no chaveamento

### 3.3 Atualização de Jogo (JogosController::update)

**Regras:**
- Mesmas validações da criação
- Um time não pode enfrentar a si mesmo
- Converte data para formato correto

**⚠️ FALHAS IDENTIFICADAS:**
- Não verifica se jogo já foi finalizado
- Pode alterar times após jogo iniciado
- Não valida estado do jogo antes de atualizar

### 3.4 Exclusão de Jogo (JogosController::destroy)

**Regras:**
- Se jogo tem placar, deleta placar primeiro
- Deleta jogo

**⚠️ FALHAS IDENTIFICADAS:**
- Não atualiza id_proximo_jogo de outros jogos
- Pode quebrar chaveamento se deletar jogo no meio do torneio
- Não verifica dependências

---

## 4. Placar e Progressão

### 4.1 Geração de Placar (PlacarController::gerarPlacar)

**Regras:**
- Cria placar zerado (0 x 0) para um jogo
- Retorna ID do placar criado

### 4.2 Atualização de Placar (PlacarController::update)

**Regras Críticas:**
1. **Finalização do Jogo:**
   - Apenas jogos com status = 1 (ativo) podem ser finalizados
   - Define id_time_vencedor
   - Registra placar_time_1 e placar_time_2
   - Altera status para 0 (finalizado)

2. **Progressão na Chave:**
   - Busca próximo jogo (id_proximo_jogo)
   - Adiciona vencedor ao próximo jogo
   - Se id_time_1 estiver vazio e time_2 diferente do vencedor → vencedor vira time_1
   - Se id_time_2 estiver vazio e time_1 diferente do vencedor → vencedor vira time_2
   - Impede time jogar contra si mesmo

**⚠️ FALHAS CRÍTICAS:**
- Não valida se placar_time_1 != placar_time_2 (empates não tratados)
- Não verifica se id_time_vencedor corresponde a um dos times
- Pode haver corrida de condição (race condition)
- Não usa transação de banco (dados podem ficar inconsistentes)
- Lógica de adicionar time ao próximo jogo pode falhar se ambos slots ocupados
- Não cria notificação para times

---

## 5. Modalidades

### 5.1 Criação de Modalidade (ModalidadesController::store)

**Regras:**
- Não pode duplicar: mesmo nome + mesmo gênero
- Retorna erro 400 se já existe
- Requer: nome, genero, quantidade_participantes

**Gêneros Possíveis:**
- Masculino
- Feminino
- Misto

**⚠️ FALHAS IDENTIFICADAS:**
- Validação case-sensitive (futebol != Futebol)
- Não normaliza nome antes de verificar duplicação
- Quantidade de participantes não é validada (pode ser 0 ou negativo)

---

## 6. Notificações

### 6.1 Criação (Notificacao::criarNotificacao)

**Regras:**
- Requer: id_usuario, mensagem, tipo_notificacao
- Sempre criada como não lida (lida = 0)
- Expira automaticamente após 1 semana
- Timezone: America/Sao_Paulo

**Tipos de Notificação:**
- `1` - Adição a time
- `2` - Convocação para jogo
- `3` - Resultado de jogo
- (outros não documentados)

**⚠️ FALHAS IDENTIFICADAS:**
- Tipos de notificação não são enum/constantes
- Não há job para limpar notificações expiradas
- Expiração não é verificada nas consultas
- Não há limite de notificações por usuário

### 6.2 Limpeza de Notificações (NotificacaoController::limparNotificacoes)

**Regras:**
- Aceita array de IDs
- Deleta cada notificação
- Retorna lista de notificações deletadas

**⚠️ FALHAS IDENTIFICADAS:**
- Não verifica se notificação pertence ao usuário autenticado
- Usuário pode deletar notificações de outros

### 6.3 Marcar como Lida (NotificacaoController::marcarComoLida)

**Regras:**
- Altera campo lida para 1

**⚠️ FALHAS IDENTIFICADAS:**
- Não verifica ownership
- Não usa update() corretamente (deveria ser save())

---

## 7. Likes/Votação

### 7.1 Sistema de Likes (LikesController::store)

**Identificação de Usuário:**
- Gera hash SHA256 de: IP + User Agent
- Permite usuários não autenticados votarem

**Regras:**
- Um usuário (identificado) pode dar like em apenas UM time por jogo
- Incrementa contador de likes do time no jogo
- Valida existência de time e jogo

**⚠️ FALHAS CRÍTICAS:**
- Hash pode ser facilmente manipulado (trocar user agent)
- VPN/proxy permite múltiplos votos
- Contador de likes está no modelo Jogo (deveria ser agregação)
- Não há período de votação definido
- Pode votar em jogo já finalizado
- Race condition ao incrementar contador

---

## 8. Recuperação de Senha

### 8.1 Solicitação de Reset (EmailController::sendResetPassword)

**Regras:**
- Gera token numérico de 6 dígitos (100000-999999)
- Salva token no campo password_reset_token
- Envia email com token
- Token não expira

**⚠️ FALHAS CRÍTICAS:**
- Token não expira (permanece válido indefinidamente)
- Token é numérico previsível (fácil de quebrar por força bruta)
- Não limita tentativas de reset
- Não invalida tokens anteriores
- Token armazenado em texto plano

### 8.2 Reset de Senha (EmailController::resetPassword)

**Regras:**
- Valida token
- Requer senha e confirmação iguais
- Invalida token após uso (password_reset_token = null)
- Criptografa nova senha

**⚠️ FALHAS IDENTIFICADAS:**
- Não valida força da nova senha
- Comparação de senhas usa == (deveria usar ===)
- Não envia email de confirmação
- Não revoga tokens de acesso ativos

---

## 9. Pontos Críticos e Falhas

### 🔴 Crítico - Segurança

1. **Falta de Middleware de Autorização**
   - **Problema:** Qualquer usuário autenticado pode acessar endpoints admin
   - **Localização:** Falta em todos os controllers
   - **Correção:** Criar middleware `CheckUserType` e aplicar em rotas
   ```php
   // app/Http/Middleware/CheckUserType.php
   public function handle($request, Closure $next, $tipo)
   {
       if ($request->user()->tipo_usuario < $tipo) {
           return response()->json(['error' => 'Unauthorized'], 403);
       }
       return $next($request);
   }
   ```

2. **Tokens de Recuperação Inseguros**
   - **Problema:** Tokens numéricos de 6 dígitos, sem expiração, em texto plano
   - **Localização:** EmailController::sendResetPassword
   - **Correção:** Usar Str::random(60), adicionar expires_at, hash token
   ```php
   $token = Str::random(60);
   $user->password_reset_token = hash('sha256', $token);
   $user->password_reset_expires = now()->addHours(2);
   ```

3. **Sistema de Likes Vulnerável**
   - **Problema:** Identificação por IP+UA facilmente manipulável
   - **Localização:** LikesController::generateUserIdentifier
   - **Correção:** Exigir autenticação OU usar token único por sessão com rate limiting

4. **Ausência de Validação de Permissões**
   - **Problema:** Usuários podem deletar notificações de outros, modificar dados alheios
   - **Localização:** NotificacaoController, UserController
   - **Correção:** Adicionar verificação de ownership em cada operação

### 🟡 Alto - Integridade de Dados

5. **Race Conditions em Placares**
   - **Problema:** Atualização simultânea pode corromper dados
   - **Localização:** PlacarController::update
   - **Correção:** Usar DB::beginTransaction() e locks
   ```php
   DB::beginTransaction();
   try {
       $jogo = Jogo::lockForUpdate()->findOrFail($id);
       // ... lógica
       DB::commit();
   } catch (\Exception $e) {
       DB::rollBack();
   }
   ```

6. **Chaveamento Quebrado ao Deletar Jogos**
   - **Problema:** Deletar jogo não atualiza referências
   - **Localização:** JogosController::destroy
   - **Correção:** Cascade delete OU impedir deleção de jogos em chaveamento ativo

7. **Múltiplos Tokens Ativos**
   - **Problema:** Tokens nunca são revogados
   - **Localização:** AuthController::login
   - **Correção:** Revogar tokens antigos antes de criar novo
   ```php
   $user->tokens()->delete(); // Revoga todos
   $token = $user->createToken('main')->plainTextToken;
   ```

8. **Contador de Likes Desnormalizado**
   - **Problema:** Contador pode divergir da contagem real
   - **Localização:** Modelo Jogo (likes_time_1, likes_time_2)
   - **Correção:** Usar agregação ou manter sincronizado com events

### 🟠 Médio - Validação e UX

9. **Validação Insuficiente de Dados**
   - **Problema:** Várias entradas não são validadas adequadamente
   - **Localizações:**
     - Quantidade de participantes em modalidade
     - Força de senha em cadastro/reset
     - Conflitos de horário em jogos
     - Times da mesma modalidade em jogos
   - **Correção:** Criar Form Requests específicos com validações robustas

10. **Conversão de Data Frágil**
    - **Problema:** Carbon::createFromFormat pode lançar exceção
    - **Localização:** JogosController, UserController
    - **Correção:** Usar try-catch OU validação prévia com regex

11. **Mensagens de Erro Inconsistentes**
    - **Problema:** Mix de português e inglês, typos
    - **Localização:** AuthController ("Alg deu errado")
    - **Correção:** Usar arquivos de tradução Laravel (lang/)

12. **Empates Não Tratados**
    - **Problema:** Sistema não prevê jogos empatados
    - **Localização:** PlacarController::update
    - **Correção:** Adicionar lógica para prorrogação/penalidades

### 🟢 Baixo - Qualidade de Código

13. **Código Morto**
    - **Problema:** Variável $shuffledTeams nunca usada
    - **Localização:** Jogo::organizeMatches linha ~90
    - **Correção:** Remover OU usar: `shuffle($teams); // modifica array in-place`

14. **Falta de Logs**
    - **Problema:** Erros não são logados adequadamente
    - **Localização:** Try-catch em vários controllers
    - **Correção:** Adicionar Log::error($e) antes de retornar erro

15. **Soft Delete Não Implementado**
    - **Problema:** Deleções são permanentes
    - **Localização:** Todos os models
    - **Correção:** Adicionar SoftDeletes trait onde apropriado

16. **Falta de Paginação Consistente**
    - **Problema:** Alguns endpoints retornam todos os registros
    - **Localização:** CategoriaController::index, FasesController::index
    - **Correção:** Sempre usar paginate() para listas

---

## 📊 Matriz de Priorização de Correções

| Prioridade | Item | Impacto | Esforço | Prazo Sugerido |
|------------|------|---------|---------|----------------|
| 🔴 P0 | #1 - Middleware Autorização | Alto | Médio | Imediato |
| 🔴 P0 | #2 - Tokens Seguros | Alto | Baixo | Imediato |
| 🔴 P0 | #4 - Validação Ownership | Alto | Baixo | 1 semana |
| 🟡 P1 | #5 - Race Conditions | Alto | Médio | 2 semanas |
| 🟡 P1 | #7 - Revogação Tokens | Médio | Baixo | 2 semanas |
| 🟡 P1 | #9 - Validações | Médio | Alto | 3 semanas |
| 🟠 P2 | #3 - Sistema Likes | Médio | Alto | 1 mês |
| 🟠 P2 | #6 - Integridade Chaveamento | Médio | Alto | 1 mês |
| 🟠 P2 | #12 - Empates | Baixo | Médio | 1 mês |
| 🟢 P3 | #14 - Logs | Baixo | Baixo | 2 meses |
| 🟢 P3 | #15 - Soft Delete | Baixo | Médio | 2 meses |

---

## 🛠️ Recomendações Arquiteturais

### 1. Implementar Services Layer
Separar lógica de negócio dos controllers:
```
app/Services/
  ├── AuthService.php
  ├── GameService.php
  ├── TournamentService.php
  ├── TeamService.php
  └── NotificationService.php
```

### 2. Criar Events e Listeners
Para ações que disparam efeitos colaterais:
```php
// Events
GameFinished → SendNotificationsToPlayers
PlayerAddedToTeam → NotifyPlayer
TournamentCreated → GenerateBracket
```

### 3. Implementar Policies
Para autorização granular:
```php
app/Policies/
  ├── TeamPolicy.php
  ├── GamePolicy.php
  └── UserPolicy.php
```

### 4. Usar Enums (PHP 8.1+)
Para tipos fixos:
```php
enum UserType: int {
    case PLAYER = 1;
    case MANAGER = 2;
    case ADMIN = 3;
}
```

### 5. Implementar Testes
Cobertura mínima:
- Autenticação e autorização
- Geração de chaveamento
- Progressão de jogos
- Sistema de likes

---

## 📝 Checklist de Implementação

### Fase 1 - Segurança (Sprint 1)
- [ ] Criar middleware de autorização
- [ ] Implementar sistema seguro de reset de senha
- [ ] Adicionar validação de ownership em notificações
- [ ] Revogar tokens antigos no login
- [ ] Adicionar rate limiting em endpoints sensíveis

### Fase 2 - Integridade (Sprint 2)
- [ ] Adicionar transações em operações críticas
- [ ] Implementar locks para race conditions
- [ ] Corrigir deleção de jogos no chaveamento
- [ ] Validar times da mesma modalidade
- [ ] Tratar empates em jogos

### Fase 3 - Qualidade (Sprint 3)
- [ ] Criar Form Requests robustos
- [ ] Implementar sistema de logs
- [ ] Adicionar soft deletes
- [ ] Internacionalizar mensagens
- [ ] Documentar API (Swagger/OpenAPI)

### Fase 4 - Arquitetura (Sprint 4)
- [ ] Extrair lógica para Services
- [ ] Criar Events e Listeners
- [ ] Implementar Policies
- [ ] Refatorar para usar Enums
- [ ] Adicionar testes automatizados

---

**Documento gerado em:** Novembro 2025  
**Versão:** 1.0  
**Última atualização:** Este documento deve ser atualizado conforme correções são implementadas
