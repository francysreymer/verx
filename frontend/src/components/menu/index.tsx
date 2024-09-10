import Link from "next/link";
import { MenuProps } from "@/components/menu/types";

const Menu: React.FC<MenuProps> = ({ currentMenu }) => {
  return (
    <nav className="bg-blue-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/farms" legacyBehavior>
            <a
              className={`text-white ${
                currentMenu === "farms" ? "font-bold" : ""
              }`}
            >
              Listagem de Propriedades Rurais
            </a>
          </Link>
        </li>
        <li>
          <Link href="/dashboards" legacyBehavior>
            <a
              className={`text-white ${
                currentMenu === "dashboards" ? "font-bold" : ""
              }`}
            >
              Dashboard
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
