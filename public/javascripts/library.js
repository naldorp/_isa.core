var MicControl = {
  _recognizing : false,
  _recognition : null,
  _finalTranscript : '',
  init : function() {
    this._recognition = new webkitSpeechRecognition();
    this._recognition.continuous = true;
    this._recognition.interimResults = true;
    this._recognition.lang = 'pt-BR';
    
    //start
    this._recognition.onstart = function() {
      MicControl._recognizing = true; 
      transcript_ongoing.style.display = 'block';
      transcript.style.display = 'none';
      transcript.innerHTML = '';
    }
    
    //error
    this._recognition.onerror = function(event) {
      console.error(event.error);
    }
    
    //end
    this._recognition.onend = function() {
      MicControl._recognizing = false;
      transcript_ongoing.innerHTML = '';
      transcript_ongoing.style.display = 'none';
      transcript.style.display = 'block';
      transcript.innerHTML = MicControl._finalTranscript;
      
      MicControl.processMessage();
    }
    
    //on result
    this._recognition.onresult = function(event) {
      var temp_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            MicControl._finalTranscript += event.results[i][0].transcript;
        }
        else {
            temp_transcript += event.results[i][0].transcript;
        }
        
        if(temp_transcript == '')
          MicControl.stopRecording();
        
        transcript_ongoing.innerHTML = temp_transcript;
      }
    }
  },
  toggleRecording : function() {
    if(this._recognizing){
      this._recognition.stop();
      
      //stop animation
      this.toggleAnimation();
      return;
    }
    //clear data
    this._finalTranscript = '';
    transcript.innerHtml = ''; //div result
    
    //start recording
    this._recognition.start();
    
    //animate mic
    this.toggleAnimation();
  },
  stopRecording : function(){
    this._recognizing = false;
    this._recognition.stop();
    //stop animation
    this.stopAnimation();
  },
  processMessage : function() {
    if(MicControl._finalTranscript == '')
      return;
      
    var soundUrl = window.location.href + 'api/cmd?msg=' + MicControl._finalTranscript + "&key="+(new Date()).getTime();
    console.log(soundUrl);
    var sound = new Howl({
      src: [soundUrl],
      autoplay: true,
      format: ['webm'],
      onend: function() {
        console.log('Finished!');
      }
    });
  },
  toggleAnimation : function(){
    $('#micShadow').toggleClass('listening');
  },
  stopAnimation: function(){
    $('#micShadow').removeClass('listening');
  }
}