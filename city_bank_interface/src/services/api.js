import axios from "axios";

// ==============================
// 🔗 API BASE
// ==============================
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// 💳 ACCOUNTS
// ==============================

// 1. Função para listar todas as contas
export const getAccounts = async () => {
  const { data } = await api.get("/accounts");
  return data;
};

// 2. Função para buscar conta por ID
export const getAccountById = async (accountId) => {
  const { data } = await api.get(`/accounts/${accountId}`);
  return data;
};

// 3. Função para criar nova conta
export const createAccount = async (accountData) => {
  const { data } = await api.post("/accounts", accountData);
  return data;
};

// 4. Função para atualizar conta existente
export const updateAccount = async (accountId, accountData) => {
  const { data } = await api.put(`/accounts/${accountId}`, accountData);
  return data;
};

// 5. Função para deletar conta
export const deleteAccount = async (accountId) => {
  await api.delete(`/accounts/${accountId}`);
};

// ==============================
// 💸 TRANSAÇÕES
// ==============================

// 1. Função para listar transações por conta
export const getTransactionsByAccountId = async (accountId) => {
  const { data } = await api.get(`/accounts/${accountId}/transactions`);
  return data;
};

// 2. Função para criar nova transação
export const createTransaction = async (accountId, transactionData) => {
  const { data } = await api.post(
    `/accounts/${accountId}/transactions`,
    transactionData,
  );
  return data;
};

// ==============================
// 🔁 TRANSFERÊNCIA
// ==============================

// 1. Função para transferir fundos entre contas
export const transferFunds = async (fromId, toId, amount) => {
  const { data } = await api.post("/accounts/transfer", null, {
    params: {
      fromId,
      toId,
      amount,
    },
  });
  return data;
};

/**
 * Ele utiliza a biblioteca Axios para criar um "túnel" de comunicação
 * Quando o utilizador clicar em "Registar", o React enviará os dados
 * (JSON) através desta api para o Spring Boot, que por sua vez
 * guardará as informações no MySQL.
 */
