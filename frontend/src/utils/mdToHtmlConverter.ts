export const mdToHtmlConverter = (text: string) => {
    text = replaceHeader(text)
    text = replaceLine(text)
    text = replaceLists(text)
    return replaceBoldText(text)
}

const replaceHeader = (text: string) => {
    return text.replace(/^#{1,6} .+$/gm, (line) => {
        const level = line.match(/^#+/)?.[0].length || 1; // Count the number of `#`
        const content = line.replace(/^#+\s*/, ""); // Remove `#` and leading space
        return `<h${level}>${content}</h${level}>`;
    });
};

const replaceBoldText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/gm, "<strong>$1</strong>")
}

const replaceLists = (text: string) => {

    return text.replace(/(^|\n)(- .+(\n|$))+/g, (listGroup) => {

        const listItems = listGroup
            .trim()
            .split(/\n/)
            .map((line) => line.trim())
            .filter((line) => line.startsWith("-"))
            .map((line) => `<li>${line.slice(2)}</li>`)
            .join("");

        return `<ul>${listItems}</ul>`;
    });
};

const replaceLine = (text:string) =>{
   return text.replace(/^---$/gm, "<hr>")
}