import { Tldraw, track, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { useYjsStore } from './useYjsStore'
import { MeshGrid } from './MeshGrid'

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev'

export default function YjsExample() {
	const store1 = useYjsStore({
		roomId: 'example17',
		hostUrl: HOST_URL,
	})

	const store2 = useYjsStore({
		roomId: 'example18',
		hostUrl: HOST_URL,
	})

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateRows: 'repeat(2, 1fr)',
				height: '100vh',
			}}
		>
			<div className="tldraw__editor">
				<Tldraw
					key="1"
					autoFocus
					store={store1}
					components={{
						SharePanel: () => <NameEditor key="1" />,
						Grid: MeshGrid,
					}}
				/>
			</div>

			<div className="tldraw__editor">
				<Tldraw
					key="2"
					autoFocus
					store={store2}
					components={{
						SharePanel: () => <NameEditor key="2" />,
						Grid: MeshGrid,
					}}
				/>
			</div>
		</div>
	)
}

const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user.getUserPreferences()

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})
