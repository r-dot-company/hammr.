import { Suspense } from "react"
import {
    Center,
    Html,
    OrbitControls,
    useCubeTexture
} from "@react-three/drei"
import { Euler } from "three"
import STLRenderer from "./STLRenderer"
import BrowserOnlyCanvas from "./BrowserOnlyCanvas"
import { API } from "api/types"
import {
    findProductModel,
    findProductPreviewImage,
    getProductMeta
} from "lib/products"
import { shopr } from "api"
import styled from "styled-components"

const PreviewImage = styled.img`
    height: 500px;
`

function Scene({ product }: {
    product: API.Product
}) {
    const model = findProductModel(product)
    const meta = getProductMeta(product)

    const envMap = useCubeTexture(
        ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
        { path: "/assets/" }
    )

    if (!model) {
        return null
    }

    return (
        <>
            <OrbitControls makeDefault enablePan={false} enableZoom={false}/>
            <Center>
                <STLRenderer
                    url={shopr.getAssetURL(model)}
                    rotation={new Euler(-Math.PI / 2, 0, 0)}
                >
                    <meshStandardMaterial
                        color={meta.modelColor}
                        roughness={0}
                        metalness={1}
                        envMap={envMap}
                        envMapIntensity={1}
                    />
                </STLRenderer>
            </Center>
        </>
    )
}

export default function ProductScene(props: React.ComponentProps<typeof Scene>) {
    const image = findProductPreviewImage(props.product)

    const fallback = !image ? null : (
        <Html center>
            <PreviewImage src={shopr.getAssetURL(image)} alt="Preview"/>
        </Html>
    )
    
    return (
        <BrowserOnlyCanvas camera={{ position: [0, 0, 150] }}>
            <Suspense fallback={fallback}>
                <Scene {...props}/>
            </Suspense>
        </BrowserOnlyCanvas>
    )
}
