// app/components/DynamicSvgIcon.tsx
import { useEffect, useState } from 'react';

export function DynamicSvgIcon({
    name,
    className = '',
    color,
}: {
    name: string;
    className?: string;
    color?: string;
}) {
    const [svg, setSvg] = useState<string>('');

    useEffect(() => {
        fetch(`/assets/geo_icons/${name}.svg`)
            .then((res) => res.text())
            .then((text) => {
                // Inject className and style
                let modifiedSvg = text.replace('<svg', `<svg class="${className}"`);
                if (color) {
                    modifiedSvg = modifiedSvg.replace('<svg', `<svg style="color: ${color}"`);
                }
                setSvg(modifiedSvg);
            });
    }, [name, className, color]);

    return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
