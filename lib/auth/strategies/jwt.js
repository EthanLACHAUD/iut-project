'use strict';

module.exports = {
    scheme: 'jwt',
    options: {
        keys: 'random_string',
        verify: {
            aud: 'urn:audience:iut',
            iss: 'urn:issuer:iut',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15
        },
        validate: async (artifacts, request, h) => {
            console.log('JWT validation:', artifacts.decoded.payload); // Add this line for debugging

            return {
                isValid: true,
                credentials: artifacts.decoded.payload
            };
        }
    }
};