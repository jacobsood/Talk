var AWS = require('aws-sdk');

// Valid languages and accent
const languages = {
    'arabic': 'arb',
    'mandarin': 'cmn-CN',
    'welsh': 'cy-GB',
    'danish': 'da-DE',
    'english': 'en-US',
    'spanish': 'es-ES',
    'french': 'fr-FR',
    'icelandic': 'is-IS',
    'italian': 'it-IT',
    'japanese': 'ja-JP',
    'hindi': 'hi-IN',
    'korean': 'ko-KR',
    'norwegian': 'nb-NO',
    'dutch': 'nt-NL',
    'polish': 'pl-PL',
    'portuguese': 'pt-PT',
    'romanian': 'ro-RO',
    'russian': 'ru-RU',
    'swedish': 'sv-SE',
    'turkish': 'tr-TR'
};

const accents = {
    'australian english': 'en-AU',
    'british english': 'en-GB',
    'indian english': 'en-IN',
    'american english': 'en-US',
    'spaniard spanish': 'es-ES',
    'mexican spanish': 'es-MX',
    'american spanish': 'es-US',
    'canadian french': 'fr-CA',
    'brazillian portuguese': 'pt-BR',
}

// object prototype
const settings = {
    Engine: 'standard',
    LanguageCode: 'en-US',
    OutputFormat: 'mp3',
    SampleRate: '16000',
    Text: '',
    VoiceId: '',
    
    get language() {
        return this.LanguageCode;
    },
    
    set language(lang) {
        if (lang === undefined || lang == null) {
            console.log('No parameters passed. Language/accent did not change.');
        }
        else if (languages.hasOwnProperty(lang)) {
            // if accent set before language, do not change language's accent to default
            let langCode = languages[lang].split('-')[0];
            if (!this.LanguageCode.includes(langCode)) {
                this.LanguageCode = languages[lang];
            }
        }
        else {
            console.log(`[${lang}] does not exist. Language remains ${this.LanguageCode}.`);
        }
    },
    
    set accent(acc) {
        if (acc === undefined || acc == null) {
            console.log('No parameters passed. Language/accent did not change.');
        }
        else if (accents.hasOwnProperty(acc)) {
            this.LanguageCode = accents[acc];
        }
        else {
            console.log(`[${acc}] does not exist. Language/accent remains ${this.LanguageCode}.`);
        }
    }
};

// create and return a new object of the prototype
export function setupPolly() {
    return Object.create(settings)
}