/**
 * Stores all played sounds and provides methods to play, pause, set volume etc
 *
 * @class SoundManager
 */
class SoundManager {

  //#region Fields
  cueArray = [];
  //#endregion

  constructor(cueArray) {
    if (cueArray === undefined || cueArray === null || cueArray.length === 0)
      throw "Error: Invalid cue array!";

    this.cueArray = cueArray;
    this.Initialize();
  }

  Initialize() {
    for (let i = 0; i < this.cueArray.length; i++) {
      var audioCue = this.cueArray[i];
      var name = audioCue.Name;
      var audioObject = document.getElementById(name);
      if (audioObject) audioCue.AudioObject = audioObject;
      else
        throw "Error: No audio object was found for cue [" + name + "]. Did you forget to load in the HTML file?";
    }
  }

  /**
   * Returns the first cue found in the array with the name specified
   *
   * @param {String} name Cue name
   * @returns {Number} Zero-based index of the cue in the array
   * @memberof SoundManager
   */
  FindIndex(name) {
    for (let i = 0; i < this.cueArray.length; i++) {
      {
        if (this.cueArray[i].Name === name) return i;
      }
    }
    return -1;
  }

  /**
   * Plays the first cue found in the array with the name specified
   *
   * @param {String} name Cue name
   * @throws Exception is cue name is not found
   * @memberof SoundManager
   */
  Play(name) {
    //where in the array is this cue?
    var index = this.FindIndex(name);
    if (index != -1) {
      //get the AudioCue object
      var audioCue = this.cueArray[index];
      //get the Audio Object inside
      var audioObject = audioCue.AudioObject;

      if (audioObject) {
        if (audioObject.paused) {
          //not already playing
          audioObject.currentTime = audioCue.CurrentTimeInSecs;
          audioObject.loop = audioCue.Loop;
          audioObject.volume = audioCue.Volume; //0 - 1
          audioObject.playbackRate = audioCue.PlaybackRate; //0 ->
          audioObject.play();
        }
      }
    } else throw "Error: No audio object was found for cue [" + name + "]. Did you forget to load in the HTML file?";

  }

  /**
   * Pauses the first cue found in the array with the name specified
   *
   * @param {String} name Cue name
   * @throws Exception is cue name is not found
   * @memberof SoundManager
   */
  Pause(name) {
    //where in the array is this cue?
    var index = this.FindIndex(name);
    if (index != -1) {
      //get the AudioCue object
      var audioCue = this.cueArray[index];
      //get the Audio Object inside
      var audioObject = audioCue.AudioObject;

      if (audioObject) {
        if (!audioObject.paused) {
          //currently playing
          cue.pause();
        }
      }
    } else throw "Error: No audio object was found for cue [" + name + "]";
  }

  /**
   * Sets the volume of the first cue found in the array with the name specified
   *
   * @param {String} name Cue name
   * @param {Number} volume Volume value (0-1)
   * @throws Exception is cue name is not found
   * @memberof SoundManager
   */
  SetVolume(name, volume) {
    //where in the array is this cue?
    var index = this.FindIndex(name);

    if (index != -1) {
      //get the AudioCue object
      var audioCue = this.cueArray[index];
      //get the Audio Object inside
      var audioObject = audioCue.AudioObject;

      if (audioObject) {
        audioObject.volume = audioCue.Volume = volume; //0 - 1
      }
    } else throw "Error: No audio object was found for cue [" + name + "]";
  }

  Clear() {
    this.cueArray = [];
  }

  Size() {
    return this.cueArray.length;
  }
}

/**
 * Stores all the fields associated with a single played sound
 * @class AudioCue
 */
class AudioCue {

  //#region Fields
  name;
  volume;
  playbackRate;
  loop;
  currentTimeInSecs;
  
  //#endregion

  //#region Properties
  get Name() {
    return this.name;
  }

  get Volume() {
    return this.volume;
  }
  get PlaybackRate() {
    return this.playbackRate;
  }
  get Loop() {
    return this.loop;
  }
  get CurrentTimeInSecs() {
    return this.currentTimeInSecs;
  }
  get AudioObject() {
    return this.audioObject;
  }

  set Name(name) {
    this.name = name;
  }
  set Volume(volume) {
    this.volume =
      volume == (volume >= 0 && volume <= 1) ? volume : 1;
  }
  set PlaybackRate(playbackRate) {
    this.playbackRate =
      playbackRate == (playbackRate > 0 && playbackRate <= MAX_PLAYBACK_RATE)
        ? playbackRate
        : 1;
  }
  set Loop(loop) {
    this.loop = loop;
  }
  set CurrentTimeInSecs(currentTimeInSecs) {
    this.currentTimeInSecs =
    currentTime == (currentTimeInSecs >= 0) ? currentTimeInSecs : 1;
  }
  set AudioObject(audioObject) {
    this.audioObject = audioObject;
  }
  //#endregion

  constructor(name, volume, playbackRate, loop, currentTimeInSecs) {
    this.name = name;
    this.originalVolume = this.volume = volume || 1;
    this.playbackRate = playbackRate || 1;
    this.loop = loop || false;
    this.currentTimeInSecs = currentTimeInSecs || 0;
    this.audioObject = null;
  }
}
