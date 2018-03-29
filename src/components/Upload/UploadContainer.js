import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import loader from './preloader.gif';
import axios from 'axios';

export default class UploadContainer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          file: '',
          imageURL: '',
          coudinaryURL:'',
        };
    
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
      }

      onImageDrop(files) {
        this.setState({
          file: files[0]
        });
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
              imageURL: reader.result
            });
          }
      
          reader.readAsDataURL(files[0])
      }

    handleUploadImage(event) {
        event.preventDefault();

        const data = new FormData();
        data.append('file', this.state.file);
        this.setState({
            coudinaryURL: 'loading'
        })
    
        axios.post('http://localhost:4000/upload', data).then(response => {
            console.log(response.data)
                this.setState({
                    coudinaryURL: response.data.secure_url,
                    publicId:response.data.public_id + '.jpg'
                })
            })
        }

    handleImageChange(e) {
            e.preventDefault();
            console.log('hello')
            let reader = new FileReader();
            let file = e.target.files[0];
        
            reader.onloadend = () => {
              this.setState({
                file: file,
                imageURL: reader.result
              });
            }
        
            reader.readAsDataURL(file)
          }

    

    render() {

        const styles = {
            width: '200px',
            main:{
                margin: '30px auto',
                maxWidth: '500px'
            },
            cursors:{
                cursor:'pointer'
            }
           
        }

        var myImage = this.state.coudinaryURL == 'loading' ? <img style={styles} src={loader} />  : this.state.coudinaryURL != 'loading' &&  this.state.coudinaryURL != '' ?<img style={styles} src={this.state.coudinaryURL} /> : ''


        
        return (
            <div style={styles.main}>
                <form encType="multipart/form-data">
                    <div>
                    <Dropzone
                        onChange={(e) => this.handleImageChange(e)}
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>

                        <input onChange={(e) => this.handleImageChange(e)} name="file" type="file" />
                    </div>
                        
                    <div>
                        <button style={styles.cursors} onClick={this.handleUploadImage}>Upload</button>
                    </div>
                        <img style={styles} src={this.state.imageURL} />
                        {myImage}
                </form>
            </div>
        );
    }
}