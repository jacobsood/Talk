var AWS = require('aws-sdk');

const gender = {
    MALE: 0,
    FEMALE: 1,
}

// Valid person and engine
// assumes standard voice = true, neural voice = false, child = false, newscaster = false
const voices = {
    'arb': {
        'Zeina': {
            'gender': gender.FEMALE,
        },
    },
    'cmn-CN': {
        'Zhiyu': {
            'gender': gender.FEMALE,
        },
    },
    'da-DK': {
        'Naja': {
            'gender': gender.FEMALE,
        },
        'Mads': {
            'gender': gender.MALE,
        },
    },
    'nl-NL': {
        'Lotte': {
            'gender': gender.FEMALE,
        },
        'Ruben': {
            'gender': gender.MALE,
        },
    },
    'en-AU': {
        'Nicole': {
            'gender': gender.FEMALE,
        },
        'Russell': {
            'gender': gender.MALE,
        },
    },
    'en-GB': {
        'Amy': {
            'gender': gender.FEMALE,
            'neural': true,
        },
        'Emma': {
            'gender': gender.FEMALE,
            'neural': true,
        },
        'Brian': {
            'gender': gender.MALE,
            'neural': true,
        },
    },
    'en-IN': {
        'Aditi': {
            'gender': gender.FEMALE,
            'bilingual': 'hi-IN',
        },
        'Raveena': {
            'gender': gender.FEMALE,
        },
    },
    'en-US': {
        'Ivy': {
            'gender': gender.FEMALE,
            'child': true,
            'neural': true,
        },
        'Joanna': {
            'gender': gender.FEMALE,
            'neural': true,
            'newscaster': true,
        },
        'Kendra': {
            'gender': gender.FEMALE,
            'neural': true,
        },
        'Kimberly': {
            'gender': gender.FEMALE,
            'neural': true,
        },
        'Salli': {
            'gender': gender.FEMALE,
            'neural': true,
        },
        'Joey': {
            'gender': gender.MALE,
            'neural': true,
        },
        'Justin': {
            'gender': gender.MALE,
            'child': true,
            'neural': true,
        },
        'Kevin': {
            'gender': gender.MALE,
            'child': true,
            'neural': true,
            'standard': false,
        },
        'Matthew': {
            'gender': gender.MALE,
            'neural': true,
            'newscaster': true,
        },
    },
    'en-GB-WLS': {
        'Geraint': {
            'gender': gender.MALE,
        },
    },
    'fr-FR': {
        'Celine': {
            'gender': gender.FEMALE,
        },
        'Lea': {
            'gender': gender.FEMALE,
        },
        'Mathieu': {
            'gender': gender.MALE,
        },
    },
    'fr-CA': {
        'Chantal': {
            'gender': gender.FEMALE,
        },
    },
    'de-DE': {
        'Marlene': {
            'gender': gender.FEMALE,
        },
        'Vicki': {
            'gender': gender.FEMALE,
        },
        'Hans': {
            'gender': gender.MALE,
        },
    },
    'hi-IN': {
        'Aditi': {
            'gender': gender.FEMALE,
            'bilingual': 'en-IN',
        },
    },
    'is-IS': {
        'Dora': {
            'gender': gender.FEMALE,
        },
        'Karl': {
            'gender': gender.MALE,
        },
    },
    'it-IT': {
        'Carla': {
            'gender': gender.FEMALE,
        },
        'Bianca': {
            'gender': gender.FEMALE,
        },
        'Giorgio': {
            'gender': gender.MALE,
        },
    },
    'ja-JP': {
        'Mizuki': {
            'gender': gender.FEMALE,
        },
        'Takumi': {
            'gender': gender.MALE,
        },
    },
    'ko-KR': {
        'Seoyeon': {
            'gender': gender.FEMALE,
        },
    },
    'nb-NO': {
        'Liv': {
            'gender': gender.FEMALE,
        },
    },
    'pl-PL': {
        'Ewa': {
            'gender': gender.FEMALE,
        },
        'Maja': {
            'gender': gender.FEMALE,
        },
        'Jacek': {
            'gender': gender.MALE,
        },
        'Jan': {
            'gender': gender.MALE,
        },
    },
    'pt-BR': {
        'Camila': {
            'gender': gender.FEMALE,
            'neural': true,
        },
        'Vitoria': {
            'gender': gender.FEMALE,
        },
        'Ricardo': {
            'gender': gender.MALE,
        },
    },
    'pt-PT': {
        'Ines': {
            'gender': gender.FEMALE,
        },
        'Cristiano': {
            'gender': gender.MALE,
        },
    },
    'ro-RO': {
        'Carmen': {
            'gender': gender.FEMALE,
        },
    },
    'ru-RU': {
        'Tatyana': {
            'gender': gender.FEMALE,
        },
        'Maxim': {
            'gender': gender.MALE,
        },
    },
    'es-ES': {
        'Conchita': {
            'gender': gender.FEMALE,
        },
        'Lucia': {
            'gender': gender.FEMALE,
        },
        'Enrique': {
            'gender': gender.MALE,
        },
    },
    'es-MX': {
        'Mia': {
            'gender': gender.FEMALE,
        },
    },
    'es-US': {
        'Lupe': {
            'gender': gender.FEMALE,
            'neural': true,
            'newscaster': true,
        },
        'Penelope': {
            'gender': gender.FEMALE,
        },
        'Miguel': {
            'gender': gender.MALE,
        },
    },
    'sv-SE': {
        'Astrid': {
            'gender': gender.FEMALE,
        },
    },
    'tr-TK': {
        'Filiz': {
            'gender': gender.FEMALE,
        },
    },
    'cy-GB': {
        'Gwyneth': {
            'gender': gender.FEMALE,
        },
    },
}

