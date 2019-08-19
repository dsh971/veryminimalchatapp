import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import eventConst from '../shared/eventConst';

const MyDropzone = props => {
  const socket = props.socket;
  const userName = props.userName;
    const  getBase64 = (file) => {
        const reader = new FileReader()
        return new Promise(resolve => {
          reader.onload = ev => {
              console.log("ev.target.result: " + ev.target.result);
            resolve(ev.target.result)
          }
          reader.readAsDataURL(file[0])
        })
      };
  const onDrop = useCallback(async acceptedFiles => {
    const readerResult = await getBase64(acceptedFiles);
    socket.emit(eventConst.MESSAGE_SENT, userName, 'img', readerResult);
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default MyDropzone;
