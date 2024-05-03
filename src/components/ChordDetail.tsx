import { Component, Fragment } from 'preact'
import { route } from 'preact-router'

import { Chord } from '@/libs/chord'
import { Keys, keySimpleList } from '@/libs/key'
import { intervalTable, inversionNames } from '@/libs/db'
import ChordThumbnail from './ChordThumbnail'
import { ChevronRight } from './icon/ChevronRight'
import { ChevronDown } from './icon/ChevronDown'

type ChordDetailProps = {
    chord: Chord,
    inversion: number,
    color: number,
}

type ChordDetailState = {
    inversionOpen: boolean
}

export default class ChordDetail extends Component<ChordDetailProps, ChordDetailState> {
    constructor(props: ChordDetailProps) {
        super(props)
        this.state = { inversionOpen: (props.inversion == 0 ? false : true) }
        this.handleInversionClick = this.handleInversionClick.bind(this)
    }

    handleInversionClick(i: number) {
        return () => {
            let path = window.location.pathname.split('/')
            if (path.length == 4) {
                path.push(i.toString())
            } else if (path.length == 5) {
                path[4] = i.toString()
            }
            if (i == 0) path = path.slice(0, 4)
            route(path.join('/'), false);
        }
    }

    render() {
        let chord = this.props.chord
        return (
            <Fragment>
                <div className={'chordDetail-container color-' + this.props.color}>
                    <div className='information-container'>
                        <h1>
                            {this.props.inversion === 0 ? chord.name : chord.inversions[this.props.inversion - 1].alias[0]}
                        </h1>
                        {
                            this.props.inversion === 0 && (
                                <div className='information'>

                                    <div><b>Tonic</b> {chord.tonic}</div>
                                    <div><b>Interval</b> {chord.intervals.map(i => intervalTable[i].abbrev).join(', ')}</div>
                                    {
                                        chord.quality &&
                                        <div><b>Quality</b> {chord.quality}</div>
                                    }
                                    {
                                        // if has fullname, display all alias
                                        (chord.fullName) &&
                                        <div><b>Aliases</b> {chord.alias.join(', ')}</div>
                                    }
                                    {
                                        // if no fullname, and has >1 alias, display the rest of alias
                                        (!chord.fullName && chord.alias.length > 1) &&
                                        <div><b>Aliases</b> {chord.alias.slice(1).join(', ')}</div>
                                    }
                                </div>
                            )
                        }
                        {
                            this.props.inversion > 0 && (
                                <div className='information'>

                                    <div><b>Inversion</b> {inversionNames[this.props.inversion]}</div>
                                    <div><b>Root Position Chord</b> {(chord.fullName) ? chord.fullName : chord.alias[0]}</div>
                                    {chord.alias.length > 1 &&
                                        <div>
                                            <b>Alias</b>
                                            {chord.inversions[this.props.inversion - 1].alias.slice(1).join(', ')}
                                        </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                    {chord.inversions.length > 0 &&
                        <div className='inversion-container'>
                            <div className={'inversion-header' + (this.state.inversionOpen ? ' open' : '')} onClick={() => this.setState({ inversionOpen: !this.state.inversionOpen })}>
                                <span>Inversions</span>
                                {this.state.inversionOpen ? <ChevronDown size={21} /> : <ChevronRight size={21} />}
                            </div>
                            {this.state.inversionOpen &&
                                <div className='inversion-content'>
                                    {[chord, ...chord.inversions].map((c, i) => {
                                        let colorIndex = keySimpleList.map(str => Keys[str]).indexOf(c.key) + 1
                                        let inversion = this.props.inversion
                                        return (
                                            <div className={'chord color-' + colorIndex + (inversion == i ? ' active' : '')} onClick={this.handleInversionClick(i)}>
                                                <div className='chord-title'>{inversionNames[i]}</div>
                                                <ChordThumbnail chord={c} highlightColor={colorIndex} />
                                                <div className='chord-name'>{`${c.alias[0]}`}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    }
                </div>
            </Fragment>
        )
    }
}
