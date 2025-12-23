import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseSeed.js";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";

export const MockEventos = async () => {
  const eventos = [
    {
      nome: "Festa de São Sebastião",
      descricao: "Procissão, missa solene e confraternização.",
      dataEvento: Timestamp.fromDate(new Date("2025-01-20T19:00:00")),
      imageUrl:
        "https://2.bp.blogspot.com/-bxJT-KXnGbA/Ue6MXcpwZ4I/AAAAAAAAcZI/A0Ti9zOX3mc/s1600/IMG_0861.JPG",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Encontro de Jovens",
      descricao: "Louvor, adoração e partilha para jovens da comunidade.",
      dataEvento: Timestamp.fromDate(new Date("2025-02-10T18:30:00")),
      imageUrl:
        "https://4.bp.blogspot.com/_EVxuE28sohU/THo9MS26yHI/AAAAAAAAIg0/ZccaWGeMk6M/s1600/geral+retiro.jpg",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Retiro Espiritual",
      descricao: "Dia de oração, reflexão e silêncio.",
      dataEvento: Timestamp.fromDate(new Date("2025-03-05T08:00:00")),
      imageUrl:
        "https://1.bp.blogspot.com/-dtlVHWUK8Y0/Ue6Mno6L0EI/AAAAAAAAcbo/pjo6wzJzc1c/s1600/IMG_0888.JPG",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Noite de Louvor",
      descricao: "Música, oração e testemunhos.",
      dataEvento: Timestamp.fromDate(new Date("2025-04-15T20:00:00")),
      imageUrl:
        "https://2.bp.blogspot.com/-ZwVWuhBvlZ8/Ue6McLiV3mI/AAAAAAAAcZw/jRjFJIRnM68/s1600/IMG_0867.JPG",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Catequese para Adultos",
      descricao: "Formação cristã para adultos e catecúmenos.",
      dataEvento: Timestamp.fromDate(new Date("2025-05-12T19:30:00")),
      imageUrl:
        "https://3.bp.blogspot.com/_EVxuE28sohU/S7X0jIrP6QI/AAAAAAAAGiw/PCTMq-gQ940/s1600/IMG_4740.JPG",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Tarde da Misericórdia",
      descricao: "Adoração, terço da misericórdia e confissões.",
      dataEvento: Timestamp.fromDate(new Date("2025-06-22T15:00:00")),
      imageUrl:
        "https://m.media-amazon.com/images/I/71YYUxk7p-L._AC_SX679_.jpg",
      criadoEm: Timestamp.now(),
    },
    {
      nome: "Arraiá da Paróquia",
      descricao: "Comidas típicas, brincadeiras e música ao vivo.",
      dataEvento: Timestamp.fromDate(new Date("2025-07-10T17:00:00")),
      imageUrl:
        "https://pagina3.com.br/wp-content/uploads/2023/05/almoco2mai.jpg",
      criadoEm: Timestamp.now(),
    },
  ];

  for (const evento of eventos) {
    const id = uuidv4();
    await setDoc(doc(db, "eventos", id), evento);
  }

  console.log("✅ Mock de 7 eventos inserido com sucesso!");
};