// Valid languages and accents
const languages = {
    'arabic': 'arb',
    'mandarin': 'cmn-CN',
    'chinese': 'cmn-CN',
    'welsh': 'cy-GB',
    'danish': 'da-DK',
    'english': 'en-US',
    'spanish': 'es-ES',
    'french': 'fr-FR',
    'german': 'de-DE',
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
    'turkish': 'tr-TR',
    'australian english': 'en-AU',
    'british english': 'en-GB',
    'indian english': 'en-IN',
    'american english': 'en-US',
    'welsh english': 'en-GB-WLS',
    'castilian spanish': 'es-ES',
    'mexican spanish': 'es-MX',
    'american spanish': 'es-US',
    'canadian french': 'fr-CA',
    'brazillian portuguese': 'pt-BR',
};

// object prototype
// Setter methods priorities compatible Amazon Polly settings in the following order
// person > language > person > engine
const settings = {
    Engine: 'standard',
    LanguageCode: 'en-US',
    OutputFormat: 'mp3',
    SampleRate: '16000',
    Text: '',
    VoiceId: 'Joanna',
    
    get language() {
        return this.LanguageCode;
    },
    
    set language(lang) {
        if (typeof lang !== "string") {
            console.log("Passed parameter must be a string.");
            return;
        }
        if (lang === undefined || lang == null) {
            console.log('No parameters passed. Language did not change.');
        }
        else if (languages.hasOwnProperty(lang)) {
            this.LanguageCode = languages[lang];
            // Change the voice to the chosen language's default if current voice is not available
            let languageVoices = Object.keys(voices[this.language]);
            if (!languageVoices.includes(this.voice)) {
                console.log(`Currently set voice, ${this.voice}, is not available for your chosen language, ${this.language}.`);
                this.VoiceId = languageVoices[0];
                console.log(`Voice changed to ${this.voice}.`);
            }
        }
        else {
            console.log(`[${lang}] does not exist. Language remains ${this.LanguageCode}.`);
        }
    },
    
    get voice() {
        return this.VoiceId;
    },
    
    set voice(voiceId) {
        if (typeof voiceId !== "string") {
            console.log("Passed parameter must be a string.");
            return;
        }
        if (voiceId === null || voiceId === undefined) {
            console.log('No parameters passed. No changes made.')
            return;
        }
        // Check if voiceId exists for the chosen language
        // If so, don't change the language
        for (var currentVoice in voices[this.language]) {
            if (currentVoice === voiceId) {
                this.VoiceId = voiceId;
                return;
            }
        }
        // Check if voiceId exists for any language, changing both the voice and language
        for (let [language, voiceObj] of Object.entries(voices))  {
            // skip if key is the currently chosen language
            if (language === this.language) continue;
            // Check if voiceId is available for the language
            if (Object.keys(voiceObj).includes(voiceId)) {
                this.VoiceId = voiceId;
                console.log(`Voice was not found for ${this.language}. Changing language to ${language}`);
                this.LanguageCode = language;
                return;
            }
        }
        // Unable to find voiceId
        console.log(`${voiceId} was not found. No changes made.`);
    }
};

// create and return a new object of the prototype
export function setupPolly() {
    return Object.create(settings)
}