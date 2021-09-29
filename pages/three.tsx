import { NextPage } from "next"
import styled from "styled-components"
import ProductScene from "components/three/ProductScene"

const CanvasContainer = styled.div`
    height: 500px;
`

const ThreePage: NextPage = () => {
    return (
        <div>
            <h1>Three</h1>

            <CanvasContainer>
                <ProductScene modelUrl="/assets/hammr.stl"/>
            </CanvasContainer>
        </div>
    )
}

export default ThreePage
