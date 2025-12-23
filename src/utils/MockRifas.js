import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseSeed.js";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";

export const MockRifas = async () => {
  const rifas = [
    {
      nome: "Rifa para a construção da nova capela",
      descricao:
        "Arrecadação de fundos para a construção da nova capela da comunidade.",
      dataRifa: Timestamp.fromDate(new Date("2025-08-15T10:00:00")),
      imageUrl:
        "https://2.bp.blogspot.com/-bxJT-KXnGbA/Ue6MXcpwZ4I/AAAAAAAAcZI/A0Ti9zOX3mc/s1600/IMG_0861.JPG",
      valor: 10.0,
      premio: "Smartphone de última geração",
      dataSorteio: Timestamp.fromDate(new Date("2025-09-15T15:00:00")),
      localSorteio: "Salão Paroquial",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Rifa Solidária para o Asilo",
      descricao:
        "Ajuda ao asilo local com a arrecadação de fundos através desta rifa.",
      dataRifa: Timestamp.fromDate(new Date("2025-10-01T09:00:00")),
      imageUrl:
        "https://4.bp.blogspot.com/_EVxuE28sohU/THo9MS26yHI/AAAAAAAAIg0/ZccaWGeMk6M/s1600/geral+retiro.jpg",
      valor: 5.0,
      premio: "Tablet",
      dataSorteio: Timestamp.fromDate(new Date("2025-11-01T14:00:00")),
      localSorteio: "Auditório da Paróquia",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Rifa Cultural da Comunidade",
      descricao: "Incentivo à cultura local com esta rifa especial.",
      dataRifa: Timestamp.fromDate(new Date("2025-11-20T11:00:00")),
      imageUrl:
        "https://1.bp.blogspot.com/-dtlVHWUK8Y0/Ue6Mno6L0EI/AAAAAAAAcbo/pjo6wzJzc1c/s1600/IMG_0888.JPG",
      valor: 15.0,
      premio: "Ingresso para show nacional",
      dataSorteio: Timestamp.fromDate(new Date("2025-12-20T16:00:00")),
      localSorteio: "Teatro Municipal",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Rifa da Saúde Comunitária",
      descricao: "Arrecadação para projetos de saúde na comunidade.",
      dataRifa: Timestamp.fromDate(new Date("2025-12-05T10:30:00")),
      imageUrl:
        "https://2.bp.blogspot.com/-ZwVWuhBvlZ8/Ue6McLiV3mI/AAAAAAAAcZw/jRjFJIRnM68/s1600/IMG_0867.JPG",
      valor: 20.0,
      premio: "Bicicleta",
      dataSorteio: Timestamp.fromDate(new Date("2026-01-05T15:30:00")),
      localSorteio: "Praça Central",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Rifa Gastronômica",
      descricao: "Promoção gastronômica com prêmios deliciosos.",
      dataRifa: Timestamp.fromDate(new Date("2026-01-25T12:00:00")),
      imageUrl:
        "https://3.bp.blogspot.com/_EVxuE28sohU/S7X0jIrP6QI/AAAAAAAAGiw/PCTMq-gQ940/s1600/IMG_4740.JPG",
      valor: 8.0,
      premio: "Jantar para duas pessoas em restaurante renomado",
      dataSorteio: Timestamp.fromDate(new Date("2026-02-25T19:00:00")),
      localSorteio: "Restaurante Local",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Rifa Esportiva da Comunidade",
      descricao: "Incentivo ao esporte com esta rifa especial.",
      dataRifa: Timestamp.fromDate(new Date("2026-02-15T09:30:00")),
      imageUrl:
        "https://m.media-amazon.com/images/I/71YYUxk7p-L._AC_SX679_.jpg",
      valor: 12.0,
      premio: "Kit completo de equipamentos esportivos",
      dataSorteio: Timestamp.fromDate(new Date("2026-03-15T14:30:00")),
      localSorteio: "Clube Esportivo Local",
      criadoEm: Timestamp.now(),
    },
  ];

  for (const rifa of rifas) {
    const id = uuidv4();
    await setDoc(doc(db, "rifas", id), rifa);
  }

  console.log("✅ Mock de 6 rifas inserido com sucesso!");
};
