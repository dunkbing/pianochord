import { Note } from '../libs/note'
import { delay } from '../libs/helper'
import { h, Component } from 'preact'
import { notes as allNotes } from '../libs/db'
import { Play } from './icon/Play'
import { ArrowDown } from './icon/arrowDown'
import { ArrowUp } from './icon/ArrowUp'

type PlayboxProps = {
  offset: number,
  highlightTable: boolean[],
  raiseOctave: () => void,
  lowerOctave: () => void,
  risingDisabled: boolean,
  lowerDisabled: boolean,
  color: number
}

export default class Playbox extends Component<PlayboxProps> {
  constructor(props: PlayboxProps) {
    super(props)
    this.playChord = this.playChord.bind(this)
    this.playEachNote = this.playEachNote.bind(this)
  }

  async playChord(notes: Note[]) {
    for (const note of notes) {
      await note.play()
    }
  }

  async playEachNote(notes: Note[]) {
    for (const note of notes) {
      await note.play()
      await delay(300)
    }
  }

  render() {
    let offset = 12 * (1 + this.props.offset)
    let notes = allNotes.slice(offset, offset + 36)
    let highlightedNotes = notes.filter((_, i) => this.props.highlightTable[i])

    return (
      <div class='playbox-container'>
        <button type='button' className={'color-' + this.props.color} onClick={() => this.playChord(highlightedNotes)}><Play size={16} />Play</button>
        <button type='button' className={'color-' + this.props.color} onClick={() => this.playEachNote(highlightedNotes)}><Play size={16} />Play each note</button>
        <button type='button' className={'color-' + this.props.color} disabled={this.props.lowerDisabled} onClick={this.props.lowerOctave}><ArrowDown size={16} />Octave Down</button>
        <button type='button' className={'color-' + this.props.color} disabled={this.props.risingDisabled} onClick={this.props.raiseOctave}><ArrowUp size={16} />Octave Up</button>
      </div>
    )
  }
}
