import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebaseSeed.js";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";

export const MockOracoes = async () => {
  const oracoes = [
    {
      intencao: "Saúde e proteção para minha família",
      dataOracao: Timestamp.fromDate(new Date("2025-08-15T10:00:00")),
      localLeitura: "Missa dominical São Sebastião de Itaipu",
    },
    {
      intencao: "Paz no mundo e fim das guerras",
      dataOracao: Timestamp.fromDate(new Date("2025-08-16T14:30:00")),
      localLeitura: "Capela Nossa Senhora Aparecida",
    },
    {
      intencao: "Agradecimento pelas bênçãos recebidas",
      dataOracao: Timestamp.fromDate(new Date("2025-08-17T09:15:00")),
      localLeitura: "Igreja Matriz São Sebastião",
    },
    {
      intencao: "Força e coragem para enfrentar desafios",
      dataOracao: Timestamp.fromDate(new Date("2025-08-18T18:45:00")),
      localLeitura: "Comunidade São Francisco de Assis",
    },
    {
      intencao: "Proteção e bênçãos para os idosos da comunidade",
      dataOracao: Timestamp.fromDate(new Date("2025-08-19T11:00:00")),
      localLeitura: "Lar dos Idosos São Vicente de Paulo",
    },
    {
      intencao: "Cura e conforto para os doentes",
      dataOracao: Timestamp.fromDate(new Date("2025-08-20T15:30:00")),
      localLeitura: "Hospital São Sebastião",
    },
  ];

  let cont = 0;

  for (const oracao of oracoes) {
    cont++;
    const id = uuidv4();
    await setDoc(doc(db, "oracoes", id), oracao);
  }

  console.log(`✅ Mock de ${cont} orações inserido com sucesso!`);
};
