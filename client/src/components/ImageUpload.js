import React from 'react';


class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '' };
    }
    _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

    render() {

        const classes = {
            h3: {
                marginLeft: '15px'
            },
            fileInput: {
                borderBottom: '4px solid lightgray',
                borderRight: '4px solid lightgray',
                borderTop: '1px solid black',
                borderLeft: '1px solid black',
                padding: '10px',
                margin: '15px',
                cursor: 'pointer'
            },
            imgPreview: {
                textAlign: 'center',
                margin: '5px 15px',
                height: '200px',
                width: '500px',
                borderLeft: '1px solid gray',
                borderRight: '1px solid gray',
                borderTop: '5px solid gray',
                borderBottom: '5px soiid gray'
            },
            img: {
                widht: '100%',
                height: '100%'
            },
            previewText: {
                width: '100%',
                marginTop: '20px'
            },
            submitButton: {
                padding: '12px',
                marginLeft: '10px',
                background: 'white',
                border: '4px solid lightgray',
                borderRadius: '15px',
                fontWeight: '700',
                fontSize: '10pt',
                cursor: 'pointer',
                '&:hover': {
                    background: '#efefef'
                }
            },
            centerText: {
                textAlign: 'center',
                width: '500px'
            }
        }
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className={classes.previewText}>Please select image</div>)
        }

        return (
            <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)}>
                    <input className={classes.fileInput}
                        type="file"
                        onChange={(e) => this._handleImageChange(e)} />
                    <button className={classes.submitButton}
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                </form>
                <div className={classes.imgPreview}>
                    {$imagePreview}
                </div>
            </div>
        )
    }
}

export default ImageUpload;