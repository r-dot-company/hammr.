import { Suspense } from "react"
import { Center, OrbitControls, useCubeTexture } from "@react-three/drei"
import { ColorRepresentation, Euler } from "three"
import STLRenderer from "./STLRenderer"
import BrowserOnlyCanvas from "./BrowserOnlyCanvas"

function Scene({ modelUrl, modelColor }: {
    modelUrl: string,
    modelColor: ColorRepresentation
}) {
    const envMap = useCubeTexture(
        ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
        { path: "/assets/" }
    )

    return (
        <>
            <OrbitControls makeDefault enablePan={false} enableZoom={false}/>
            <Suspense fallback={null}>
                <Center>
                    <STLRenderer
                        url={modelUrl}
                        rotation={new Euler(-Math.PI / 2, 0, 0)}
                    >
                        <meshStandardMaterial
                            color={modelColor}
                            roughness={0}
                            metalness={1}
                            envMap={envMap}
                            envMapIntensity={1}
                        />
                    </STLRenderer>
                </Center>
            </Suspense>
        </>
    )
}

export default function ProductScene(props: React.ComponentProps<typeof Scene>) {
    return (
        <BrowserOnlyCanvas camera={{ position: [0, 0, 150] }}>
            <Suspense fallback={null}>
                <Scene {...props}/>
            </Suspense>
        </BrowserOnlyCanvas>
    )
}
