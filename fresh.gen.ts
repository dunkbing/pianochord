// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $about from "./routes/about.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $chord_key_chord_inversion_ from "./routes/chord/[key]/[chord]/[inversion].tsx";
import * as $chord_key_chord_index from "./routes/chord/[key]/[chord]/index.tsx";
import * as $chord_key_layout from "./routes/chord/[key]/_layout.tsx";
import * as $chord_key_index from "./routes/chord/[key]/index.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $whiteboard_layout from "./routes/whiteboard/_layout.tsx";
import * as $whiteboard_index from "./routes/whiteboard/index.tsx";
import * as $_404Page from "./islands/404Page.tsx";
import * as $ChordDetail from "./islands/ChordDetail.tsx";
import * as $ChordPage from "./islands/ChordPage.tsx";
import * as $ChordSelector from "./islands/ChordSelector.tsx";
import * as $ChordThumbnail from "./islands/ChordThumbnail.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $IndexPage from "./islands/IndexPage.tsx";
import * as $Key from "./islands/Key.tsx";
import * as $KeySelector from "./islands/KeySelector.tsx";
import * as $Keyboard from "./islands/Keyboard.tsx";
import * as $Modal from "./islands/Modal.tsx";
import * as $Nav from "./islands/Nav.tsx";
import * as $Notification from "./islands/Notification.tsx";
import * as $Playbox from "./islands/Playbox.tsx";
import * as $WhiteBoardPage from "./islands/WhiteBoardPage.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/about.tsx": $about,
    "./routes/api/joke.ts": $api_joke,
    "./routes/chord/[key]/[chord]/[inversion].tsx": $chord_key_chord_inversion_,
    "./routes/chord/[key]/[chord]/index.tsx": $chord_key_chord_index,
    "./routes/chord/[key]/_layout.tsx": $chord_key_layout,
    "./routes/chord/[key]/index.tsx": $chord_key_index,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/whiteboard/_layout.tsx": $whiteboard_layout,
    "./routes/whiteboard/index.tsx": $whiteboard_index,
  },
  islands: {
    "./islands/404Page.tsx": $_404Page,
    "./islands/ChordDetail.tsx": $ChordDetail,
    "./islands/ChordPage.tsx": $ChordPage,
    "./islands/ChordSelector.tsx": $ChordSelector,
    "./islands/ChordThumbnail.tsx": $ChordThumbnail,
    "./islands/Counter.tsx": $Counter,
    "./islands/IndexPage.tsx": $IndexPage,
    "./islands/Key.tsx": $Key,
    "./islands/KeySelector.tsx": $KeySelector,
    "./islands/Keyboard.tsx": $Keyboard,
    "./islands/Modal.tsx": $Modal,
    "./islands/Nav.tsx": $Nav,
    "./islands/Notification.tsx": $Notification,
    "./islands/Playbox.tsx": $Playbox,
    "./islands/WhiteBoardPage.tsx": $WhiteBoardPage,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
