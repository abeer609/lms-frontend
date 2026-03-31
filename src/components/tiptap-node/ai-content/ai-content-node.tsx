import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react'
import { Card } from '../../tiptap-ui-primitive/card'
import { Textarea } from '@headlessui/react'
import { useState } from 'react'
import { isValidPosition } from '../../lib/tiptap-utils'
import { client } from '../../../client'
import { marked } from "marked"


const AINodeView: React.FC<NodeViewProps> = (props) => {
    const [response, setResponse] = useState("") // ai response
    const [disableSendBtn, setDisableSendBtn] = useState(false)
    const [show, setShow] = useState(true) // for showing overlay
    const [loading, setLoading] = useState(false) // for showing overlay
    const [prompt, setPrompt] = useState("") // setting prompt

    const pos = props.getPos()
    return (
        <NodeViewWrapper>
            <div
                className={show ? 'bg-transparent fixed inset-0' : 'hidden'}
                onClick={() => {
                    setShow(false)
                    if (isValidPosition(pos)) {
                        props.editor.chain().focus().deleteRange({ from: pos, to: pos + 1 }).run()
                    }
                }
                }></div>
            <Card className='p-4 mt-6'>
                <Textarea
                    value={prompt} rows={3}
                    placeholder='write your propmt..'
                    className="w-full focus:outline-none resize-none max-h-64"
                    onChange={(e) => {
                        setPrompt(e.target.value)
                    }}
                />
                <div className='w-full flex justify-end'>
                    <button
                        disabled={disableSendBtn}
                        onClick={() => {
                            setLoading(true)
                            client
                                .post(
                                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                                    {
                                        "system_instruction": {
                                            "parts": [
                                                {
                                                    "text": "I will use you for educational purposes. Make sure information is correct and concise. When a user gives you a prompt, ensure that you put a headline at the top of the response. Add the references as links bottom of the response."
                                                }
                                            ]
                                        },
                                        contents: [
                                            {
                                                parts: [
                                                    {
                                                        text: prompt,
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        headers: {
                                            "X-goog-api-key": "AIzaSyDsogwKeVtCBHga4MRgPy28obf2Yb6TeiQ",
                                            "Authorization": ""
                                        },
                                    }
                                )
                                .then((res) => {
                                    setResponse(res.data.candidates[0].content.parts[0].text)

                                    if (isValidPosition(pos)) {
                                        props.editor.chain().focus().deleteRange({ from: pos, to: pos + 1 }).insertContentAt(pos, marked(res.data.candidates[0].content.parts[0].text)).run()
                                    }
                                    setLoading(false)
                                }).catch(e=>{
                                    console.log(e);
                                    setLoading(false)
                                }).finally(()=>{
                                    setLoading(false)
                                })
                        }
                        }
                        className='bg-indigo-500 rounded-lg p-2 cursor-pointer '>
                        {loading ?
                            <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            :
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289L4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071C4.68342 13.0976 5.31658 13.0976 5.70711 12.7071L11 7.41421V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V7.41421L18.2929 12.7071C18.6834 13.0976 19.3166 13.0976 19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L12.7071 4.29289Z" fill="currentColor"></path>
                            </svg>
                        }
                    </button>
                </div>
            </Card>
        </NodeViewWrapper>
    )
}

export default AINodeView