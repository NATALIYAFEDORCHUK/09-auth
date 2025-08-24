import css from "./SidebarNotes.module.css";
import Link from "next/link";

const NotesSidebar = async () => {
  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important"];

  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default NotesSidebar;
