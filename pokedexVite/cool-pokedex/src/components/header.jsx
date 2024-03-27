// components/Header.jsx
import Link from 'next/link';
import styles from './Header.module.css'; 

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/pokemons">
              <a>Pokémons</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
