interface ToggleSwitchProps {
    checked: boolean;
    onChange: (value: boolean) => void;
}

export default function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
    return (
        <div
            role="switch"
            aria-checked={checked}
            className={`toggle ${checked ? 'on' : 'off'}`}
            onClick={() => onChange(!checked)}
        >
            <div className="toggle-circle" />
        </div>
    );
}
