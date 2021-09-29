import { Canvas } from "@react-three/fiber"

export default function BrowserOnlyCanvas({
    children,
    ...props
}: React.ComponentProps<typeof Canvas>) {
    return (
        <Canvas {...props}>
            { process.browser && children }
        </Canvas>
    )
}
