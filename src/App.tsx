import React, {useState, useEffect, ChangeEvent} from 'react';
import copy from 'copy-to-clipboard';
import download from 'downloadjs';
// import 

import config from './config';

// services
import spongebobify, {SpongebobifyType} from './services/spongebobify';

// components
import CanvasWrapper from './components/CanvasWrapper';
import {CTextArea, Radio, Button} from './components/Form';
import {Center} from './components/layout';

// styles
import "./styles/index.scss";
import { OutputType } from './types';
import MemeCanvas, {createMemeCanvas} from './utils/MemeCanvas';

const App = () => {

    const [text, setText] = useState<string>('');
    const [sText, setSText] = useState<string>('');
    const [cap, setCap] = useState<SpongebobifyType>(SpongebobifyType.RANDOM);
    const [output, setOutput] = useState<OutputType>(OutputType.IMAGE);
    const [canvas, setCanvas] = useState<MemeCanvas | null>(createMemeCanvas({
        width: config.canvasWidth,
        height: config.canvasHeight,
        memeImageSrc: config.imagePath,
        text: ''
    }));

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const handleCapChange = (newCap: SpongebobifyType) => {
        return () => {
            setCap(newCap);
        }
    }

    const handleOutputChange = (newOutput: OutputType) => {
        return () => {
            setOutput(newOutput);
        }
    };

    const handleCopyToClipboard = () => {
        copy(sText);
    };

    const handleDownloadImage = () => {
        if(canvas) {
            canvas.setWidth(config.canvasWidth);
            canvas.setHeight(config.canvasHeight);
            canvas.updateText(sText);
            const data = canvas.getDataUrl();

            download(data, "spongebob-meme.png", "image/png");
        }
    };

    useEffect(() => {
        console.log("changed", text, cap);
        setSText(spongebobify({
            text: text,
            type: cap
        }))
    }, [text, cap])

    return (
       <div className="app">
            <Center>
                <Radio 
                    id="random-capitalisation"
                    name="capitalisation"
                    onChange={handleCapChange(SpongebobifyType.RANDOM)}
                    label={"Random capitalisation"}
                    checked={cap === SpongebobifyType.RANDOM}
                />
                <Radio 
                    id="alternate-capitalisation"
                    name="capitalisation"
                    onChange={handleCapChange(SpongebobifyType.ALTERNATE)}
                    label={"Alternate capitalisation"}
                    checked={cap === SpongebobifyType.ALTERNATE}
                />
            </Center>
            <CTextArea value={text} className="app__input" onChange={handleTextChange} />
            
            <Center>
                <Radio 
                    id="output-image"
                    name="output"
                    onChange={handleOutputChange(OutputType.IMAGE)}
                    label={"Image"}
                    checked={output === OutputType.IMAGE}
                />
                <Radio 
                    id="output-text"
                    name="output"
                    onChange={handleOutputChange(OutputType.TEXT)}
                    label={"Text"}
                    checked={output === OutputType.TEXT}
                />
            </Center>

            {output === OutputType.IMAGE && 
                <>
                    <CanvasWrapper
                        className="app__canvas"
                        imgSrc={config.imagePath}
                        width={800}
                        height={450}
                        text={sText}
                    />
                    <Center>
                        <Button 
                            text="Download"
                            onClick={handleDownloadImage}
                            className="app__button"
                        />
                    </Center>
                </>
            }

            {output === OutputType.TEXT &&
                <>
                    <CTextArea value={sText} disabled className="app__input app__input--disabled" />
                    <Center>
                        <Button 
                            text="Copy to clipboard"
                            onClick={handleCopyToClipboard}
                            className="app__button"
                        />
                    </Center>
                </>
            }


       </div>
    )
};

export default App;