import {describe, it, expect} from 'vitest';
import {mdToHtmlConverter} from "@/utils/mdToHtmlConverter";

describe('mdToHtmlConverterHeader', () => {
    it('converts markdown header to HTML header <h1>', () => {
        const markdown = '# Hello World';
        const expectedHtml = '<h1>Hello World</h1>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });

    it('returns the same text if no header is present', () => {
        const markdown = 'No headers here!';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(markdown);
    });

    it('converts markdown header to HTML header <h2>', () => {
        const markdown = '## Hello World';
        const expectedHtml = '<h2>Hello World</h2>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });

    it('converts markdown header to HTML header <h3>', () => {
        const markdown = '### Hello World';
        const expectedHtml = '<h3>Hello World</h3>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });

    it('converts markdown header to HTML header <h4>', () => {
        const markdown = '#### Hello World';
        const expectedHtml = '<h4>Hello World</h4>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });

    it('converts markdown header to HTML header <h5>', () => {
        const markdown = '##### Hello World';
        const expectedHtml = '<h5>Hello World</h5>';
        const result = mdToHtmlConverter(markdown);

        expect(result).toBe(expectedHtml);
    });
})