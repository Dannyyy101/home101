import {describe, it, expect} from 'vitest';
import {mdToHtmlConverter} from "@/utils/mdToHtmlConverter";

describe('mdToHtmlConverterBold', () => {
    it('converts ** to <strong>', () => {
        const markdown = '**bold**';
        const expectedHtml = '<strong>bold</strong>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });
    it('converts ** to <strong> ml', () => {
        const markdown = '**bold**\n multi **line**';
        const expectedHtml = '<strong>bold</strong>\n multi <strong>line</strong>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });
})