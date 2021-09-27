import { Suspense } from "react"
import { Center, OrbitControls } from "@react-three/drei"
import STLRenderer from "components/three/STLRenderer"
import { Euler } from "three"
import { Canvas } from "@react-three/fiber"

export default function ProductScene({ modelUrl }: {
    modelUrl: string
}) {
    return (
        <Canvas camera={{ position: [0, 0, 150] }}>
            <scene>
                <ambientLight intensity={0.1}/>
                <pointLight position={[40, 40, 40]}/>
                <OrbitControls makeDefault enablePan={false} enableZoom={false}/>
                <Suspense fallback={null}>
                    <Center>
                        <STLRenderer
                            url={modelUrl}
                            rotation={new Euler(-Math.PI / 2, 0, 0)}
                        >
                            <meshPhongMaterial/>
                        </STLRenderer>
                    </Center>
                </Suspense>
            </scene>
        </Canvas>
    )
}
