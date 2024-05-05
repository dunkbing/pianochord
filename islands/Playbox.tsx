import { Component } from "preact";

import { Note } from "@/libs/note.ts";
import { delay } from "@/libs/helper.ts";
import { notes as allNotes } from "@/libs/db.ts";
import { ArrowDown } from "@/components/icon/ArrowDown.tsx";
import { ArrowUp } from "@/components/icon/ArrowUp.tsx";
import { Play } from "@/components/icon/Play.tsx";

type PlayboxProps = {
  offset: number;
  highlightTable: boolean[];
  raiseOctave: () => void;
  lowerOctave: () => void;
  risingDisabled: boolean;
  lowerDisabled: boolean;
  color: number;
};

export default class Playbox extends Component<PlayboxProps> {
  constructor(props: PlayboxProps) {
    super(props);
    this.playChord = this.playChord.bind(this);
    this.playEachNote = this.playEachNote.bind(this);
  }

  async playChord(notes: Note[]) {
    for (const note of notes) {
      await note.play();
    }
  }

  async playEachNote(notes: Note[]) {
    for (const note of notes) {
      await note.play();
      await delay(300);
    }
  }

  render() {
    const offset = 12 * (1 + this.props.offset);
    const notes = allNotes.slice(offset, offset + 36);
    const highlightedNotes = notes.filter((_, i) =>
      this.props.highlightTable[i]
    );

    return (
      <div class={"playbox-container color-" + this.props.color}>
        <button
          type="button"
          className={"color-" + this.props.color}
          onClick={() => this.playChord(highlightedNotes)}
        >
          <Play size={16} />Play
        </button>
        <button
          type="button"
          className={"color-" + this.props.color}
          onClick={() => this.playEachNote(highlightedNotes)}
        >
          <Play size={16} />Play each note
        </button>
        <button
          type="button"
          className={"color-" + this.props.color}
          disabled={this.props.lowerDisabled}
          onClick={this.props.lowerOctave}
        >
          <ArrowDown size={16} />Octave Down
        </button>
        <button
          type="button"
          className={"color-" + this.props.color}
          disabled={this.props.risingDisabled}
          onClick={this.props.raiseOctave}
        >
          <ArrowUp size={16} />Octave Up
        </button>
      </div>
    );
  }
}
