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
        var settings = pollyConnection.setupPolly();
        expect(settings.language).toBe('en-US');
    });
    it('Language code for English must be en-US', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'english';
        expect(settings.language).toBe('en-US');
    });
    it('Language code for unknown language must be en-US', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'xhosa';
        expect(settings.language).toBe('en-US');
    });
    it('Language code for empty string must not change', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'polish';
        settings.language = '';
        expect(settings.language).toBe('pl-PL');
    });
    it('Language code for int must not change', () => {
        var settings = new pollyConnection.setupPolly();
        settings.language = 2;
        expect(settings.language).toBe('en-US');
    });
    it('Language code for boolean must not change', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = false;
        expect(settings.language).toBe('en-US');
    });
    it('Language code for Hindi must be hi-IN', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'hindi';
        expect(settings.language).toBe('hi-IN');
    });
    it('Language code for Korean must be ko-KR', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'korean';
        expect(settings.language).toBe('ko-KR');
    });
    it('Language code for arabic must be arb', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'arabic';
        expect(settings.language).toBe('arb');
    });
    it('Language code for Australian English must be en-AU', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'english';
        settings.accent = 'australian english';
        expect(settings.language).toBe('en-AU');
    });
    it('Choosing wrong accent for a language, changes must not be made', () => {
        var settings = pollyConnection.setupPolly();
        settings.accent = 'korean';
        settings.language = 'english';
        expect(settings.language).toBe('en-US');
    });
    it('Choosing accent without language. Should be allowed', () => {
        var settings = pollyConnection.setupPolly();
        settings.accent = 'brazillian portuguese';
        expect(settings.language).toBe('pt-BR');
    });
    it('Choosing invalid accent. Must remain the last valid language and accent', () => {
        var settings = pollyConnection.setupPolly();
        settings.accent = 'indian english';
        settings.accent = 'korean';
        expect(settings.language).toBe('en-IN');
    });
    it('Choosing accent before language, must not change to default accent. Should be en-IN', () => {
        var settings = pollyConnection.setupPolly();
        settings.accent = 'indian english';
        settings.language = 'english';
        expect(settings.language).toBe('en-IN');
    });
    it('Choosing accent before language. Must not change to default accent. Should be pt-BR', () => {
        var settings = pollyConnection.setupPolly();
        settings.accent = 'brazillian portuguese';
        settings.language = 'portuguese';
        expect(settings.language).toBe('pt-BR');
    });
});
