import styles from './Card.module.css';

export default function Card({className, children}: Readonly<{className?: string, children: React.ReactNode}>) {
    return (
        <div className={`${styles.card} ${className ? styles[className] : ''}`}>
            {children}
        </div>
    );
}