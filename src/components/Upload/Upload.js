import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import loader from './preloader.gif';
import axios from 'axios';
import {GeneralButton} from '../buttons/JustButtons'
import './upload.css'

export default class Upload extends Component {
    constructor(props){
        super(props)
        this.state = {
          file: '',
          imageURL: '',
          coudinaryURL:'',
          uploaded:'',
          error: ''

        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        
    } 

    handleUploadImage(){

        const data = new FormData();
        data.append('file', this.state.file);
        if(this.state.imageURL){
        this.setState({
            coudinaryURL: 'loading',
            uploaded: 'working...',
            error: ''
        })
    
        axios.post('/upload', data).then(response => {
            this.setState({
                coudinaryURL: response.data.secure_url,
                uploaded: 'Finished!'
            })
        })
        }else {
            this.setState({
                error: 'please select an image before uploading'
            })
        }
    } 

    onImageDrop(files) {
    this.setState({
        file: files[0]
    });
    let reader = new FileReader();
    reader.onloadend = () => {
        this.setState({
            imageURL: reader.result,
            error: ''
        });
        }
    
        reader.readAsDataURL(files[0])
    }

    render() {

        const previewImg = this.state.imageURL ? <img src={this.state.imageURL} /> : '';

        const myImage = this.state.coudinaryURL == 'loading' ? <img class='loader' src={loader} />  : this.state.coudinaryURL != 'loading' &&  this.state.coudinaryURL != '' ?<img src={this.state.coudinaryURL} /> : ''

        return (
            <div className='upload-container'>
                <div>
                    <div>
                        <div>
                            {this.state.error}
                            <div>
                                <h3>{this.state.uploaded}</h3>
                                {myImage}
                            </div>
                            <div>
                                {previewImg ?  <h3>Preview</h3> : ''}
                                {previewImg}
                            </div>
                        </div>
                        <Dropzone
                                multiple={false}
                                accept="image/*"
                                onDrop={this.onImageDrop}>
                                <p>Drop an image or click to select a file to upload.</p>
                        </Dropzone>
                    </div>
                    <GeneralButton label='Upload' color='white' background='rgb(255, 100, 100)' action={this.handleUploadImage}/>
                </div>
            </div>
        );
    }
}