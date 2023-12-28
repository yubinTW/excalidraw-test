import { Excalidraw, convertToExcalidrawElements } from '@excalidraw/excalidraw'
import './App.css'
import { useState } from 'react'
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'
import { ExcalidrawElementSkeleton } from '@excalidraw/excalidraw/types/data/transform'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)
  const [elementsInputString, setElementsInputString] = useState<string>('')

  const serializeElements = () => {
    if (!excalidrawAPI) return
    const elements = excalidrawAPI.getSceneElements()

    console.log(`elements: ${JSON.stringify(elements, null, 2)}`)
  }

  const serializeAppState = () => {
    if (!excalidrawAPI) return
    const appState = excalidrawAPI.getAppState()

    console.log(`appState: ${JSON.stringify(appState, null, 2)}`)
  }

  const serializeFiles = () => {
    if (!excalidrawAPI) return
    const files = excalidrawAPI.getFiles()

    console.log(`files: ${JSON.stringify(files, null, 2)}`)
  }

  const updateScene = () => {
    if (!excalidrawAPI) return
    const elements = JSON.parse(elementsInputString)
    excalidrawAPI.updateScene({ elements })
  }

  const generateExcalidrawElement = () => {
    if (!excalidrawAPI) return
    const elementSkeleton: Array<ExcalidrawElementSkeleton> = JSON.parse(elementsInputString)
    const elements: Array<ExcalidrawElement> = convertToExcalidrawElements(elementSkeleton)
    setElementsInputString(JSON.stringify(elements, null, 2))
  }

  return (
    <>
      <div style={{ height: '400px' }}>
        <Excalidraw excalidrawAPI={(api) => setExcalidrawAPI(api)} />
      </div>
      <div>
        <button onClick={serializeElements}>elements</button>
        <button onClick={serializeAppState}>appState</button>
        <button onClick={serializeFiles}>files</button>
      </div>
      <textarea
        name="elementsInputString"
        id="elementsInputString"
        cols={70}
        rows={15}
        value={elementsInputString}
        onChange={(e) => setElementsInputString(e.target.value)}
        placeholder="Array<ExcalidrawElement> or Array<ExcalidrawElementSkeleton> ..."
      ></textarea>
      <div>
        <button onClick={updateScene}>UpdateScene</button>
        <button onClick={generateExcalidrawElement}>GenerateExcalidrawElement</button>
      </div>
    </>
  )
}

export default App
