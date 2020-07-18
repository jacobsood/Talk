import * as pollyConnection from '../../core/connection'
var AWS = require('aws-sdk');


describe('AWS SDK connection test', () => {
    it('Test if connection is successful using the credentials in the config file', () => {
        AWS.config.getCredentials((err) => {
           expect(err).toBeFalsy(); 
        });
    });
    
    it('Test if SDK is set to the right region', () => {
        expect(AWS.config.region).toBe('ap-southeast-2');
    })
});

describe('Check if language settings are correct and available by Polly', () => {
    it('Language code by default should be en-US', () => {
        expect(pollyConnection.getLanguage()).toBe('en-US');
    });
    it('Language code for English must be en-US', () => {
        pollyConnection.setLanguage('english');
        expect(pollyConnection.getLanguage()).toBe('en-US');
    });
    it('Language code for unknown language must be en-US', () => {
        pollyConnection.setLanguage('xhosa');
        expect(pollyConnection.getLanguage()).toBe('en-US');
    });
    it('Language code for empty string must be en-US', () => {
        pollyConnection.setLanguage('');
        expect(pollyConnection.getLanguage()).toBe('en-US');
    });
    it('Language code for int must be en-US', () => {
        pollyConnection.setLanguage(2);
        expect(pollyConnection.getLanguage()).toBe('en-US');
    });
    it('Language code for boolean must be en-US', () => {
        pollyConnection.setLanguage(false);
        expect(pollyConnection.getLanguage()).toBe('en-US');
    });
    it('Language code for Hindi must be hi-IN', () => {
        pollyConnection.setLanguage('hindi');
        expect(pollyConnection.getLanguage()).toBe('hi-IN');
    });
    it('Language code for Korean must be ko-KR', () => {
        pollyConnection.setLanguage('korean');
        expect(pollyConnection.getLanguage()).toBe('ko-KR');
    });
    it('Language code for arabic must be arb', () => {
        pollyConnection.setLanguage('arabic');
        expect(pollyConnection.getLanguage()).toBe('arb');
    });
    it('Language code for Australian English must be en-AU', () => {
        pollyConnection.setLanguage('english');
        pollyConnection.setAccent('australian');
        expect(pollyConnection.getLanguage()).toBe('en-AU');
    });
    it('Choosing wrong accent for a language, changes must not be made', () => {
        pollyConnection.setAccent('korean');
        pollyConnection.setLanguage('english');
        expect(pollyConnection.getLanguage()).toBe('en-US');
    });
    it('Choosing accent without language. Should be allowed', () => {
        pollyConnection.setAccent('brazillian portuguese');
        expect(pollyConnection.getLanguage()).toBe('pt-BR');
    });
    it('Choosing wrong accent for a language after changing the language. Must remain the last valid language', () => {
        pollyConnection.setAccent('indian');
        pollyConnection.setAccent('korean');
        expect(pollyConnection.getLanguage()).toBe('hi-IN');
    });
    it('Choosing Indian accent before language, must be en-IN', () => {
        pollyConnection.setAccent('indian');
        pollyConnection.setLanguage('english');
        expect(pollyConnection.getLanguage()).toBe('en-IN');
    });
    it('Choosing Brazillian accent before language, must be en-IN', () => {
        pollyConnection.setAccent('brazillian');
        pollyConnection.setLanguage('portuguese');
        expect(pollyConnection.getLanguage()).toBe('pt-BR');
    });
});
