import React, {Component} from 'react'

import MemeCanvas from '../../utils/MemeCanvas';

interface CanvasWrapperProps {
    imgSrc: string;
    text: string;
    width: number;
    height: number;
    className: string;
}

class CanvasWrapper extends Component<CanvasWrapperProps> {

    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private canvas: MemeCanvas | null;

    constructor(props: CanvasWrapperProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.canvas = null;
    }

    componentDidMount() {
        if(this.canvasRef && this.canvasRef.current) {
            this.canvas = new MemeCanvas({
                width: this.props.width,
                height: this.props.height,
                element: this.canvasRef.current,
                memeImageSrc: this.props.imgSrc,
                text: this.props.text
            });
        }
    }

    componentDidUpdate() {
        console.log(this.props.text);
        if(this.canvas) {
            this.canvas.updateText(this.props.text);
        }
    }

    render() {
        const {className} = this.props;

        return (
            <canvas className={className ? className : ''} ref={this.canvasRef}></canvas>
        )
    }
}

export default CanvasWrapper;