import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export async function atualizarOracoesMock() {
  try {
    const snapshot = await getDocs(collection(db, "oracoes"));

    const Nomes = [
      "Alexandre Barreto",
      "Beatriz Silva",
      "Carlos Eduardo",
      "Daniela Costa",
    ];

    for (const docSnap of snapshot.docs) {
      const id = docSnap.id;

      const nomes = Nomes[Math.floor(Math.random() * Nomes.length)];

      await updateDoc(doc(db, "oracoes", id), {
        nomes: nomes.substring(0, 50),
      });

      console.log(`Documento ${id} atualizado com sucesso`);
    }

    console.log("Todos os documentos foram atualizados");
  } catch (error) {
    console.log("Erro ao atualizar documentos:", error);
  }
}