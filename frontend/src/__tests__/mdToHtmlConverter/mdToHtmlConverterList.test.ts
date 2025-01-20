import {describe, it, expect} from 'vitest';
import {mdToHtmlConverter} from "@/utils/mdToHtmlConverter";

describe('mdToHtmlConverterList', () => {
    it('converts list to <ul><li></li></ul>', () => {
        const markdown = '- first element\n- second element';
        const expectedHtml = '<ul><li>first element</li><li>second element</li></ul>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });

    it('converts two md lists to two html lists', () => {
        const markdown = '- first element\n- second element\n\n- second list\n- second list2';
        const expectedHtml = '<ul><li>first element</li><li>second element</li></ul><ul><li>second list</li><li>second list2</li></ul>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });
})