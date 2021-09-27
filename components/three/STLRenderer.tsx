import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { useLoader } from "@react-three/fiber"

export default function STLRenderer({ url, children, ...props }: React.ComponentProps<"mesh"> & {
    url: string
}) {
    const geometry = useLoader(STLLoader, url)

    return (
        <mesh {...props}>
            <bufferGeometry {...geometry} attach="geometry"/>
            { children }
        </mesh>
    )
}
