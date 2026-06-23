# 📚 Edital-Pro

Plataforma inteligente para análise de editais utilizando Inteligência Artificial.

O objetivo do projeto é facilitar a leitura, interpretação e estudo de editais de concursos públicos através da extração automática de informações relevantes, geração de resumos e criação de questões para treinamento.

---

## 🚀 Funcionalidades MVP

### 📄 Análise de Editais

- Upload de arquivos PDF
- Extração automática de texto
- Resumo automático do edital
- Identificação de datas importantes
- Checklist de requisitos
- Busca por palavras-chave

### 🤖 Inteligência Artificial

- Geração automática de 10 questões com base no edital
- Usuário responde às questões
- Correção automática das respostas
- Explicação das respostas corretas

---

## 🏗️ Arquitetura

```text
Usuário
   │
   ▼
Frontend (React)
   │
   ▼
Backend (Node.js)
   │
   ├── PostgreSQL
   │
   ├── Serviço Python (FastAPI)
   │       ├── Extração de texto
   │       ├── Limpeza do conteúdo
   │       └── Processamento
   │
   └── OpenAI / Modelos Open Source
           ├── Resumos
           ├── Questões
           ├── Correções
           └── Feedbacks
```

---

## 🛠️ Tecnologias

### Frontend

- React
- TypeScript
- Vite

### Backend

- Node.js
- Express

### IA e Processamento

- Python
- FastAPI

### Banco de Dados

- PostgreSQL

### Inteligência Artificial

- OpenAI API
- Modelos Open Source (futuro)

---

## 📁 Estrutura do Projeto

```text
Edital-Pro/
│
├── frontend/          # Interface React
├── api-node/          # API principal Node.js
├── ai-service/        # Serviço Python/FastAPI
├── database/          # Scripts SQL e migrations
├── docs/              # Documentação
└── README.md
```

---

## 🎯 Roadmap

### Fase 1 — MVP

- [ ] Cadastro de usuários
- [ ] Login com JWT
- [ ] Upload de PDF
- [ ] Extração de texto
- [ ] Resumo automático
- [ ] Datas importantes
- [ ] Checklist de requisitos
- [ ] Busca por palavras-chave
- [ ] Geração de 10 questões
- [ ] Correção automática

### Fase 2

- [ ] Dashboard de desempenho
- [ ] Histórico de análises
- [ ] Estatísticas de estudo

### Fase 3

- [ ] Comparação entre editais
- [ ] Recomendação de editais por perfil
- [ ] Alertas automáticos

### Fase 4

- [ ] Assinaturas premium
- [ ] Notificações por Email
- [ ] API pública

---

## 🔄 Fluxo Principal

1. Usuário envia um edital em PDF.
2. O serviço Python extrai e processa o texto.
3. O Backend envia o conteúdo para a IA.
4. A IA gera:
   - Resumo
   - Datas importantes
   - Checklist
   - Questões
5. Os resultados são salvos no PostgreSQL.
6. O usuário responde às questões.
7. A IA corrige e fornece feedback.

---

## 👨‍💻 Equipe

- Manoel
- Colaborador

---

## 📌 Status

🚧 Projeto em desenvolvimento.

Versão atual: **MVP**
