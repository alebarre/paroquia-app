import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export async function atualizarEventosMock() {
  try {
    const snapshot = await getDocs(collection(db, "eventos"));

    const locaisMock = [
      "Salão Paroquial",
      "Igreja Matriz",
      "Capela Central",
      "Auditório",
      "Pátio Externo",
      "Sala 01",
      "Sala 02",
      "Jardim",
    ];

    const descricoesMock = [
      "Evento especial organizado pela comunidade para celebrar a fé e promover integração entre os participantes.",
      "Atividade voltada para formação espiritual e convivência fraterna, aberta a todos os membros da paróquia.",
      "Encontro destinado ao aprofundamento da espiritualidade e fortalecimento da vida comunitária.",
      "Momento de oração, reflexão e partilha, conduzido pela equipe pastoral.",
      "Celebração temática com participação ativa dos fiéis e convidados.",
    ];

    for (const docSnap of snapshot.docs) {
      const id = docSnap.id;

      const local = locaisMock[Math.floor(Math.random() * locaisMock.length)];
      const descricaoDetalhada =
        descricoesMock[Math.floor(Math.random() * descricoesMock.length)];

      await updateDoc(doc(db, "eventos", id), {
        local: local.substring(0, 15),
        descricaoDetalhada: descricaoDetalhada.substring(0, 200),
      });

      console.log(`Documento ${id} atualizado com sucesso`);
    }

    console.log("Todos os documentos foram atualizados");
  } catch (error) {
    console.log("Erro ao atualizar documentos:", error);
  }
}