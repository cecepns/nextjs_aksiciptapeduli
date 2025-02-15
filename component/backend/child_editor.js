import {useState, useMemo, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';

export default function Editor({text, deskripsi}) {

    const quillRef = useRef(null);

    const [quillValue, useQuill] = useState(null)

    const imageHandler = () => {

        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async() => {
            const file = input.files[0]

            const formData = new FormData();

            formData.append("image", file);
            const imageEmbed = await fetch('../api/uploadfile/media', {
                method: 'POST',
                body: formData
            })

            const result = await imageEmbed.json();

            const urlImage = 'http://localhost:3000/img/media/' + result.image
            // const urlImage = 'https://aksiciptapeduli.org/img/media/' + result.image

            // let quill = ReactQuill.getEditor()
            // const quill = quillReff.current.getEditor();
            const quill = quillRef.current.getEditor();
﻿
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, 'image', urlImage)
        }

    }

    let format = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'list',
        'bullet',
        'align',
        'color',
        'link',
        'image',
        'background'
    ];

    let modules = useMemo(()=> { return {
       
        toolbar: {
                container : [
                            [{'font': []}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            ['bold', 'italic', 'underline'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'align': []}],
                            [{'color': []}, {'background': []}],
                            ['link','image'],
                            ['clean'],
                        ],
                        handlers: {
                            'image': imageHandler, 
                          },
            },
    };
},[])

    let handleChange = (e) => {
        text(e) // rich text
        // usePosts(editor.getHTML()) // rich text console.log(editor.getText()); //
        // plain text console.log(editor.getLength()); // number of characters
    }

    return (
        <div>
            <ReactQuill
                value={deskripsi}
                theme="snow"
                modules={modules}
                formats={format}
                ref={quillRef}
                onChange={e=>handleChange(e)}
                />
        </div>
    )
}
