export default function SectionHeader({ id, title, children }) {
    return (
        <header className="section-header">
            <h2 id={id}>{title}</h2>
            {children && <p className="lead-text">{children}</p>}
        </header>
    );
}
