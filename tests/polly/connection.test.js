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
    it('Changing language should be allowed - highest priority', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'english';
        settings.language = 'australian english';
        expect(settings.language).toBe('en-AU');
    });
    it('Choosing invalid accent. Must remain the last valid language', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'indian english';
        settings.language = 'russian korean';
        expect(settings.language).toBe('en-IN');
    });
    it('Choosing indian english. Should be en-IN', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'indian english';
        expect(settings.language).toBe('en-IN');
    });
    it('Choosing brazillian portuguese. Should be pt-BR', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'brazillian portuguese';
        expect(settings.language).toBe('pt-BR');
    });
});

describe('Check if voice chosen are valid', () => {
    it('Default voice should be Joanna', () => {
        var settings = pollyConnection.setupPolly();
        expect(settings.VoiceId).toBe('Joanna');
    });
    it('Changing just the voice id should also change to it\'s corresponding language code', () => {
        var settings = pollyConnection.setupPolly();
        settings.voice = 'Zhiyu';
        expect(settings.voice).toBe('Zhiyu');
        expect(settings.language).toBe('cmn-CN');
    });
    it('Changing voice to a person who\'s bilingual. Language should prioritise english if language not chosen', () => {
        var settings = pollyConnection.setupPolly();
        settings.voice = 'Aditi';
        expect(settings.voice).toBe('Aditi');
        expect(settings.language).toBe('en-IN');
    });
    it('Changing voice to a person who\'s bilingual. Language should remain the same, if chosen and supported', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'hindi';
        settings.voice = 'Aditi';
        expect(settings.voice).toBe('Aditi');
        expect(settings.language).toBe('hi-IN');
    });
    it('Unknown voice should not change the settings', () => {
        var settings = pollyConnection.setupPolly();
        settings.voice = 'Bryan';
        expect(settings.voice).not.toBe('Bryan');
    });
    it('Passing integer as voice should not change the settings', () => {
        var settings = pollyConnection.setupPolly();
        settings.voice = 5;
        expect(settings.voice).not.toBe(5);
    });
    it('null voice should not change the settings', () => {
        var settings = pollyConnection.setupPolly();
        settings.voice = null;
        expect(settings.voice).not.toBeNull();
    });
});

describe('Voice should change to its appropriate default when changing the language', () => {
    it('Changing language to hindi should change voice to Aditi', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'hindi';
        expect(settings.voice).toBe('Aditi');
    });
    it('Changing language to australian english should change voice to Nicole', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'australian english';
        expect(settings.voice).toBe('Nicole');
    });
    it('Changing language to brazillian portuguese should change voice to Camila', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'brazillian portuguese';
        expect(settings.voice).toBe('Camila');
    });
});

describe('Checking if priorities hold with polly configuration', () => {
    it('Changing voice before language should not change voiceID to default of the language, if voice exists for that language',() => {
        var settings = pollyConnection.setupPolly();
        settings.voice = 'Lucia';
        settings.language = 'spanish';
        expect(settings.voice).toBe('Lucia');
    });
    it('Changing voice before language should change voiceID to default of the language if voice doesn\'t exists for that language',() => {
        var settings = pollyConnection.setupPolly();
        settings.voice = 'Carmen';
        settings.language = 'spanish';
        expect(settings.voice).toBe('Conchita');
    });
});
