import { Suspense } from "react"
import { Center, OrbitControls, useCubeTexture } from "@react-three/drei"
import { Color, Euler, SpotLight, SpotLightHelper } from "three"
import STLRenderer from "./STLRenderer"
import BrowserOnlyCanvas from "./BrowserOnlyCanvas"

function Scene({ modelUrl, modelColor }: {
    modelUrl: string,
    modelColor: Color
}) {
    const envMap = useCubeTexture(
        ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
        { path: "/assets/" }
    )
    
    const intensity = 1.5

    return (
        <>
            {/* <ambientLight intensity={0.2}/> */}
            {/* <spotLight position={[0, 90, 200]} intensity={intensity}/>
            <spotLight position={[0, 90, -200]} intensity={intensity}/>
            <spotLight position={[-150, 90, 25]} intensity={intensity}/>
            <spotLight position={[150, 125, -25]} intensity={intensity}/>
            <spotLight position={[75, -125, 75]} intensity={intensity}/> */}
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
