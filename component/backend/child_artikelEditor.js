import {useState, useMemo, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';

export default function Editor({sendDeskripsi, updateDeskripsi}) {
    // console.log(sendDeskripsi)

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
            const imageEmbed = await fetch('../api/uploadfile/artikel', {
                method: 'POST',
                body: formData
            })

            const result = await imageEmbed.json();

            const urlImage = 'http://localhost:3000/img/artikel/' + result.image

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
        sendDeskripsi(e)
    }

    return (
        <div>
            <ReactQuill
                value={updateDeskripsi}
                theme="snow"
                modules={modules}
                formats={format}
                ref={quillRef}
                onChange={e=>handleChange(e)}
                />
        </div>
    )
}
