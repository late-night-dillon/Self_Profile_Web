type LoaderProps = {
    text?: string;
    className?: string; // untuk posisi (center, dll)
};

export default function Loader({
    text = "loading",
    className = ""
} : LoaderProps) {
    return (
        <div className={`uiv-loader ${className}`} role="status" aria-live="polite">
            <span className="uiv-loader-text">{text}</span>
            <span className="uiv-load"/>
        </div>
    );
}
