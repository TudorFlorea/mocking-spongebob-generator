
interface MemeCanvasOptions {
    width: number;
    height: number;
    memeImageSrc: string;
    text: string;
    element?: HTMLCanvasElement;
}

class MemeCanvas {

    private initialWidth: number;
    private initialHeight: number;
    private ratio: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private memeImage: HTMLImageElement | null;
    private text: string;

    constructor(options: MemeCanvasOptions) {
        this.text = options.text;
        this.initialHeight = options.height;
        this.initialWidth = options.width;
        this.ratio = this.initialWidth / this.initialHeight;
        this.canvas = options.element ? options.element : document.createElement('canvas');
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.width / this.ratio;
        let context = this.canvas.getContext('2d');
        if(context) {
            this.ctx = context;
            this.ctx.fillStyle = "#FFF";
            this.ctx.strokeStyle = "#000";
            this.ctx.textAlign = "center";
        } else {
            throw new Error("Browser does not support 2d context");
        }
        this.memeImage = null;
        // this.init();
        this.loadMemeImage(options.memeImageSrc)
            .then(img => {
                this.memeImage = img;
                this.updateText(options.text);
            })
            .catch(err => {
                throw err;
            });
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private loadMemeImage(imageSrc: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                resolve(img);
            }
            img.onerror = (e) => {
                reject(e)
            }
            img.src = imageSrc;
        });
    }

    private onResize(): void {
        console.log(this.canvas.width, this.canvas.clientWidth, this.canvas.height, this.ratio);
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.width / this.ratio;
        this.updateText(this.text);
    }

    public updateText(text: string): void {
        this.text = text;
        if(this.memeImage) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(
                this.memeImage,
                0, 0, this.memeImage.width, this.memeImage.height,
                0, 0, this.canvas.width, this.canvas.height
            );
            let fontSize = this.canvas.width * 0.06;
            console.log(fontSize);
            this.ctx.font = `${fontSize}px Anton`;
            this.ctx.fillStyle = "#FFF";
            this.ctx.lineWidth = fontSize * 0.05;
            this.ctx.strokeStyle = "#000";
            this.ctx.textAlign = "center";
            let yoffset;
            let self = this;
            text.split("\n").forEach((line: string, lineno: number) => {
                yoffset = ((1 + lineno) * (fontSize * 1.1));
                self.ctx.fillText(line, self.canvas.width / 2, yoffset, self.canvas.width * 0.95);
                self.ctx.strokeText(line, self.canvas.width / 2, yoffset, self.canvas.width * 0.95);
            });
        }

    }

    public setWidth(width: number): void {
        this.canvas.width = width;
    }

    public setHeight(height: number): void {
        this.canvas.height = height;
    }

    public getDataUrl(): string {
        return this.canvas.toDataURL();
    }

}

export default MemeCanvas;

export const createMemeCanvas = (options: MemeCanvasOptions): MemeCanvas => {
    let canvasEl: HTMLCanvasElement = document.createElement('canvas');
    canvasEl.width = options.width;
    canvasEl.height = options.height;
    let canvas = new MemeCanvas({
        width: options.width,
        height: options.height,
        element: options.element ? options.element : canvasEl,
        memeImageSrc: options.memeImageSrc,
        text: options.text ? options.text : ''
    });
    return canvas;
}