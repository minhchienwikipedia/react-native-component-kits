module.exports = {
    root: true,
    extends: ['@react-native-community'],
    rules: {
        quotes: 'off',
        'comma-dangle': 'off',
        'react-hooks/exhaustive-deps': 'off',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.jsx', '.json'],
            },
            node: {
                extensions: ['.js', '.jsx'],
            },
        },
    },
};
