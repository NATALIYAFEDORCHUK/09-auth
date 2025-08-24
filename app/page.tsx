import css from "./Home.module.css";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "This is a modern web application on Next.js using App Router",
};

const Home = () => {
  return (
    <div>
      <main>
        <div className={css.container}>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          <p className={css.description}>
            NoteHub is a simple and efficient application designed for managing
            personal notes. It helps keep your thoughts organized and accessible
            in one place, whether you are at home or on the go.
          </p>
          <p className={css.description}>
            The app provides a clean interface for writing, editing, and
            browsing notes. With support for keyword search and structured
            organization, NoteHub offers a streamlined experience for anyone who
            values clarity and productivity.
          </p>
          <Image
            src="https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
            alt="note"
            width={1200}
            height={630}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
