
export interface SpongebobifyOptions {
    text: string,
    type: SpongebobifyType
}

export enum SpongebobifyType {
    RANDOM="random",
    ALTERNATE="alternate"
}

const spongebobify = (options: SpongebobifyOptions): string => {
    
    let text = options.text;
    
    switch(options.type) {
        case SpongebobifyType.RANDOM: {
            let newText = "";
            let rand;
            for(let i = 0; i < text.length; i++) {
                rand = Math.random();
                if(isLetter(text[i])) {
                    newText += rand < 0.5 ? text[i].toLocaleLowerCase() : text[i].toLocaleUpperCase();
                } else {
                    newText += text[i];
                }
            }
            
            return newText;
        }

        case SpongebobifyType.ALTERNATE: {
            let newText = "";
            for(let i = 0; i < text.length; i++) {
                if(isLetter(text[i])) {
                    newText += i % 2 === 0 ? text[i].toLocaleUpperCase() : text[i].toLocaleLowerCase();
                } else {
                    newText += text[i];
                }
            }

            return newText;
        }

        default:
            return "";
    }
};

export const isLetter = (char: string) => {
    if(char.length < 1) {
        throw new Error("You need to pass a string with at least one character");
    }
    const charCode = char.charCodeAt(0);
    return (charCode >= 65 && charCode < 91) || (charCode >= 97 && charCode < 123);
};

export default spongebobify;