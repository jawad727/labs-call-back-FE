import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Button from '@material-ui/core/Button';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import { Fade, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import { Spinner } from 'reactstrap';

import './FormContainer.css';

import AudioAnalyser from "./Recording/AudioAnalyser";
import axios from "axios";

const audioType = "audio/wav";

class Form2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRecordingLoading: false,
      fadeIn: true,
      nullifyRecordButton: false
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({isLoading: false}), 1000);
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.props.audioState(audio);
    let mediaRecorder = new MediaRecorder(audio);
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
    mediaRecorder.start(10);
    this.props.recordingState(true);
  };

  stopMicrophone = () => {
    this.props.audio.getTracks().forEach(track => track.stop());
    this.props.audioState(null);
    this.props.recordingState(false);
    this.saveAudio();
    this.setState({isRecordingLoading: true})
  };

  saveAudio = async () => {
    const blob = await new Blob(this.chunks, { type: audioType });
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // const file = blobToFile(blob, "my-recording.wav")
    // append videoURL to list of saved videos for rendering
    const audios = this.props.audios.concat([audioURL]);
    this.props.setAudiosProp(audios);
    let data = blob;
    let contentType = "audio/wav";
    let authHeaders = "Basic Y2FsbGFuZGNvbXBsYWluQGdtYWlsLmNvbTpjYWxsY29tcGxhaW4xMjM0NTY3ODk=";
    let dgheaders = {
      "Content-Type": contentType,
      Authorization: authHeaders
    };
    
    axios
      .post(`https://brain.deepgram.com/v2/listen`, data, {
        params: {
          punctuate: true
        },
        headers: dgheaders
      })
      .then(res => {
        console.log("response:", res);
        this.props.setTranscriptionProps(
          res.data.results.channels[0].alternatives[0].transcript
        );
        this.setState({
          isRecordingLoading: false,
          nullifyRecordButton: true
        })
      })
      .catch(err => console.log(err));
  };

  deleteAudio(audioURL) {
    const audios = this.props.audios.filter(a => a !== audioURL);
    this.props.setAudiosProp(audios);
    this.setState({
      nullifyRecordButton: false
    })
  }

  toggleMicrophone = () => {
    if (this.props.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  };

  render() {

    const { values, handleChange } = this.props;
    if(this.state.isLoading===true) {
      return (
      <div className="recording-loader loader">

        <br />
        <div className="centerSpinner">
                <Spinner style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
      </div>)
    };

    return (
      <MuiThemeProvider>
        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
          <div className="recorder-container">
            <h1 className="recording-header">Record Complaint For {this.props.storeName}</h1>
            <br />

            <div className="App">
              <div className="audio-analyser">
                {this.props.audio ? <AudioAnalyser audio={this.props.audio} /> : ""}
              </div>
              {this.state.nullifyRecordButton ? (
                <div className="controls">
                <Button disabled color="secondary"  variant="fab" onClick={this.toggleMicrophone}>
                    {this.props.audio ? <KeyboardVoiceIcon /> : <KeyboardVoiceIcon />}
                </Button>
              </div>
              ) : (
              <div className="controls">
                <Button color="secondary"  variant="fab" onClick={this.toggleMicrophone}>
                    {this.props.audio ? <KeyboardVoiceIcon /> : <KeyboardVoiceIcon />}
                </Button>
              </div>
              )}
          </div>
            <br />
            
            <div>
              {this.state.isRecordingLoading===false ? (this.props.audios.map((audioURL, i) => (
                <Fade in={this.state.fadeIn} tag="h5" className="mt-3" key={i}>
                  <div>
                    <h3>Listen To Recording:</h3>
                    <audio controls style={{ width: 400 }} src={audioURL} className="audio-controls"/>
                  </div>
                    <h3 className="re-record-header">Want To Re-Record?:</h3>
                    <RaisedButton onClick={() => this.deleteAudio(audioURL)} 
                    label="Record Again"
                    primary={true}
                    style={styles.button}
                    className="re-record-button"
                    />
                    <hr className="hr-divider"/>
                  <div>
                    <RaisedButton
                      label="Back"
                      primary={false}
                      style={styles.button}
                      onClick={this.back}
                    />
                    <RaisedButton
                      label="Next"
                      primary={true}
                      style={styles.button}
                      onClick={this.continue}
                    />
                  </div>
                </Fade>
              ))) : <Spinner style={{ width: '3rem', height: '3rem' }} /> }
        
  
            </div>
          </div>

        </Fade>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default Form2;
