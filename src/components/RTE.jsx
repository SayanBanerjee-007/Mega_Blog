import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect } from 'react'

function RTE({ name, control, label, defaultValue = '' }) {
	const { theme } = useTheme()
	const [isDark, setIsDark] = useState(theme === 'dark')
	useEffect(() => {
		setIsDark(theme === 'dark')
	}, [theme])

	return (
		<div className="w-full">
			{label && (
				<label className="inline-block mb-3 pl-1 text-lg font-semibold text-slate-800 dark:text-white">
					{label}
				</label>
			)}
			<Controller
				name={name || 'content'}
				control={control}
				render={({ field: { onChange } }) => (
					<div className="relative">
						<Editor
							key={`editor-${isDark ? 'dark' : 'light'}`} // Force re-render on theme change
							apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
							initialValue={defaultValue}
							init={{
								initialValue: defaultValue,
								height: 500,
								menubar: true,
								skin: isDark ? 'oxide-dark' : 'oxide',
								content_css: isDark ? 'dark' : 'default',
								// Enhanced theme integration
								body_class: isDark ? 'dark-mode' : 'light-mode',
								plugins: [
									'image',
									'advlist',
									'autolink',
									'lists',
									'link',
									'image',
									'charmap',
									'preview',
									'anchor',
									'searchreplace',
									'visualblocks',
									'code',
									'fullscreen',
									'insertdatetime',
									'media',
									'table',
									'code',
									'help',
									'wordcount',
									'anchor',
								],
								toolbar:
									'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
								content_style: isDark
									? `
										body {
											font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
											font-size: 16px;
											line-height: 1.6;
											color: #e2e8f0;
											background-color: #1e293b;
											padding: 20px;
											margin: 0;
										}
										h1, h2, h3, h4, h5, h6 {
											color: #f1f5f9;
											margin-top: 1.5em;
											margin-bottom: 0.5em;
											font-weight: 600;
										}
										h1 { font-size: 2.25em; color: #60a5fa; }
										h2 { font-size: 1.875em; color: #818cf8; }
										h3 { font-size: 1.5em; color: #a78bfa; }
										p { margin-bottom: 1em; color: #cbd5e1; }
										a { color: #60a5fa; text-decoration: underline; }
										a:hover { color: #93c5fd; }
										blockquote {
											border-left: 4px solid #60a5fa;
											padding-left: 16px;
											margin: 1.5em 0;
											color: #cbd5e1;
											background-color: #334155;
											padding: 12px 16px;
											border-radius: 8px;
											font-style: italic;
										}
										code {
											background-color: #374151;
											color: #a78bfa;
											padding: 4px 8px;
											border-radius: 6px;
											font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
											font-size: 0.9em;
										}
										pre {
											background-color: #1e293b;
											border: 1px solid #475569;
											border-radius: 8px;
											padding: 16px;
											overflow-x: auto;
										}
										ul, ol { color: #cbd5e1; }
										li { margin-bottom: 0.5em; }
										table { border-collapse: collapse; width: 100%; }
										th, td {
											border: 1px solid #475569;
											padding: 12px;
											text-align: left;
										}
										th { background-color: #374151; color: #f1f5f9; }
									`
									: `
										body {
											font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
											font-size: 16px;
											line-height: 1.6;
											color: #334155;
											background-color: #ffffff;
											padding: 20px;
											margin: 0;
										}
										h1, h2, h3, h4, h5, h6 {
											color: #1e293b;
											margin-top: 1.5em;
											margin-bottom: 0.5em;
											font-weight: 600;
										}
										h1 { font-size: 2.25em; color: #2563eb; }
										h2 { font-size: 1.875em; color: #4f46e5; }
										h3 { font-size: 1.5em; color: #7c3aed; }
										p { margin-bottom: 1em; color: #475569; }
										a { color: #3b82f6; text-decoration: underline; }
										a:hover { color: #1d4ed8; }
										blockquote {
											border-left: 4px solid #3b82f6;
											padding-left: 16px;
											margin: 1.5em 0;
											color: #64748b;
											background-color: #f8fafc;
											padding: 12px 16px;
											border-radius: 8px;
											font-style: italic;
										}
										code {
											background-color: #f1f5f9;
											color: #7c3aed;
											padding: 4px 8px;
											border-radius: 6px;
											font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
											font-size: 0.9em;
										}
										pre {
											background-color: #f8fafc;
											border: 1px solid #e2e8f0;
											border-radius: 8px;
											padding: 16px;
											overflow-x: auto;
										}
										ul, ol { color: #475569; }
										li { margin-bottom: 0.5em; }
										table { border-collapse: collapse; width: 100%; }
										th, td {
											border: 1px solid #e2e8f0;
											padding: 12px;
											text-align: left;
										}
										th { background-color: #f8fafc; color: #1e293b; }
									`,
								branding: false,
								resize: false,
								statusbar: false,
								toolbar_mode: 'sliding',
								contextmenu: 'link image table',
								// Enhanced editor styling
								toolbar_sticky: true,
								toolbar_sticky_offset: 80,
								elementpath: false,
								setup: editor => {
									// Apply custom styles to the editor interface
									editor.on('init', () => {
										const editorContainer = editor.getContainer()
										const iframe = editor
											.getContentAreaContainer()
											.querySelector('iframe')

										if (editorContainer) {
											editorContainer.style.borderRadius = '12px'
											editorContainer.style.overflow = 'hidden'
											editorContainer.style.border = isDark
												? '1px solid #475569'
												: '1px solid #cbd5e1'
											editorContainer.style.boxShadow = isDark
												? '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
												: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
										}

										// Style the toolbar
										const toolbar = editorContainer.querySelector(
											'.tox-toolbar-overlord'
										)
										if (toolbar) {
											toolbar.style.background = isDark
												? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
												: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
											toolbar.style.borderBottom = isDark
												? '1px solid #475569'
												: '1px solid #cbd5e1'
										}

										// Style the menubar
										const menubar =
											editorContainer.querySelector('.tox-menubar')
										if (menubar) {
											menubar.style.background = isDark
												? '#0f172a'
												: '#ffffff'
											menubar.style.borderBottom = isDark
												? '1px solid #334155'
												: '1px solid #e2e8f0'
										}

										// Style the content area
										if (iframe) {
											iframe.style.background = isDark
												? '#1e293b'
												: '#ffffff'
										}
									})

									// Update styles when theme changes
									editor.on('focus', () => {
										const editorContainer = editor.getContainer()
										if (editorContainer) {
											editorContainer.style.borderColor = isDark
												? '#60a5fa'
												: '#3b82f6'
											editorContainer.style.boxShadow = isDark
												? '0 0 0 3px rgba(96, 165, 250, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.3)'
												: '0 0 0 3px rgba(59, 130, 246, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.1)'
										}
									})

									editor.on('blur', () => {
										const editorContainer = editor.getContainer()
										if (editorContainer) {
											editorContainer.style.borderColor = isDark
												? '#475569'
												: '#cbd5e1'
											editorContainer.style.boxShadow = isDark
												? '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
												: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
										}
									})
								},
							}}
							onEditorChange={onChange}
						/>
					</div>
				)}
			/>
		</div>
	)
}

export default RTE
