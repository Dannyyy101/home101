import {describe, it, expect} from 'vitest';
import {mdToHtmlConverter} from "@/utils/mdToHtmlConverter";

describe('mdToHtmlConverterBold', () => {
    it('converts --- to <hr>', () => {
        const markdown = '---';
        const expectedHtml = '<hr>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });
})