import { jingoBellSheet } from "./placeholder.ts";
import { inferChord } from "./helper.ts";
import { Chord } from "@/libs/chord.ts";
import { KeyName } from "@/libs/key.ts";

const ls = window.localStorage;
const SheetsSavingKey = "whiteboardSave";
const activeSheetSavingKey = "activeSheet";

export type Beat = {
  chord?: Chord | string;
  duration: number;
  lyrics: string;
  chordDisplay: string;
};

export type Bar = {
  totalBeats: number;
  beats: Beat[];
};

export type Sheet = {
  title: string;
  key: KeyName;
  mode: number;
  bars: Bar[];
  lastEdit: string;
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type BeatSaving = Override<Beat, Partial<Pick<Beat, "chord">>>;
type BarSaving = Override<Bar, { beats: BeatSaving[] }>;
type SheetSaving = Override<Sheet, { bars: BarSaving[] }>;

function serializeSheets(sheets: Sheet[]): SheetSaving[] {
  return sheets.map((sheet) => ({
    ...sheet,
    bars: sheet.bars.map((bar) => ({
      ...bar,
      // delete chord field in each beat
      beats: bar.beats.map((beat) => ({
        duration: beat.duration,
        lyrics: beat.lyrics,
        chordDisplay: beat.chordDisplay,
      })),
    })),
  }));
}

function saveSheets(sheets: Sheet[]) {
  const serializedSheets = JSON.stringify(serializeSheets(sheets));
  // console.log(serializedSheets)
  ls.setItem(SheetsSavingKey, serializedSheets);
}

function loadSheets(): Sheet[] {
  const defaultSheets = [jingoBellSheet];
  const savingStr = ls.getItem(SheetsSavingKey);
  if (!savingStr) {
    return defaultSheets;
  } else {
    try {
      const data: SheetSaving[] = JSON.parse(savingStr);
      data.forEach((sheet) => {
        sheet.bars.forEach((bar) => {
          bar.beats.forEach((beat) => {
            beat.chord = inferChord(beat.chordDisplay).chord;
          });
        });
      });
      return data;
    } catch (err) {
      console.error(err);
      return defaultSheets;
    }
  }
}

function loadActiveSheet(): number {
  const savingStr = ls.getItem(activeSheetSavingKey);
  if (savingStr === null) return 0;
  return isNaN(parseInt(savingStr)) ? 0 : parseInt(savingStr);
}

function saveActiveSheet(activeSheet: number) {
  ls.setItem(activeSheetSavingKey, activeSheet.toString());
}

export { loadActiveSheet, loadSheets, saveActiveSheet, saveSheets };
