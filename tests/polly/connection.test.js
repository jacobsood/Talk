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
    it('Language code for unknown language must not change', () => {
        var settings = pollyConnection.setupPolly();
        let lang = settings.language;
        settings.language = 'xhosa';
        expect(settings.language).toBe(lang);
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
    it('Changing just the voice id should also change to its corresponding language code', () => {
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
    it('Language set to turkish and voice set to Mathieu. Language should automatically change to fr-FR', ()=> {
        var settings = pollyConnection.setupPolly();
        settings.language = 'turkish';
        expect(settings.language).toBe('tr-TR');
        settings.voice = 'Mathieu';
        expect(settings.language).toBe('fr-FR');
        expect(settings.voice).toBe('Mathieu');
    });
    it('Setting language to hindi and setting voice to Aditi. Changing language to en-IN should not change voice - bilingual', ()=> {
        var settings = pollyConnection.setupPolly();
        settings.language = 'hindi';
        settings.voice = 'Aditi';
        expect(settings.voice).toBe('Aditi');
        expect(settings.language).toBe('hi-IN');
        settings.language = 'indian english';
        expect(settings.language).toBe('en-IN');
        expect(settings.voice).toBe('Aditi');
    });
});

describe('Testing if the engine is correctly chosen with the appropriate voice and language', () =>{
    it('Changing engine to neural should ensure it is available with the default settings', () => {
        var settings = pollyConnection.setupPolly();
        settings.engine = 'neural';
        expect(settings.language).toBe('en-US');
        expect(settings.voice).toBe('Joanna');
        expect(settings.engine).toBe('neural');
    });
    it('Changing language to Hindi. Default voice of hindi does not allow neural, and hence engine change to neural should not be allowed', () => {
        var settings = pollyConnection.setupPolly();
        settings.engine = 'neural';
        settings.language = 'hindi';
        expect(settings.language).toBe('hi-IN');
        expect(settings.engine).toBe('standard');
    });
    it('Engine must automatically change to neural when choosing Kevin\'s voice, as it does not support standard engine', () => {
        var settings = pollyConnection.setupPolly();
        settings.voice = 'Kevin';
        expect(settings.language).toBe('en-US');
        expect(settings.voice).toBe('Kevin');
        expect(settings.engine).toBe('neural');
    });
    it('Changing Kevin\'s voice to standard should not work', () => {
        var settings = pollyConnection.setupPolly();
        settings.voice = 'Kevin';
        expect(settings.voice).toBe('Kevin');
        settings.engine = 'standard';
        expect(settings.engine).toBe('neural');
    });
    it('Changing from neural to standard', () => {
        var settings = pollyConnection.setupPolly();
        settings.engine = 'neural';
        expect(settings.engine).toBe('neural');
        settings.engine = 'standard';
        expect(settings.engine).toBe('standard');
    });
    it('Enabling neural for a supported voice and then changing the voice to another supported voice should still be neural', () => {
        var settings = pollyConnection.setupPolly();
        settings.engine = 'neural';
        expect(settings.engine).toBe('neural');
        settings.voice = 'Kimberly';
        expect(settings.engine).toBe('neural');
    });
    it('Changing to a voice that does not support neural should change its engine to standard', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'brazillian portuguese';
        settings.engine = 'neural';
        expect(settings.voice).toBe('Camila');
        expect(settings.engine).toBe('neural');
        settings.voice = 'Vitoria';
        expect(settings.engine).toBe('standard');
        expect(settings.voice).toBe('Vitoria');
    });
    it('Changing from en-GB with neural engine to en-US. Engine should remain neural as it is supported by its default voice', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'british english';
        settings.engine = 'neural';
        expect(settings.engine).toBe('neural');
        settings.language = 'american english';
        expect(settings.engine).toBe('neural');
    });
    it('Changing from a voice and language with neural engine to a language with no neural support on its default voice should have the standard engine', () => {
        var settings = pollyConnection.setupPolly();
        settings.engine = 'neural';
        expect(settings.engine).toBe('neural');
        settings.language = 'korean';
        expect(settings.engine).toBe('standard');
    });
});

describe('Checking if priorities hold with polly configuration. Priorities: language = person > engine', () => {
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
    it('Changing person after enabling neural should disable neural if it is not compatible with the person', () => {
        var settings = pollyConnection.setupPolly();
        settings.language = 'brazillian portuguese';
        expect(settings.voice).toBe('Camila');
        settings.engine = 'neural';
        expect(settings.engine).toBe('neural');
        expect(settings.voice).toBe('Camila');
        settings.voice = "Ricardo";
        expect(settings.engine).toBe('standard');
        expect(settings.voice).toBe('Ricardo');
    });
});
